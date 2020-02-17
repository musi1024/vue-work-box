import storage from '@/utils/Others/storage';

export default {
  install(Vue) {
    Object.defineProperty(Vue.prototype, '$storage', {
      get() {
        return storage();
      }
    });
  }
};
