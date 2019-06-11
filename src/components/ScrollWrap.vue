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
    runScroll(e) {
      let refDom;
      if (!e) {
        return;
      }
      if (!e[0]) {
        refDom = [e];
      }
      for (let i = 0; i < refDom.length; ++i) {
        let el = refDom[i];
        el.addEventListener('touchstart', function() {
          let top = this.scrollTop;
          if (top === 0) {
            this.scrollTop = 1;
          } else if (top + this.offsetHeight === this.scrollHeight) {
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
      this.runScroll(this.$refs['scrollWrap']);
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