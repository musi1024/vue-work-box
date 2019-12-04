import Vue from 'vue';
import createList from '@/custom/createList';

function create(component) {
  return (content, config) => {
    let props = { content, ...config };
    const vm = new Vue({
      render(h) {
        return h(component, { props });
      }
    }).$mount();

    document.body.appendChild(vm.$el);

    const comp = vm.$children[0];
    comp.remove = function() {
      document.body.removeChild(vm.$el);
      vm.$destroy();
    };
    return comp;
  };
}

export default {
  install() {
    createList.map(i => {
      Object.defineProperty(Vue.prototype, i[0], {
        get: function get() {
          return create(i[1]);
        }
      });
    });
  }
};
