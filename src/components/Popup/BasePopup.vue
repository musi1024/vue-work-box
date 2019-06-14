<template>
  <transition name="popup-fade">
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

  &-container {
    @include flex();
    @include wh(600, 1000);
    position: relative;
    padding: px(40) 0;
    color: #ffffff;
    background-color: #000000;
    animation: bounceInUp 0.6s ease-in-out;
  }
}

.popup-fade-enter,
.popup-fade-leave-to {
  opacity: 0;
}
.popup-fade-enter-active,
.popup-fade-leave-active {
  transition: opacity 0.2s;
}
</style>

