<template>
  <section id="app">
    <div class="test"></div>
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
import move from './utils/move';

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
  computed: {
  },
  mounted() {
    move(this.$el.querySelector('.test'));
  },
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
.test {
  width: 400vw;
  height: 200vh;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #2c3e50;
  border: 20px solid red;
}
</style>
