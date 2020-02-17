<template>
  <section class="loading">{{ loaded }}/{{ total }}</section>
</template>

<script>
import preloadImgList from '@/utils/ImgLoader/preloadImgList';
import preloadImg from '@/utils/ImgLoader/preloadImg';
const { loadList, asyncList } = preloadImgList;
export default {
  name: 'Loading',
  props: {
    startLoad: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loaded: 0,
      total: loadList.length
    };
  },
  mounted() {
    preloadImg(
      loadList,
      0,
      this.loadFinish,
      () => this.loaded++,
      error => this.loadError(error)
    );
  },
  methods: {
    loadFinish() {
      this.$emit('finish');
      preloadImg(asyncList, 5);
    },
    loadError(error) {
      this.$emit('error', error);
    }
  }
};
</script>
<style lang="scss" scoped></style>
