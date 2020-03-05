<template>
  <div>
    <slot v-bind:loaded="loaded" v-bind:total="total">
      {{ loaded }}/{{ total }}
    </slot>
  </div>
</template>

<script>
function loadImg(src) {
  return new Promise((resolve, reject) => {
    let img = new Image();
    img.onload = resolve;
    img.onerror = reject;
    img.src = src;
  });
}

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
    preloadImgs() {
      return this.imgs.filter(item => !/^data/.test(item));
    },
    total() {
      return this.preloadImgs.length;
    }
  },
  mounted() {
    if (!this.preloadImgs.length) {
      this.$emit('finish');
      return;
    }
    for (let i = 0; i < this.preloadImgs.length; i++) {
      loadImg(this.preloadImgs[i])
        .then(() => {
          this.loaded++;
          this.$nextTick(() => {
            if (this.loaded >= this.preloadImgs.length) {
              this.$emit('finish');
            }
          });
        })
        .catch(err => {
          this.$emit('error', err);
        });
    }
  }
};
</script>
