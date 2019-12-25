<template>
  <transition :name="transitionName" @after-leave="leave">
    <section v-show="show" class="base-alert" @click.self="removeAlert">
      <main class="base-alert-main">
        <span class="base-alert-text">{{ content }}</span>
        <div
          class="base-alert-close"
          v-if="hasCloseBtn"
          @click.self="removeAlert"
        >
          x
        </div>
      </main>
    </section>
  </transition>
</template>

<script>
export default {
  name: 'BaseAlert',
  props: {
    onShow: {
      type: Function,
      default: () => {}
    },
    onClose: {
      type: Function,
      default: () => {}
    },
    content: {
      type: String,
      default: 'alert'
    },
    showTime: {
      type: Number,
      default: 1500
    },
    hasCloseBtn: {
      type: Boolean,
      default: false
    },
    autoClose: {
      type: Boolean,
      default: false
    },
    transitionName: {
      type: String,
      default: 'alert-fade'
    }
  },
  data() {
    return {
      show: false,
      timer: null
    };
  },
  mounted() {
    this.show = true;
    this.onShow();
    if (this.autoClose) {
      this.timer = setTimeout(() => {
        this.removeAlert();
      }, this.showTime);
    }
  },
  beforeDestroy() {
    this.clearTimer();
  },
  methods: {
    removeAlert() {
      this.clearTimer();
      this.show = false;
      this.onClose();
    },
    leave() {
      this.remove();
    },
    clearTimer() {
      this.timer && clearTimeout(this.timer);
    }
  }
};
</script>

<style lang="scss" scoped>
.base-alert {
  @include center(fixed);
  color: #ffffff;
  transition: all 0.4s ease-in-out;
  font-size: vw(30);
  z-index: 1000;

  &-main {
    @include flex();
    @include center();
    max-width: vw(480);
    min-width: vw(320);
    width: fit-content;
    height: fit-content;
    border-radius: 6px;
    background-color: rgba(0, 0, 0, 0.8);
    padding: vw(24) vw(40);
    word-break: break-word;
    white-space: pre-line;
  }

  &-close {
    @include wh(40, 40);
    @include rc(0);
  }
}

/* alert 默认动画 */
.alert-fade-enter,
.alert-fade-leave-active {
  opacity: 0;
}

/* 可选动画 */
.alert-down-enter-active {
  animation: bounceInDown 1.2s;
}
.alert-down-leave-active {
  animation: bounceOutDown 1.2s;
}

.alert-up-enter-active {
  animation: bounceInUp 1.2s;
}
.alert-up-leave-active {
  animation: bounceOutUp 1.2s;
}

.alert-left-enter-active {
  animation: bounceInLeft 0.8s;
}
.alert-left-leave-active {
  animation: bounceOutRight 0.8s;
}

.alert-right-enter-active {
  animation: bounceInRight 0.8s;
}
.alert-right-leave-active {
  animation: bounceOutLeft 0.8s;
}
</style>
