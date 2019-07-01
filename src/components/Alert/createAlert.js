import Vue from 'vue';
import BaseAlert from './BaseAlert.vue';

function createAlert(props, data) {
  const vm = new Vue({
    render(h) {
      const a = h(BaseAlert, { props, data });
      console.log(a, 'eeeeeee');
      return a;
    }
  }).$mount();

  document.body.appendChild(vm.$el);

  const comp = vm.$children[0];
  comp.remove = function() {
    document.body.removeChild(vm.$el);
    vm.$destroy();
  };
}

export default {
  install() {
    Object.defineProperty(Vue.prototype, '$alert', {
      get: function get() {
        return createAlert;
      }
    });
  }
};