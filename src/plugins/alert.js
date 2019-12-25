import createComponent from '@/utils/Others/createComponent';
import BaseAlert from '@/components/BaseAlert';

function alert(content, config) {
  let props = { content, ...config };
  const component = createComponent(BaseAlert, props);
  return component;
}

export default {
  install(Vue) {
    Object.defineProperty(Vue.prototype, '$alert', {
      get() {
        return alert;
      }
    });
  }
};
