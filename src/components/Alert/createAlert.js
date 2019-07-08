import Vue from 'vue';
import BaseAlert from './BaseAlert.vue';

function createAlert(props) {
  const vm = new Vue({
    render: h => h(BaseAlert, { props })
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
    Vue.prototype.$alert = createAlert;
  }
};
