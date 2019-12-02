<template>
  <transition name="message" @after-leave="afterLeave">
    <section class="message" v-show="showMessage" @click.self="closeMessage">
      <main class="message-container">
        <div
          :class="['message-content', contentClass]"
          v-html="content"
          :style="contentStyle"
        ></div>
      </main>
    </section>
  </transition>
</template>

<script>
export default {
  name: 'Message',
  props: {
    content: {
      type: String,
      default: 'default message'
    },
    width: {
      type: String,
      default: '600'
    },
    height: {
      type: String,
      default: '800'
    },
    color: {
      type: String,
      default: 'black'
    },
    fontSize: {
      type: String,
      default: '50'
    },
    textAlign: {
      type: String,
      default: 'center'
    },
    backgroundColor: {
      type: String,
      default: 'white'
    },
    contentClass: {
      type: String
    },
    onShow: {
      type: Function,
      default: () => {}
    },
    onClose: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      showMessage: false
    };
  },
  computed: {
    contentStyle() {
      return {
        width: this.width / 7.5 + 'vw',
        height: this.height / 7.5 + 'vw',
        color: this.color,
        fontSize: this.fontSize / 7.5 + 'vw',
        textAlign: this.textAlign,
        backgroundColor: this.backgroundColor
      };
    }
  },
  mounted() {
    this.showMessage = true;
    this.onShow(this);
  },
  methods: {
    closeMessage() {
      this.showMessage = false;
      this.onClose(this);
    },
    afterLeave() {
      this.remove();
    }
  }
};
</script>

<style lang="scss">
.message {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  @include flex();
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.8);
  transition: all 0.2s ease;

  &-container {
    @include flex();
    transition: all 0.2s ease;
  }

  &-content {
    position: relative;
    @include flex();
  }
}

.message-enter,
.message-leave-active {
  opacity: 0;
}
.message-enter .message-container {
  transform: translate(0, 20%);
}
.message-leave-active .message-container {
  transform: translate(0, -20%);
}
</style>
