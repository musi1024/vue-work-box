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
