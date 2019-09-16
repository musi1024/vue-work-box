<template>
  <section class="base-collapse" @click="toggleContent">
    <slot name="title"></slot>
    <div class="base-collapse-content" ref="content" :class="[this.showContent ? '' : 'close']">
      <slot name="content"></slot>
    </div>
  </section>
</template>

<script>
export default {
  name: 'BaseCollapse',
  props: { index: Number },
  data() {
    return {
      showContent: false,
      contentHeight: ''
    };
  },
  mounted() {
    this.getHeight();
  },
  methods: {
    toggleContent() {
      this.showContent = !this.showContent;
      this.$refs.content.style.height = this.showContent
        ? this.contentHeight
        : '0px';
    },
    getHeight() {
      let el = this.$refs.content;
      el.style.height = 'auto';
      this.contentHeight = el.offsetHeight + 'px';
      el.style.height = '0px';
      el.style.transition = `all 100ms ease-in-out`;
    }
  }
};
</script>

<style lang="scss" scoped>
.base-collapse {
  width: 100%;
  &-content {
    word-wrap: break-word;
    word-break: break-all;
    overflow: hidden;
    &.close {
      height: 0;
    }
  }
}
</style>
