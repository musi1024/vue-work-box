<template>
  <button id="base-button" :class="{plain}" @click="clickBtn">
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
      lockTIme: null
    };
  },
  beforeDestroy() {
    clearTimeout(this.lockTIme);
  },
  methods: {
    clickBtn() {
      if (!this.lock) {
        this.lock = true;
        this.$emit('CLICK_BTN');
        this.lockTIme = setTimeout(() => {
          this.lock = false;
        }, 500);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
#base-button {
  width: 120px;
  height: 40px;
  background-color: #333333;
  border-radius: 4px;
  border: none;
  color: white;
  font-size: 14px;
  padding: 0; 
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

  &.demo-btn {
    background-image: url('../assets/images/demo-btn.png');
    background-size: 100%;
    background-repeat: no-repeat;
    width: 258px;
    height: 60px;
    background-color: white;
    position: absolute;
    top: 100px;
    left: 0;
  }
}
</style>



