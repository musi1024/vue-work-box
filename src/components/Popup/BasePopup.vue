<template>
  <transition name="popup" @after-enter="onEnter" @after-leave="onLeave">
    <section class="base-popup" v-show="show" @click.self="clickMask">
      <ScaleArea>
        <main class="base-popup-main">
          <slot></slot>
        </main>
      </ScaleArea>
    </section>
  </transition>
</template>

<script>
import ScaleArea from '@/components/Layout/ScaleArea';
export default {
  name: 'BasePopup',
  components: { ScaleArea },
  model: {
    prop: 'show',
    event: 'change'
  },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isEnter: false
    };
  },
  methods: {
    clickMask() {
      if (this.isEnter) {
        this.$emit('mask');
      }
    },
    onEnter() {
      this.isEnter = true;
      this.$emit('enter');
    },
    onLeave() {
      this.$emit('leave');
    }
  }
};
</script>

<style lang="scss">
.base-popup {
  @include lt(0, 0, fixed);
  @include flex();
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.8);
  transition: all 0.2s ease-in-out;
  z-index: 999;

  &-main {
    @include wh(300, 300);
    background-color: #ffffff;
    @include flex();
    flex-direction: column;
    transition: all 0.2s ease-in-out;
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
