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
          console.log('eeee');
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
