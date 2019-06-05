<template>
  <transition :name="transitionClass">
    <section v-show="showAlert" class="base-alert" @click.self="closeAlert">
      <span class="base-alert-main">
        <div class="base-alert-close" v-if="hasClose" @click.self="closeAlert">x</div>
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
    },
    transitionClass: {
      type: String
      // default: 'alert-fade'
    }
  },
  data() {
    return {
      lockTime: null
    };
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
  beforeDestroy() {
    clearTimeout(this.lockTime);
  },
  methods: {
    closeAlert() {
      if (!this.autoClose) {
        clearTimeout(this.lockTime);
        this.$emit('CLOSE_ALERT');
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.base-alert {
  position: fixed;
  @include center();
  color: #ffffff;
  transition: all 0.5s ease-in-out;
  font-size: px(30);
  z-index: 100;

  &-main {
    @include flex();
    @include center();
    min-width: px(480);
    max-width: px(680);
    width: max-content;
    height: fit-content;
    border-radius: 20px;
    background-color: rgba(0, 0, 0, 0.8);
    padding: px(10) px(20);
    text-align: center;
    word-wrap: break-word;
    word-break: break-all;
  }

  &-close {
    @include wh(40, 40);
    position: absolute;
    top: 0;
    bottom: 0;
    right: px(5);
    margin: auto 0;
  }
}

.alert-fade-enter,
.alert-fade-leave-active {
  opacity: 0;
}

.alert-down-enter-active {
  animation: bounceInDown 1.2s;
}
.alert-down-leave-active {
  animation: bounceOutUp 1.2s;
}

.alert-up-enter-active {
  animation: bounceInUp 1.2s;
}
.alert-up-leave-active {
  animation: bounceOutDown 1.2s;
}

.alert-left-enter-active {
  animation: bounceInLeft 0.8s;
}
.alert-left-leave-active {
  animation: bounceOutLeft 0.8s;
}

.alert-right-enter-active {
  animation: bounceInRight 0.8s;
}
.alert-right-leave-active {
  animation: bounceOutRight 0.8s;
}
</style>

