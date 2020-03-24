import isCrossOrigin from './isCrossOrigin';

function urlToBlob({
  url,
  maxWidth,
  crossOriginValue = 'anonymous', // use-credentials
  appendToDOM
} = {}) {
  return new Promise((resolve, reject) => {
    if (!url || typeof url !== 'string') {
      reject(Error('url is required and should be a string'));
      return;
    }

    let img = new Image();

    if (isCrossOrigin(url)) {
      img.crossOrigin = crossOriginValue;
    }

    img.onload = () => {
      let canvas = document.createElement('canvas');
      let ratio = img.width / img.height;
      let canvasWidth = img.width;

      if (maxWidth) {
        canvasWidth = Math.min(img.width, maxWidth);
      }

      canvas.width = canvasWidth;
      canvas.height = canvasWidth / ratio;
      if (appendToDOM) {
        canvas.style.display = 'none';
        canvas.id = 'urlToBlob_' + Date.now();
        document.body.appendChild(canvas);
      }

      let ctx = canvas.getContext('2d');
      ctx.drawImage(
        img,
        0,
        0,
        img.width,
        img.height,
        0,
        0,
        canvas.width,
        canvas.height
      );

      if (!canvas.toBlob) {
        reject(
          Error(
            'canvas.toBlob is not supported, try include this polyfill https://github.com/blueimp/JavaScript-Canvas-to-Blob'
          )
        );
      } else {
        try {
          canvas.toBlob(bin => {
            resolve(bin);
          });
        } catch (err) {
          reject(err);
        }
      }
    };
    img.onerror = () => {
      reject(img);
    };
    img.src = url;
  });
}

export default urlToBlob;
