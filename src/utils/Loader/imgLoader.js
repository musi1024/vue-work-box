export default url => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve(img);
    };
    img.onerror = () => {
      reject(Error(`load ${url} error`));
    };
    img.src = url;
  });
};
