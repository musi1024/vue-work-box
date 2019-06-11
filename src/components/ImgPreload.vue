<template>
  <section id="imgPreload">
    <slot :loaded="loaded" :total="total"></slot>
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
  mounted() {
    if (!this.total) {
      this.$emit('FINISH');
      return;
    }
    for (let i = 0; i < this.total; i++) {
      this.loadImg(this.imgs[i])
        .then(() => {
          this.loaded++;
          this.$nextTick(() => {
            if (this.loaded >= this.total) {
              this.$emit('FINISH');
            }
          });
        })
        .catch(err => {
          this.$emit('ERROR', err);
        });
    }
  },
  methods: {
    loadImg(src) {
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