function popup(type, props) {
  this.$store.commit('popup/show', { type, props });
}

export default {
  install(Vue) {
    Object.defineProperty(Vue.prototype, '$popup', {
      get() {
        return popup;
      }
    });
  }
};
