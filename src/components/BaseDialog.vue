<template>
  <transition name="dialog">
    <div class="base-dialog" @click="closeDialog">
      <section class="base-dialog-container" :style="{ width }" @click.stop>
        <header class="base-dialog-header">
          <slot name="header"></slot>
        </header>
        <main class="base-dialog-main">
          <slot name="main"></slot>
        </main>
        <div class="base-dialog-footer">
          <slot name="footer"></slot>
        </div>
      </section>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'BaseDialog',
  props: {
    width: {
      type: String,
      default: '50%'
    }
  },
  computed: {},
  methods: {
    closeDialog() {
      this.$emit('CLOSE_DIALOG');
    }
  }
};
</script>

<style lang="scss" scoped>
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

  &-container {
    margin: 0 auto;
    padding: 0;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0px 6px 16px 0px rgba(0, 0, 0, 0.08);
    border: 1px solid #e6e6e6;
    transition: all 0.3s ease;
  }
  &-header,
  &-footer {
    color: #4c4c4c;
    padding: 20px 0;
    position: relative;
  }
  &-main {
    color: #4c4c4c;
    position: relative;
    padding: 0 20px;
  }
}

.dialog-enter,
.dialog-leave-to {
  opacity: 0;
}
.dialog-enter-active,
.dialog-leave-active {
  transition: opacity 0.5s;
}
</style>

