import Vue from 'vue';

function create(component, props) {
  const vm = new Vue({
    render(h) {
      const a = h(component, { props });
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
    Object.defineProperty(Vue.prototype, '$create', {
      get: function get() {
        return create;
      }
    });
  }
};
