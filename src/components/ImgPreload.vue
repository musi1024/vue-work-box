<template>
  <section id="imgPreload">
    <slot v-bind:loaded="loaded" v-bind:total="total">{{ loaded }}/{{ total }}</slot>
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
    total() {
      const imgs = this.imgs.filter(item => !/^data/.test(item));
      return imgs.length;
    }
  },
  watch: {
    start(e) {
      console.log(e);
      if (e) {
        this.load();
      }
    }
  },
  mounted() {},
  methods: {
    load() {
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
    },
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
