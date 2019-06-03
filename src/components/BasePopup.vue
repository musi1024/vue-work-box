<template>
  <transition name="popup">
    <section class="base-popup" @click.self="closePopup">
      <main class="base-popup-container">
        <div class="base-popup-close" v-if="hasClose" @click="closePopup">x</div>
        <div class="base-popup-content">
          <slot></slot>
        </div>
      </main>
    </section>
  </transition>
</template>

<script>
export default {
  name: 'BasePopup',
  props: {
    hasClose: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    closePopup() {
      this.$emit('CLOSE_POPUP');
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
  transition: all 0.2s ease-in-out;
  background-color: rgba(255, 255, 255, 0.8);
  outline: none;
  -webkit-appearance: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

  &-container {
    @include flex();
    position: relative;
    width: 70vw;
    height: 60vh;
    color: #ffffff;
    background-color: #000000;
    animation: bounceInto 0.2s ease-in-out;
  }

  &-content {
    width: 100%;
    height: 90%;
    padding: px(10) px(20);
    background-color: rgba(255, 255, 255, 0.8);
    overflow: scroll;
  }

  &-close {
    @include wh(40, 40);
    position: absolute;
    top: px(10);
    right: px(10);
    color: #ffffff;
  }
}

.popup-enter,
.popup-leave-to {
  opacity: 0;
}
.popup-enter-active,
.popup-leave-active {
  transition: opacity 0.2s;
}
</style>

