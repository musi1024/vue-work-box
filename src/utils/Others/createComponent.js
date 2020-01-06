/*
 * @Author: musi
 * @Date: 2019-12-30 14:31:58
 * @LastEditors: musi
 * @LastEditTime: 2020-01-06 18:51:04
 * @Description: file content
 */
import Vue from 'vue';

function createComponent(component, props) {
  const vm = new Vue({
    render: h => h(component, { props })
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
