<template>
  <div id="app">
    <transition name="loading">
      <template v-if="isLoading">
        <p class="loading-percent">loading... {{percent}}%</p>
      </template>
    </transition>
    <transition name="page">
      <router-view v-if="!isLoading"></router-view>
    </transition>
  </div>
</template>

<script>
const preloadImgs = [
  require('@/assets/images/1.jpg'),
  require('@/assets/images/2.jpg'),
  require('@/assets/images/banner_1_0.jpg'),
  require('@/assets/images/banner_1_1.jpg'),
  require('@/assets/images/banner_1_2.jpg'),
  require('@/assets/images/banner_1_3.jpg'),
  require('@/assets/images/banner_1_4.jpg'),
  require('@/assets/images/banner_1_5.jpg'),
  require('@/assets/images/banner_2_0.jpg'),
  require('@/assets/images/banner_2_1.jpg'),
  require('@/assets/images/banner_2_2.jpg'),
  require('@/assets/images/banner_2_3.jpg'),
  require('@/assets/images/banner_2_4.jpg'),
  require('@/assets/images/banner_2_5.jpg'),
  require('@/assets/images/banner_3_0.jpg'),
  require('@/assets/images/banner_3_1.jpg'),
  require('@/assets/images/banner_3_2.jpg'),
  require('@/assets/images/banner_3_3.jpg'),
  require('@/assets/images/banner_3_4.jpg'),
  require('@/assets/images/banner_3_5.jpg'),
  require('@/assets/images/banner_4_0.jpg'),
  require('@/assets/images/banner_4_1.jpg'),
  require('@/assets/images/banner_4_2.jpg'),
  require('@/assets/images/banner_4_3.jpg'),
  require('@/assets/images/banner_4_4.jpg'),
  require('@/assets/images/banner_4_5.jpg'),
  require('@/assets/images/banner_5_0.jpg'),
  require('@/assets/images/banner_5_1.jpg'),
  require('@/assets/images/banner_5_2.jpg'),
  require('@/assets/images/banner_5_3.jpg'),
  require('@/assets/images/banner_5_4.jpg'),
  require('@/assets/images/banner_5_5.jpg'),
  require('@/assets/images/banner_6_0.jpg'),
  require('@/assets/images/banner_6_1.jpg'),
  require('@/assets/images/banner_6_2.jpg'),
  require('@/assets/images/banner_6_3.jpg'),
  require('@/assets/images/banner_6_4.jpg'),
  require('@/assets/images/banner_6_5.jpg'),
  require('@/assets/images/default-gift.png'),
  require('@/assets/images/demo-btn.png'),
  require('@/assets/images/guide_1.png'),
  require('@/assets/images/guide_2.png'),
  require('@/assets/images/guide_3.png'),
  require('@/assets/images/guide_4.png'),
  require('@/assets/images/guide_close.png'),
  require('@/assets/images/guide_img_1.png'),
  require('@/assets/images/guide_img_2.png'),
  require('@/assets/images/guide_img_3.png'),
  require('@/assets/images/guide_img_4.png'),
  require('@/assets/images/guide_point.png'),
  require('@/assets/images/share_0.jpg'),
  require('@/assets/images/share_1.jpg'),
  require('@/assets/images/share_2.jpg'),
  require('@/assets/images/share_3.jpg'),
  require('@/assets/images/share_4.jpg'),
  require('@/assets/images/share_5.jpg')
];

export default {
  name: 'App',
  data() {
    return {
      isLoading: true,
      percent: 0
    };
  },
  mounted() {
    this.loading();
  },
  methods: {
    async loading() {
      let count = 0;
      for (let i = 0; i < preloadImgs.length; i++) {
        await this._loadImg(preloadImgs[i]);
        count++;
        this.percent = parseInt((count / preloadImgs.length) * 100);
      }
      this.isLoading = this.percent == 100 ? false : true;
    },

    _loadImg(src) {
      return new Promise(resolve => {
        let img = new Image();
        img.onload = () => {
          resolve(img);
        };
        img.src = src;
      });
    }
  }
};
</script>


<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100vw;
  height: 100vh;
  position: relative;
  .loading-enter-active {
    animation: fadeIn 0.1s;
  }
  .page-enter-active {
    animation: fadeIn 1s;
  }
}
</style>
