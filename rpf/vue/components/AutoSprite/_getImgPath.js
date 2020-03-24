const path = require('path');
const config = require('./_config');

function getImgPath() {
  function ensureSlash(str) {
    return str.slice(-1) === '/' ? str : str + '/';
  }
  const pathRelToImg = ensureSlash(
    path
      .join(path.relative(__dirname, process.cwd()), config.imagePath)
      .replace(/\\/g, '/')
  );
  return pathRelToImg;
}

module.exports = getImgPath;
