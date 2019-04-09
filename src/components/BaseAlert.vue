<template>
  <transition name="alert">
    <section role="alert" v-show="showAlert" class="base-alert">
      <div class="base-alert-icon" v-if="hasIcon">
        <slot name="icon"></slot>
      </div>
      <main class="base-alert-main">
        <slot name="main"></slot>
      </main>
      <button class="base-alert-close" v-if="hasClose || !autoClose" @click="closeAlert">x</button>
    </section>
  </transition>
</template>

<script>
import { setTimeout, clearTimeout } from 'timers';
export default {
  name: 'BaseAlert',
  props: {
    showAlert: {
      type: Boolean,
      default: false
    },
    showAlertTime: {
      type: Number,
      default: 1500
    },
    hasIcon: {
      type: Boolean,
      default: false
    },
    hasClose: {
      type: Boolean,
      default: false
    },
    autoClose: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      lockTime: null
    };
  },
  beforeDestroy() {
    clearTimeout(this.lockTime);
  },
  watch: {
    showAlert(bool) {
      if (bool && this.autoClose) {
        this.lockTime = setTimeout(() => {
          this.$emit('CLOSE_ALERT');
        }, this.showAlertTime);
      }
    }
  },
  methods: {
    closeAlert() {
      clearTimeout(this.lockTime);
      this.$emit('CLOSE_ALERT');
    }
  }
};
</script>

<style lang="scss" scoped>
.base-alert {
  position: relative;
  position: absolute;
  top: 20px;
  left: 50%;
  display: flex;
  align-items: center;
  width: 50vw;
  padding: 15px 15px 15px 15px;
  margin: 0;
  border-radius: 4px;
  background-color: #333333;
  color: #ffffff;
  overflow: hidden;
  transition: all 0.5s ease;
  transform: translateX(-50%);
  font-size: 16px;
  line-height: 16px;
  z-index: 100;

  &-main {
    display: flex;
    padding: 0;
  }
  &-icon {
    display: inline-block;
    width: 16px;
    height: 16px;
    line-height: 16px;
    font-size: 16px;
    border-radius: 100%;
    margin-right: 10px;
  }
  &-close {
    position: absolute;
    right: 0;
    color: #ffffff;
    background-color: #333333;
    border: none;
    cursor: pointer;
    outline: none;
    -webkit-appearance: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }
}
.alert-enter,
.alert-leave-active {
  opacity: 0;
  transform: translate(-50%, -150%);
}
</style>

