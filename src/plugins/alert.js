import createComponent from '@/utils/Component/createComponent';
import BaseAlert from '@/components/BaseAlert';

function alert(content, config) {
  let props = { content, ...config };
  return createComponent(BaseAlert, props);
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
