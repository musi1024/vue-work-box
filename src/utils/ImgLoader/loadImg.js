import isCrossOrigin from '@/rpf/un/isCrossOrigin';

export default function loadImg(src) {
  return new Promise((resolve, reject) => {
    let img = new Image();
    if (isCrossOrigin(src)) {
      img.crossOrigin = 'anonymous';
    }
    img.onload = () => {
      resolve(img);
    };
    img.onerror = () => {
      reject(Error(`fail to load image from ${src}`));
    };
    img.src = src;
  });
}
