<template>
  <section id="imgPreload"></section>
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
    startLoad: {
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
    total() {
      const imgs = this.imgs.filter(item => !/^data/.test(item));
      return imgs.length;
    }
  },
  watch: {
    startLoad(e) {
      if (e) {
        if (!this.total) {
          this.$emit('finish');
          return;
        }
        for (let i = 0; i < this.total; i++) {
          this._loadImg(this.imgs[i])
            .then(() => {
              this.loaded++;
              this.$nextTick(() => {
                if (this.loaded >= this.total) {
                  this.$emit('finish');
                }
              });
            })
            .catch(err => {
              this.$emit('error', err);
            });
        }
      }
    }
  },
  mounted() {},
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
