<template>
  <section class="scrollWrap" ref="scrollWrap" :is="tag">
    <slot></slot>
  </section>
</template>

<script>
export default {
  props: {
    tag: {
      type: String,
      default: 'section'
    }
  },
  methods: {
    enableOverscroll(els) {
      let i, el, refDom, pageX;
      if (!els) {
        return;
      }
      if (!els[0]) {
        refDom = [els];
      }
      for (i = 0; i < refDom.length; ++i) {
        el = refDom[i];
        el.addEventListener('touchstart', function(e) {
          let top = this.scrollTop;
          let totalScroll = this.scrollHeight;
          let currentScroll = top + this.offsetHeight;
          if (top === 0) {
            this.scrollTop = 1;
          } else if (currentScroll === totalScroll) {
            this.scrollTop = top - 1;
          }
        });
        el.addEventListener('touchmove', function(evt) {
          if (
            this.offsetHeight < this.scrollHeight ||
            this.offsetWidth < this.scrollWidth
          ) {
            evt._isScroller = true;
            evt.stopPropagation();
          }
        });
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.enableOverscroll(this.$refs['scrollWrap']);
    });
  }
};
</script>

<style lang="scss" scoped>
.scrollWrap {
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
</style>