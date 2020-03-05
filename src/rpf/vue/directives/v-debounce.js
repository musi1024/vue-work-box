/*
 * @Author: huangjianyong
 * @Date: 2019-06-11 16:16:42
 * @LastEditors: Sexy
 * @LastEditTime: 2019-06-11 18:02:08
 * @Description: vue自定义指令，防抖功能
 */

const DEFAULT_DELAY = 500; //500ms

function debounce(fn, delay = DEFAULT_DELAY) {
  if (Object.prototype.toString.call(fn) !== '[object Function]')
    throw Error('请传入函数!');
  let timer = null;
  return (...args) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

export default {
  install(Vue) {
    let d_fn;
    Vue.directive('debounce', {
      bind(el, { arg, value, modifiers }, vnode) {
        let delay =
          modifiers && Object.keys(modifiers).length != 0
            ? Object.keys(modifiers)[0]
            : DEFAULT_DELAY;
        d_fn = debounce(value.bind(vnode), delay);
        el.addEventListener(arg, d_fn);
      },
      unbind(el, { arg }) {
        el.removeEventListener(arg, d_fn);
        d_fn = undefined;
      }
    });
  }
};
