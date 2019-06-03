import { formatDate } from './date';

const queryPares = search => {
  let qs = search.split('&');
  let res = {};
  qs.forEach(i => {
    let q = i.split('=');
    res[q[0]] = q[1];
  });
  return res;
};

const getUrlSearch = queryPares(window.location.search.slice(1));

const isWeixin = () => {
  return /MicroMessenger/i.test(navigator.userAgent);
};

const remove = (arr = [], e) => {
  let index = arr.indexOf(e);
  if (index > -1) {
    arr.splice(index, 1);
  }
};

const judgeObj = obj => {
  return Object.keys(obj).length === 0;
};

const scrollSmoothTo = position => {
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = callback => {
      return setTimeout(callback, 10);
    };
  }
  // 当前滚动高度
  let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  // 滚动step方法
  const step = () => {
    // 距离目标滚动距离
    let distance = position - scrollTop;
    // 目标滚动位置
    scrollTop = scrollTop + distance / 5;
    if (Math.abs(distance) < 1) {
      window.scrollTo(0, position);
    } else {
      window.scrollTo(0, scrollTop);
      requestAnimationFrame(step);
    }
  };
  step();
};

const utils = {
  getUrlSearch,
  isWeixin,
  remove,
  judgeObj,
  scrollSmoothTo,
  formatDate
};

export default {
  install(Vue) {
    Vue.prototype.$utils = utils;
  }
};
