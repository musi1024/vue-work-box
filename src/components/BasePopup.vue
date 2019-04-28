<template>
  <transition name="popup">
    <div class="base-popup" @click="closePopup">
      <div class="base-popup-container">
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'BasePopup',
  methods: {
    closePopup() {
      this.$emit('CLOSE_POPUP');
    }
  }
};
</script>

<style lang="scss">
.base-popup {
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
  animation: bounceInto 0.3s ease-in-out;
  &-container {
    width: 50vw;
    height: 50vh;
    background-color: #000000;
  }
}
</style>

