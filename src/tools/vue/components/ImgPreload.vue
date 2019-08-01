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
    const imgs = this.imgs.filter(item => !/^data/.test(item));
    return {
      loaded: 0,
      total: imgs.length
    };
  },
  mounted() {
    if (!this.total) {
      this.$emit('finish');
      return;
    }
    for (let i = 0; i < this.total; i++) {
      loadImg(this.imgs[i])
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
};
</script>
