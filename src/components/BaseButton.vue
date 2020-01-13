<template>
  <button :type="type" class="base-button" @click="clickBtn">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'BaseButton',
  props: {
    debounce: { type: Number },
    throttle: { type: Number },
    asyncLock: { type: Function },
    type: { type: String, default: 'button' }
  },
  data() {
    return {
      lock: false,
      timer: null,
      lastTime: null
    };
  },
  beforeDestroy() {
    this.clearTimeout();
  },
  methods: {
    clickBtn() {
      if (!this.debounce && !this.throttle) return this.handleClick();
      if (!this.debounce) return this.handleThrottle();
      this.handleDebounce();
    },
    handleDebounce() {
      this.clearTimeout();
      this.timer = setTimeout(() => {
        this.handleThrottle();
      }, this.debounce);
    },
    handleThrottle() {
      if (!this.throttle) return this.handleClick();
      const now = new Date();
      if (!this.lastTime || now - this.lastTime > this.throttle) {
        this.handleClick();
        this.lastTime = new Date();
      }
    },
    async handleClick() {
      if (this.lock) return;
      if (!this.asyncLock) return this.$emit('click');
      this.lock = true;
      const data = await this.asyncLock();
      this.$emit('click', data);
      this.lock = false;
    },
    clearTimeout() {
      this.timer && clearTimeout(this.timer);
    }
  }
};
</script>

<style lang="scss" scoped>
.base-button {
  cursor: pointer;
  border: none;
  outline: none;
  padding: 0;
  background-color: rgba(0, 0, 0, 0);

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
}
</style>
