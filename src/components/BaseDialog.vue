<template>
  <transition name="dialog">
    <div class="base-dialog" @click="closeDialog">
      <slot></slot>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'BaseDialog',
  methods: {
    closeDialog() {
      this.$emit('CLOSE_DIALOG');
    }
  }
};
</script>

<style lang="scss">
.base-dialog {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 0.3s ease;
  background-color: rgba(255, 255, 255, 0.8);
  border: 1px solid red;
}
.test-dialog-container {
  width: 60vw;
  height: 60vh;
  background-color: #000000;
  border-radius: 4px;
  box-shadow: 0px 6px 16px 0px rgba(0, 0, 0, 0.08);
  border: 1px solid #e6e6e6;
  transition: all 0.3s ease;
  & h3 {
    margin-bottom: 10px;
  }
}

.dialog-enter,
.dialog-leave-to {
  opacity: 0;
}
.dialog-enter-active,
.dialog-leave-active {
  transition: opacity 0.8s;
}
</style>

