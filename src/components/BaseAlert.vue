<template>
  <transition name="alert">
    <section v-show="showAlert" class="base-alert">
      <span class="base-alert-main">
        <slot></slot>
      </span>
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
  position: fixed;
  @include flex();
  width: 100%;
  height: 100%;
  color: #ffffff;
  overflow: hidden;
  transition: all 0.5s ease-in-out;
  font-size: px(30);
  z-index: 100;

  &-main {
    width: px(480);
    border-radius: 20px;
    background-color: rgba(0, 17, 103, 0.851);
    padding: px(20);
    text-align: center;
  }
}

.alert-enter,
.alert-leave-active {
  opacity: 0;
}
</style>

