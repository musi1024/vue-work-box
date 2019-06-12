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

const utils = {
  getUrlSearch,
  isWeixin,
  remove,
  judgeObj,
  formatDate
};

export default {
  install(Vue) {
    Vue.prototype.$utils = utils;
  }
};
