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
