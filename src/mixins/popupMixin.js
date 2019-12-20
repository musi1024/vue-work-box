const popupMixin = {
  data: {
    visible: false,
    param: {}
  },
  methods: {
    open(param) {
      this.visible = true;
      this.param = param;
    },
    resolve(data) {
      this.visible = false;
      this.$options.promise.resolve(data);
    },
    reject(reason) {
      this.visible = false;
      this.$options.promise.reject(reason);
    },
    getPromise() {
      return this.$options.promise;
    }
  }
};
export default popupMixin;
