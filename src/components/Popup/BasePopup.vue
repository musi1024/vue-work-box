<template>
  <transition name="popup">
    <div class="base-popup" v-show="visible" @click.self="closePopup" @touchmove="stopMove">
      <section class="base-popup-container">
        <slot></slot>
      </section>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'BasePopup',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    closePopup() {
      this.$emit('update:visible', false);
    },
    stopMove(e) {
      e.preventDefault();
      e.stopPropagation();
    }
  }
};
</script>

<style lang="scss">
.base-popup {
  @include flex();
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  overflow: hidden;
  background-color: rgba(255, 255, 255, 0.8);
  outline: none;
  -webkit-appearance: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  transition: all 0.2s ease-in-out;

  &-container {
    @include flex();
    @include wh(600, 1000);
    position: relative;
    padding: px(40) 0;
    color: #ffffff;
    background-color: #000000;
    transition: all 0.2s ease-in-out;
  }
}

.popup-enter,
.popup-leave-active {
  opacity: 0;
}
.popup-enter .base-popup-container {
  transform: translate(0, 20%);
}
.popup-leave-active .base-popup-container {
  transform: translate(0, -20%);
}
</style>

