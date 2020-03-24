<template>
  <div
    class="as-wrap"
    :style="{
      width: vw((size && size.width) || 0),
      height: vw((size && size.height) || 0),
      'background-image': `url(${bgImg})`
    }"
  >
    <slot></slot>
  </div>
</template>
<script>
import vw from '../../../un/vw';
import preval from 'preval.macro';
const sizeMap = preval`
const fs = require('fs');
const path = require('path');
const imgSize = require('image-size');
const config = require('./_config');
const getAllFiles = require('./_getAllFiles');
function rmSlash(path) {
  return path.replace(/^\\/+/, '');
}
function getFileKey(str) {
  const imgAbsPath = path.resolve(process.cwd(), config.imagePath);
  return rmSlash(str.replace(imgAbsPath, '').replace(/\\\\/g, '/'));
}
const files = getAllFiles(config.imagePath, name =>
  /\\.(jpe?g|png)$/i.test(name)
);
const sizeMap = files.reduce((acc, item) => {
  acc[getFileKey(item)] = imgSize(item);
  return acc;
}, {});
module.exports = sizeMap;
`;

const imgReqPath = preval`
const getImgPath = require('./_getImgPath');
const imgPath = getImgPath();
module.exports = imgPath;
`;

function rmRelative(path) {
  return path
    .replace(/^@\//, '')
    .split('/')
    .filter(p => p && !/^[.]{1,2}/.test(p));
}

function maxCommonDir(a, b) {
  a = rmRelative(a);
  b = rmRelative(b);
  let maxIndex = 0;
  for (let i = 1; i < a.length + 1; i++) {
    const aSlice = a.slice(-i);
    const bSlice = b.slice(0, i);
    if (aSlice.join(',') === bSlice.join(',') && maxIndex < aSlice.length) {
      maxIndex = i;
    }
  }
  return maxIndex;
}

export default {
  name: 'AutoSprite',
  props: {
    img: {
      type: String,
      required: true,
      default: ''
    }
  },
  methods: {
    vw
  },
  computed: {
    imgReqPath() {
      return imgReqPath;
    },
    size() {
      return sizeMap[this.imgPath];
    },
    imgPath() {
      const i = maxCommonDir(imgReqPath, this.img);
      return rmRelative(this.img)
        .slice(i)
        .join('/');
    },
    bgImg() {
      return require(preval`
      const getImgPath = require('./_getImgPath');
      module.exports = getImgPath();
      ` + this.imgPath);
    }
  }
};
</script>
<style scoped>
.as-wrap {
  background-size: 100%;
  background-repeat: no-repeat;
}
</style>
