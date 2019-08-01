import {
  useRef,
  useEffect as useNormalEffect,
  useLayoutEffect,
  useState,
  useCallback
} from 'react';
import { Howl } from 'howler';
import isWeChat from '../../un/isWeChat';
import isPARS from '../../un/isPARS';

const useEffect = isPARS() ? useLayoutEffect : useNormalEffect;

const DEFAULT_OPTIONS = {
  autoplay: false,
  loop: false,
  pauseWhenHidden: true
};

function useSmartAudio({
  src,
  autoplay = DEFAULT_OPTIONS.autoplay,
  loop = DEFAULT_OPTIONS.loop,
  pauseWhenHidden = DEFAULT_OPTIONS.pauseWhenHidden
} = {}) {
  if (!src) {
    throw new Error('src is required');
  }

  const soundRef = useRef();
  const pauseByHiddenRef = useRef(false);

  const [paused, setPaused] = useState(true);
  const pausedRef = useRef(paused);
  const loopRef = useRef(loop);
  const autoplayRef = useRef(autoplay);
  useEffect(() => {
    pausedRef.current = paused;
    loopRef.current = loopRef;
    autoplayRef.current = autoplay;
  });

  const play = useCallback(() => {
    if (soundRef.current) {
      soundRef.current.play();
    }
  }, []);
  const pause = useCallback(() => {
    if (soundRef.current) {
      soundRef.current.pause();
    }
  }, []);

  const handleVisChange = useCallback(() => {
    if (document.hidden) {
      if (!pausedRef.current) {
        pauseByHiddenRef.current = true;
        pause();
      }
    } else {
      if (pausedRef.current && pauseByHiddenRef.current) {
        play();
        pauseByHiddenRef.current = false;
      }
    }
  }, [pause, play]);

  useEffect(() => {
    soundRef.current = new Howl({
      src,
      loop: loopRef.current,
      onload: () => {
        if (autoplayRef.current) {
          if (isWeChat()) {
            if (window.WeixinJSBridge) {
              window.WeixinJSBridge.invoke('getNetworkType', {}, () => {
                play();
              });
            } else {
              document.addEventListener('WeixinJSBridgeReady', () => {
                play();
              }, false);
            }
          } else {
            play();
          }
        }
      },
      onplay: () => {
        setPaused(false);
      },
      onpause: () => {
        setPaused(true);
      },
      onend: () => {
        setPaused(true);
      }
    });
    return () => {
      if (soundRef.current) {
        soundRef.current.unload();
        soundRef.current = null;
      }
    };
  }, [play, src]);

  useEffect(() => {
    if (soundRef.current) {
      soundRef.current.loop(loop);
    }
  }, [loop]);

  useEffect(() => {
    if (pauseWhenHidden) {
      document.addEventListener('visibilitychange', handleVisChange, false);
    }
    return () => {
      if (pauseWhenHidden) {
        document.removeEventListener(
          'visibilitychange',
          handleVisChange,
          false
        );
      }
    };
  }, [handleVisChange, pauseWhenHidden]);

  return {
    paused,
    play,
    pause
  };
}

export default useSmartAudio;
