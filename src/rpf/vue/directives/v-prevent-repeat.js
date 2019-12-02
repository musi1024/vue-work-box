/*
 * @Author: Sexy
 * @Date: 2019-08-26 10:55:58
 * @LastEditors: Sexy
 * @LastEditTime: 2019-08-28 10:40:50
 * @Description: 同步事件指令，该事件只有在一次响应完成后能再次触发
 */
export default {
  install(Vue) {
    let aFun;
    Vue.directive('prevent-repeat', {
      bind(el, { arg, value, modifiers }, vnode) {
        let flag = false;
        const [RUNNING_CLASS = '__v_prevent_repeat__disabled'] = Object.keys(
          modifiers
        );
        aFun = async ev => {
          if (flag) return;
          flag = true;
          el.classList.add(RUNNING_CLASS);
          await value.bind(vnode)(ev);
          flag = false;
          el.classList.remove(RUNNING_CLASS);
        };
        el.addEventListener(arg, aFun);
      },
      unbind(el, { arg }) {
        el.removeEventListener(arg, aFun);
        aFun = undefined;
      }
    });
  }
};
