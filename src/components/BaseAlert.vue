<template>
  <transition :name="transitionName" @after-leave="leave">
    <section v-show="showAlert" class="base-alert" @click.self="closeAlert">
      <main class="base-alert-main">
        <span class="base-alert-text">{{ content }}</span>
        <div class="base-alert-close" v-if="hasCloseBtn" @click.self="closeAlert">x</div>
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
    /* 内容 */
    content: {
      type: String,
      default: 'alert'
    },
    /* 持续时间 */
    showTime: {
      type: Number,
      default: 1500
    },
    /* 是否有关闭按钮 */
    hasCloseBtn: {
      type: Boolean,
      default: false
    },
    /* 是否自动关闭 */
    autoClose: {
      type: Boolean,
      default: true
    },
    /* 过度动画名 */
    transitionName: {
      type: String,
      default: 'alert-fade'
    }
  },
  data() {
    return {
      showAlert: false,
      lockTime: null
    };
  },
  mounted() {
    this.showAlert = true;
    this.onShow(this);
    if (this.autoClose) {
      this.lockTime = setTimeout(() => {
        this.removeAlert();
      }, this.showTime);
    }
  },
  beforeDestroy() {
    this.lockTime && clearTimeout(this.lockTime);
  },
  methods: {
    closeAlert() {
      if (!this.autoClose) {
        this.removeAlert();
      }
    },
    removeAlert() {
      this.lockTime && clearTimeout(this.lockTime);
      this.showAlert = false;
      this.onClose(this);
    },
    leave() {
      this.remove();
    }
  }
};
</script>

<style lang="scss" scoped>
.base-alert {
  @include center();
  position: fixed;
  color: #ffffff;
  transition: all 0.5s ease-in-out;
  font-size: vw(30);
  z-index: 1000;

  &-main {
    @include flex();
    @include center();
    min-width: vw(480);
    max-width: vw(680);
    width: max-content;
    height: fit-content;
    border-radius: 20vw;
    background-color: rgba(0, 0, 0, 0.8);
    padding: vw(20) vw(45);
    word-break: break-word;
  }

  &-close {
    @include wh(40, 40);
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    margin: auto 0;
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

