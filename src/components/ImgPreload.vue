<template>
  <section id="imgPreload">
    <slot v-bind:loaded="loaded" v-bind:total="total"></slot>
  </section>
</template>

<script>
export default {
  name: 'ImgPreload',
  props: {
    imgs: {
      type: Array,
      required: true,
      default: () => []
    },
    start: {
      tyep: Boolean,
      default: false
    }
  },
  data() {
    return {
      loaded: 0
    };
  },
  computed: {
    loadImgs() {
      return this.imgs.filter(item => !/^data/.test(item));
    }
  },
  mounted() {
    if (!this.loadImgs.length) {
      this.$emit('finish');
      return;
    }
    for (let i = 0; i < this.this.loadImgs.length; i++) {
      this._loadImg(this.imgs[i])
        .then(() => {
          this.loaded++;
          this.$nextTick(() => {
            if (this.loaded >= this.this.loadImgs.length) {
              this.$emit('finish');
            }
          });
        })
        .catch(err => {
          this.$emit('error', err);
        });
    }
  },
  methods: {
    _loadImg(src) {
      return new Promise((resolve, reject) => {
        let img = new Image();
        img.onload = resolve;
        img.onerror = reject;
        img.src = src;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
