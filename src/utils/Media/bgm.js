const AUDIO_ID = '__BGM_AUDIO';
const STORE_KEY = '__BGM_STATE';

function createAudio(src, audioId) {
  const audio = document.createElement('audio');
  audio.src = src;
  audio.id = audioId;
  audio.loop = true;
  document.body.appendChild(audio);
  return audio;
}

function bgm({
  src = '',
  autoPlay = true,
  audioId = AUDIO_ID,
  storeKey = STORE_KEY
} = {}) {
  const setStorage = state => localStorage.setItem(storeKey, state);
  const getStorage = () => localStorage.getItem(storeKey) || null;
  let onToggleState;

  let audio = document.getElementById(AUDIO_ID);
  if (!audio) {
    audio = createAudio(src, audioId);
    if (autoPlay) onCanPlay();
  }

  function handleAutoPlay() {
    let musicState = getStorage();
    if (musicState === 'off') return;
    handleToggle(true);
  }

  function handleToggle(isPlay) {
    isPlay ? audio.play() : audio.pause();
    setStorage(isPlay ? 'on' : 'off');
    onToggleState(isPlay);
  }

  function onCanPlay() {
    if (window.WeixinJSBridge) {
      window.WeixinJSBridge.invoke('getNetworkType', {}, () =>
        handleAutoPlay()
      );
    } else {
      document.addEventListener(
        'WeixinJSBridgeReady',
        () => handleAutoPlay(),
        false
      );
    }
  }

  return {
    onToggleState: cb => (onToggleState = cb),
    play: () => handleToggle(true),
    pause: () => handleToggle(false)
  };
}

export default bgm;
