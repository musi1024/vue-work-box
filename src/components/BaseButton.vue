<template>
  <button type="button" class="base-button" :class="{plain}" @click="clickBtn">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'BaseButton',
  props: {
    plain: { type: Boolean, default: false },
    useLock: { type: Boolean, default: true },
    lockTime: { type: Number, default: 500 }
  },
  data() {
    return {
      lock: false,
      timer: null
    };
  },
  beforeDestroy() {
    this.timer && clearTimeout(this.timer);
  },
  methods: {
    clickBtn() {
      if (!this.useLock) {
        this.$emit('click');
        return;
      }
      if (this.lock) return;
      this.lock = true;
      this.$emit('click');
      this.timer = setTimeout(() => {
        this.lock = false;
      }, this.lockTime);
    }
  }
};
</script>

<style lang="scss" scoped>
.base-button {
  cursor: pointer;
  border: none;
  padding: px(20) px(40);
  margin: px(10);
  outline: none;
  -webkit-appearance: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

  background-color: #333333;
  border-radius: 4px;
  color: white;
  font-size: 14px;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  &.plain {
    color: #333333;
    background-color: white;
    border: 1px solid #333333;
  }
}
</style>



