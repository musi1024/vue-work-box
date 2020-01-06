function modal(type, props) {
  this.$store.commit('modal/show', { type, props });
}

export default {
  install(Vue) {
    Object.defineProperty(Vue.prototype, '$modal', {
      get() {
        return modal;
      }
    });
  }
};
