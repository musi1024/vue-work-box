<template>
  <div id="app">
    <template v-if="isLoading">
      <p class="loading-percent">loading... {{percent}}%</p>
    </template>
    <router-view v-else></router-view>
    <div v-show="isOrientation" id="screen-orientation">
      <div id="screen-orientation-img"></div>
      <p>竖屏体验效果更佳</p>
    </div>
  </div>
</template>

<script>
const preloadImgs = [];

export default {
  name: 'App',
  data() {
    return {
      isLoading: false,
      percent: 0,
      isOrientation: false
    };
  },
  mounted() {
    // this.loading();
    // 监听横屏
    window.addEventListener(
      'onorientationchange' in window ? 'orientationchange' : 'resize',
      () => {
        if (window.orientation === 90 || window.orientation === -90) {
          this.isOrientation = true;
        } else {
          this.isOrientation = false;
        }
      },
      false
    );
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

  #screen-orientation {
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: 5000;
    background: #121212;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    &-img {
      @include img('../src/assets/images/screenOrientation.png');
      width: px(250);
      height: px(242);
      animation: orientation 2s ease-out 0s infinite;
    }
    p {
      width: 100%;
      font-size: px(16);
      color: #bbbbbb;
      text-align: center;
    }
  }
}
</style>
