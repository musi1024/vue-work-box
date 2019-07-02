<template>
  <section id="app">
    <transition name="fade">
      <router-view v-if="loaded"></router-view>
    </transition>
    <!-- 图片预加载 -->
    <img-preload
      v-if="!loaded"
      :imgs="preloadImgs"
      @finish="loaded = true"
      v-slot="{loaded, total}"
    >
      <div>{{loaded}}/{{total}}</div>
    </img-preload>
    <!-- 屏幕旋转 -->
    <screen-orientation></screen-orientation>
  </section>
</template>

<script>
import ScreenOrientation from './components/ScreenOrientation';
import ImgPreload from './components/ImgPreload';

const preloadImgs = [
  require('./assets/images/screenOrientation.png'),
  require('./assets/images/up.png')
];

export default {
  name: 'App',
  components: {
    'screen-orientation': ScreenOrientation,
    'img-preload': ImgPreload
  },
  data() {
    return {
      preloadImgs,
      loaded: false
    };
  },
  computed: {},
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
  position: relative;
}
</style>
