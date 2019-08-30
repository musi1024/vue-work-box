import Vue from 'vue';
import BaseAlert from '../components/BaseAlert';

function alert(content, config) {
  let props = { content, ...config };
  const vm = new Vue({
    render(h) {
      return h(BaseAlert, { props });
    }
  }).$mount();

  document.body.appendChild(vm.$el);

  const comp = vm.$children[0];
  comp.remove = function() {
    document.body.removeChild(vm.$el);
    vm.$destroy();
  };
  return comp.removeAlert;
}

export default {
  install() {
    Object.defineProperty(Vue.prototype, '$alert', {
      get: function get() {
        return alert;
      }
    });
  }
};
