<template>
  <Scroll id="app">
    <template v-if="isLoading">
      <p class="loading-percent">loading... {{percent}}%</p>
    </template>
    <transition name="fade">
      <router-view v-if="!isLoading"></router-view>
    </transition>
    <!-- 屏幕旋转 -->
    <screen-orientation></screen-orientation>
    <!-- alert -->
    <base-alert></base-alert>
  </Scroll>
</template>

<script>
import ScreenOrientation from './components/ScreenOrientation';
import BaseAlert from './components/BaseAlert';
import Scroll from './components/Scroll';

const preloadImgs = [];

export default {
  name: 'App',
  components: {
    'screen-orientation': ScreenOrientation,
    'base-alert': BaseAlert,
    Scroll
  },
  data() {
    return {
      isLoading: false,
      percent: 0
    };
  },
  mounted() {
    console.log(this, this.$bus);
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
  @include flex(flex-start, flex-start);
}
</style>
