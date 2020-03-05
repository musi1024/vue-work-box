const path = require('path');
const pkg = require(path.resolve(process.cwd(), 'package.json'));
const config = {
  imagePath: './src/assets/',
  ...pkg.autoSprite
};

module.exports = config;
