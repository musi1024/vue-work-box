function ensureEndSlash(path) {
  return /\/$/.test(path) ? path : path + '/';
}

function getShareImgURL(filename = 'share.png') {
  let baseURL;
  if (typeof process.env.PUBLIC_URL !== 'undefined') {
    baseURL = process.env.PUBLIC_URL;
  } else if (typeof process.env.BASE_URL !== 'undefined') {
    baseURL = process.env.BASE_URL;
  }

  if (typeof baseURL !== 'string') {
    throw new Error(
      '请先设置环境变量 process.env.PUBLIC_URL 或者 process.env.BASE_URL'
    );
  }
  if (typeof filename !== 'string') {
    throw new Error('filename is required and should be string');
  }
  if (/^[./]/.test(filename)) {
    throw new Error('filename can not start with . or /');
  }
  if (!/\.(png|jpe?g)$/i.test(filename)) {
    throw new Error('filename should end with .png, .jpg, .jpeg');
  }

  const fallbackBaseURL = window.location.origin + window.location.pathname;
  return (
    ensureEndSlash(/^http/.test(baseURL) ? baseURL : fallbackBaseURL) + filename
  );
}

export default getShareImgURL;
