import Vue from 'vue';
import destroyAll from './destroyAll';

function createComponent(component, props) {
  const Component = Vue.extend({
    render: h => h(component, { props })
  });
  const instance = new Component().$mount();
  const comp = instance.$children[0];
  document.body.appendChild(instance.$el);

  const onRemove = () => {
    return new Promise(resolve => {
      comp.remove = (...args) => {
        destroy();
        resolve(...args);
      };
    });
  };

  const destroy = () => {
    instance.$destroy();
    document.body.removeChild(instance.$el);
  };

  comp.remove = () => {
    destroy();
  };
  destroyAll.add(destroy, instance.$el);

  return {
    onRemove,
    destroy
  };
}

export default createComponent;
