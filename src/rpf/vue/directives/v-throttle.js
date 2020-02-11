/*
 * @Author: huangjianyong
 * @Date: 2019-06-11 16:16:42
 * @LastEditors: Sexy
 * @LastEditTime: 2019-08-29 15:03:38
 * @Description: vue自定义指令，节流功能
 */

const DEFAULT_DELAY = 500; //500ms

function throttle(fn, gap = DEFAULT_DELAY) {
  if (Object.prototype.toString.call(fn) !== '[object Function]')
    throw Error('请传入函数!');
  let last_run = null;
  return (...arg) => {
    let now = new Date();
    if (!last_run || now - last_run > gap * 1) {
      fn(...arg);
      last_run = new Date();
    }
  };
}

export default {
  install(Vue) {
    let t_fn;
    Vue.directive('throttle', {
      bind(el, { arg, value, modifiers }, vnode) {
        let gap =
          modifiers && Object.keys(modifiers).length != 0
            ? Object.keys(modifiers)[0]
            : DEFAULT_DELAY;
        t_fn = throttle(value.bind(vnode), gap);
        el.addEventListener(arg, t_fn);
      },
      unbind(el, { arg }) {
        el.removeEventListener(arg, t_fn);
      }
    });
  }
};
