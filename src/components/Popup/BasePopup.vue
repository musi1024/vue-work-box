<template>
  <transition name="popup">
    <section class="base-popup">
      <main class="base-popup-main">
        <div class="base-popup-container">
          <slot></slot>
        </div>
      </main>
    </section>
  </transition>
</template>

<script>
export default {
  name: 'BasePopup',
  props: {},
  methods: {
    closePopup() {
      this.$emit('close');
    }
  }
};
</script>

<style lang="scss">
.base-popup {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  @include flex();
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.8);
  transition: all 0.2s ease-in-out;

  &-main {
    @include flex();
    flex-direction: column;
    transition: all 0.2s ease-in-out;
  }

  &-container {
    display: flex;
    flex-direction: column;
    position: relative;
  }
}

.popup-enter,
.popup-leave-active {
  opacity: 0;
}
.popup-enter .base-popup-main {
  transform: translate(0, 20%);
}
.popup-leave-active .base-popup-main {
  transform: translate(0, -20%);
}
</style>
