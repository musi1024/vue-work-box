/*
 * @Author: musi
 * @Date: 2019-12-25 15:11:02
 * @LastEditors  : musi
 * @LastEditTime : 2019-12-25 15:26:49
 * @Description: file content
 */
import Vue from 'vue';

function createComponent(component, props) {
  const vm = new Vue({
    render(h) {
      return h(component, { props });
    }
  }).$mount();

  document.body.appendChild(vm.$el);

  const comp = vm.$children[0];
  comp.remove = () => {
    document.body.removeChild(vm.$el);
    vm.$destroy();
  };
  return comp;
}

export default createComponent;
