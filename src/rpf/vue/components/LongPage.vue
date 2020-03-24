<template>
  <div ref="page" class="long-page-wrap">
    <slot></slot>
  </div>
</template>
<script>
import preventScroll from '../../un/preventScroll';
import Scrollbar from 'smooth-scrollbar';

export default {
  name: 'LongPage',
  props: {
    options: {
      type: Object,
      default: () => ({})
    }
  },
  mounted() {
    this.prevent = preventScroll();
    this.scroll = Scrollbar.init(this.$refs.page, this.options);
  },
  destroyed() {
    this.prevent.cancel();
    this.scroll.destroy();
  }
};
</script>
<style scoped>
.long-page-wrap {
  -webkit-tap-highlight-color: transparent;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  position: absolute;
}

.long-page-wrap [data-scrollbar] {
  position: absolute;
}
</style>
