<template>
  <section class="scrollable-wrapper" ref="scrollableWrapper" :is="tag">
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
    resolveWrapperHeight() {
      setTimeout(() => {
        const h = this.$el.clientHeight;
        if (h) {
          this.$el.style.height = `${h}px`;
        }
      }, 500);
    },
    enableDomOverscroll(refDom) {
      this.enableOverscroll([refDom]);
    },
    enableOverscroll(els) {
      let i, el;
      for (i = 0; i < els.length; ++i) {
        el = els[i];
        el.addEventListener('touchstart', function() {
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
          if (this.offsetHeight < this.scrollHeight) {
            evt._isScroller = true;
          }
        });
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.enableDomOverscroll(this.$refs['scrollableWrapper']);
      // this.resolveWrapperHeight();
    });
  }
};
</script>

<style lang="scss" scoped>
.scrollable-wrapper {
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
}
</style>