import Vue from 'vue';

function createComponent(component, props) {
  const Component = Vue.extend({
    render: h => h(component, { props })
  });
  const vm = new Component().$mount();
  const instance = vm.$children[0];
  document.body.appendChild(vm.$el);
  instance.remove = () => {
    destroy();
  };

  const onRemove = () => {
    return new Promise(resolve => {
      instance.remove = (...args) => {
        destroy();
        resolve(...args);
      };
    });
  };

  const destroy = () => {
    vm.$destroy();
    document.body.removeChild(vm.$el);
  };

  return {
    onRemove,
    destroy
  };
}

export default createComponent;
