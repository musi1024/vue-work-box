<template>
  <button class="base-button" :class="{plain}" @click="clickBtn">
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
  width: 120px;
  height: 40px;
  background-color: #333333;
  border-radius: 4px;
  border: none;
  color: white;
  font-size: 14px;
  padding: 0;
  margin: 0 10px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  // 去掉 button 默认样式
  outline: none;
  -webkit-appearance: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

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

  &.base-select-btn {
    @include img('../assets/images/up.png');
    width: 20px;
    height: 20px;
    transition: all 1s;
    &.rotate {
      transform: rotate(180deg);
    }
  }
}
</style>



