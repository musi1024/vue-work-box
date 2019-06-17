<template>
  <section class="base-collapse" @click="toggleContent">
    <slot name="title"></slot>
    <div class="base-collapse-btn" v-show="!showContent"></div>
    <div class="base-collapse-content" :class="[state]">
      <slot name="content"></slot>
    </div>
  </section>
</template>

<script>
import { setTimeout } from 'timers';
export default {
  name: 'BaseCollapse',
  props: { name: Number },
  data() {
    return {
      showContent: false
    };
  },
  computed: {
    state() {
      return this.showContent ? 'open' : 'close';
    }
  },
  watch: {
    showContent(e) {
      this.autoHeight(e, this.$el.querySelector('.base-collapse-content'));
    }
  },
  mounted() {
    this.$bus.$on('SHOW_CONTENT', e => {
      if (this.name != e) {
        this.showContent = false;
      }
    });
    this.showContent = this.name === 0;
  },
  methods: {
    toggleContent() {
      this.showContent = !this.showContent;
      this.$bus.$emit('SHOW_CONTENT', this.name);
    },
    /* bool: 是否展开； element：元素； time: 动画时间 */
    autoHeight(bool, element, time = 100) {
      if (typeof window.getComputedStyle == 'undefined') return;
      let height = window.getComputedStyle(element).height;
      element.style.transition = 'none';
      element.style.height = 'auto';
      let targetHeight = bool ? window.getComputedStyle(element).height : '0px';
      element.style.height = height;
      this.$nextTick(() => {
        element.style.transition = `all ${time}ms ease-in-out`;
        element.style.height = targetHeight;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.base-collapse {
  position: relative;
  margin-bottom: px(10);
  transition: all 0.2s ease-in-out;
  border: 1px solid #333333;
  width: px(600);

  &-content {
    word-wrap: break-word;
    word-break: break-all;
    overflow: hidden;
    transition: all 1s ease-in-out;

    &.open {
    }
    &.close {
      height: px(0);
    }
  }
}
</style>
