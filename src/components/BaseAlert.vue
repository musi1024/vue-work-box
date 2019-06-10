<template>
  <transition :name="transitionClass">
    <section v-show="showAlert" class="base-alert" @click.self="closeAlert">
      <main class="base-alert-main">
        <span v-html="content"></span>
        <div class="base-alert-close" v-if="hasClose" @click.self="closeAlert">x</div>
      </main>
    </section>
  </transition>
</template>

<script>
import { setTimeout, clearTimeout } from 'timers';
export default {
  name: 'BaseAlert',
  data() {
    return {
      /* 可接受的参数 */
      content: '', // 内容
      showAlert: false, // 开关
      showAlertTime: 1500, // 展示时间
      // hasIcon: false, // 是否有icon
      hasClose: false, // 是否有关闭按钮
      autoClose: true, // 是否自动关闭
      transitionClass: 'slide-fade', // 动画class

      /* 内部变量 */
      lockTime: null // 定时器
    };
  },
  watch: {
    /* 判断是否自动关闭，开启定时器 */
    showAlert(bool) {
      if (bool && this.autoClose) {
        this.lockTime = setTimeout(() => {
          this.showAlert = false;
        }, this.showAlertTime);
      }
    }
  },
  mounted() {
    /* 
      外部使用 this.$bus.$emit('SHOW_ALERT', { ... }); 方式触发事件和传参

      内部监听 SHOW_ALERT 事件 
    */
    this.$bus.$on('SHOW_ALERT', e => {
      // 防止参数混淆，每次先 reset 参数
      this.reset();
      // Object.assign 仅修改接受到的参数，保留其他默认参数
      Object.assign(this.$data, e);
      this.showAlert = true;
    });
  },
  beforeDestroy() {
    clearTimeout(this.lockTime);
  },
  methods: {
    reset() {
      let option = {
        showAlertTime: 1500,
        hasIcon: false,
        hasClose: false,
        autoClose: true,
        transitionClass: 'slide-fade'
      };
      Object.assign(this.$data, option);
    },
    closeAlert() {
      if (!this.autoClose) {
        clearTimeout(this.lockTime);
        this.showAlert = false;
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
    padding: px(20) px(40);
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

