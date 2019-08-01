import { useLayoutEffect, useRef, useState } from 'react';

const notDataURL = src => !/^data:/.test(src);

function useImagePreload({ imgs = [], onFinish, onError } = {}) {
  if (!imgs || !Array.isArray(imgs)) {
    throw new Error('imgs is required and should be array');
  }
  const imgsRef = useRef();
  useLayoutEffect(() => {
    if (!imgsRef.current) {
      imgsRef.current = imgs.filter(notDataURL);
    }
  }, [imgs]);

  const onFinishRef = useRef();
  const onErrorRef = useRef();

  useLayoutEffect(() => {
    onFinishRef.current = onFinish;
    onErrorRef.current = onError;
  });

  const [loaded, setLoaded] = useState(() => {
    return imgs.length - imgs.filter(notDataURL).length;
  });
  useLayoutEffect(() => {
    imgsRef.current.forEach(src => {
      let img = new Image();
      img.onload = () => {
        setLoaded(loaded => loaded + 1);
      };
      img.onerror = () => {
        onErrorRef.current &&
          onErrorRef.current(new Error(`load error: ${src}`));
      };
      img.src = src;
    });
  }, []);

  useLayoutEffect(() => {
    if (loaded === imgs.length) {
      onFinishRef.current && onFinishRef.current();
    }
  }, [loaded, imgs]);

  return {
    loaded,
    total: imgs.length
  };
}

export default useImagePreload;
