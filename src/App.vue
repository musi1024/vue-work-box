<template>
  <section id="app">
    <transition name="fade">
      <router-view v-if="loaded"></router-view>
    </transition>
    <!-- 图片预加载 -->
    <img-preload
      v-if="!loaded"
      @FINISH="loaded = true"
      :imgs="preloadImgs"
      v-slot="{loaded, total}"
    >
      <div>{{loaded}}/{{total}}</div>
    </img-preload>
    <!-- 屏幕旋转 -->
    <screen-orientation></screen-orientation>
    <!-- alert -->
    <base-alert></base-alert>
  </section>
</template>

<script>
import ScreenOrientation from './components/ScreenOrientation';
import BaseAlert from './components/BaseAlert';
import ImgPreload from './components/ImgPreload';

const preloadImgs = [];

export default {
  name: 'App',
  components: {
    'screen-orientation': ScreenOrientation,
    'base-alert': BaseAlert,
    'img-preload': ImgPreload
  },
  data() {
    return {
      preloadImgs,
      loaded: false
    };
  },
  mounted() {},
  methods: {}
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
}
</style>
