<!--
 * @Author: musi
 * @Date: 2019-12-20 15:11:29
 * @LastEditors: musi
 * @LastEditTime: 2020-01-06 18:59:29
 * @Description: file content
 -->
<template>
  <transition name="modal" @after-enter="onEnter" @after-leave="onLeave">
    <section class="base-modal" @click.self="clickMask">
      <ScaleArea>
        <main class="base-modal-main">
          <slot></slot>
        </main>
      </ScaleArea>
    </section>
  </transition>
</template>

<script>
import ScaleArea from '@/components/Layout/ScaleArea';
export default {
  name: 'BaseModal',
  components: { ScaleArea },
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
.base-modal {
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

.modal-enter,
.modal-leave-active {
  opacity: 0;
}
.modal-enter .base-modal-main {
  transform: translate(0, 20%);
}
.modal-leave-active .base-modal-main {
  transform: translate(0, -20%);
}
</style>
