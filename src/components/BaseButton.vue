<template>
  <button type="button" class="base-button" :class="{plain}" @click="clickBtn">
    <slot></slot>
  </button>
</template>

<script>
import { setTimeout, clearTimeout } from 'timers';
export default {
  name: 'BaseButton',
  props: {
    plain: { type: Boolean, default: false }
  },
  data() {
    return {
      lock: false,
      lockTime: null
    };
  },
  beforeDestroy() {
    clearTimeout(this.lockTime);
  },
  methods: {
    clickBtn() {
      if (!this.lock) {
        this.lock = true;
        this.$emit('CLICK');
        this.lockTime = setTimeout(() => {
          this.lock = false;
        }, 500);
      }
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
  // 去掉 button 默认样式
  outline: none;
  -webkit-appearance: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

  // width: availabl;
  // height: availabl;
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

  &.dialog-close {
    position: absolute;
    top: 0;
    right: 0;
    width: 20px;
    height: 20px;
    font-size: 14px;
    margin: 0px;
    border: none;
  }
}
</style>



