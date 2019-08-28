<template>
  <button type="button" class="base-button" @click="clickBtn">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'BaseButton',
  props: {
    debounce: { type: Number },
    gate: { type: Number }
  },
  data() {
    return {
      timer: null,
      lastTime: null
    };
  },
  beforeDestroy() {
    this.timer && clearTimeout(this.timer);
  },
  methods: {
    clickBtn() {
      if (!this.debounce && !this.gate) {
        this.$emit('click');
        return;
      }
      if (this.debounce) {
        this.timer && clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.checkGate();
        }, this.debounce);
        return;
      }
      this.checkGate();
    },
    checkGate() {
      if (!this.gate) {
        this.$emit('click');
        return;
      }
      let now = new Date();
      if (!this.lastTime || now - this.lastTime > this.gate) {
        this.$emit('click');
        this.lastTime = new Date();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.base-button {
  cursor: pointer;
  border: none;
  outline: none;
  -webkit-appearance: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
}
</style>



