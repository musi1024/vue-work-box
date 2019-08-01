import Vue from 'vue';
const bus = new Vue();

export default {
  install(Vue) {
    Object.defineProperty(Vue.prototype, '$bus', {
      get: function get() {
        return bus;
      }
    });
  }
};
