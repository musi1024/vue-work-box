<template>
  <section id="app" >
    <div class="test" :style="style"></div>
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
      loaded: false,
      startX: null,
      startY: null,
      bx: 0,
      by: 0,
      endX: 0,
      endY: 0,
      eHeight: 0,
      eWidht: 0
    };
  },
  computed: {
    style() {
      return `transform: translate3d(${this.moveX}px, ${this.moveY}px, 0)`;
    },
    moveX() {
      let res;
      let x = this.endX + this.bx;
      if (x >= 0) {
        res = 0;
      } else if (Math.abs(x) >= this.eWidht - window.innerWidth) {
        res = -(this.eWidht - window.innerWidth);
      } else {
        res = x;
      }
      return res;
    },
    moveY() {
      let res;
      let y = this.endY + this.by;
      if (y >= 0) {
        res = 0;
      } else if (Math.abs(y) >= this.eHeight - window.innerHeight) {
        res = -(this.eHeight - window.innerHeight);
      } else {
        res = y;
      }
      return res;
    }
  },
  mounted() {
    this.eHeight = this.$el.querySelector('.test').getBoundingClientRect().height;
    this.eWidht = this.$el.querySelector('.test').getBoundingClientRect().width;
    window.addEventListener('touchstart', e => {
      this.startX = e.touches[0].clientX;
      this.startY = e.touches[0].clientY;
    });
    window.addEventListener('touchmove', e => {
      this.bx = e.touches[0].clientX - this.startX;
      this.by = e.touches[0].clientY - this.startY;
    });
    window.addEventListener('touchend', () => {
      this.endX = this.moveX;
      this.endY = this.moveY;
      this.bx = 0;
      this.by = 0;
    });
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
  border: 1px solid red;
}
</style>
