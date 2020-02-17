import store from '@/utils/Others/store';

export default {
  install(Vue) {
    Object.defineProperty(Vue.prototype, '$storage', {
      get() {
        return store;
      }
    });
  }
};
