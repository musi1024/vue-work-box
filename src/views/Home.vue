<template>
  <section id="home">
    <header>
      <base-button v-show="!isHome" @CLICK="change(false)">&lt;</base-button>
      <span>{{isHome ? 'Home' : config[state]}}</span>
      <base-button v-show="!isHome" @CLICK="change(true)">&gt;</base-button>
      <base-button @CLICK="isHome = true">Home</base-button>
    </header>
    <main>
      <ul v-if="isHome">
        <li v-for="(item, index) in config" :key="item">
          <base-button @CLICK="goToView(index)">{{item}}</base-button>
        </li>
      </ul>
      <keep-alive v-else>
        <components :is="views"></components>
      </keep-alive>
    </main>
  </section>
</template>

<script>
import BaseButton from '../components/BaseButton';

let config = [
  'Button',
  'Popup',
  'Alert',
  'Select',
  'Tabs',
  'Collapse',
  'Scroll',
  'Marquee'
];
export default {
  name: 'Home',
  components: {
    'base-button': BaseButton,
    Button: () => import('../views/Button'),
    Popup: () => import('../views/Popup'),
    Alert: () => import('../views/Alert'),
    Select: () => import('../views/Select'),
    Tabs: () => import('../views/Tabs'),
    Collapse: () => import('../views/Collapse'),
    Scroll: () => import('../views/Scroll'),
    Marquee: () => import('../views/Marquee')
  },
  data() {
    return {
      config,
      state: 0,
      isHome: true
    };
  },
  computed: {
    views() {
      return config[this.state];
    }
  },
  mounted() {},
  methods: {
    change(e) {
      if (e) {
        this.state = this.state >= config.length - 1 ? 0 : this.state + 1;
      } else {
        this.state = this.state === 0 ? config.length - 1 : this.state - 1;
      }
    },
    goToView(index) {
      this.state = index;
      this.isHome = false;
    }
  }
};
</script>

<style lang="scss" scoped>
#home {
  width: 100vw;
  height: 100vh;
  header {
    @include flex();
    width: 100%;
    height: 6%;
    color: #ffffff;
    background: #000000;
    .base-button {
      height: 100%;
    }
    > span {
      flex-grow: 1;
      min-width: px(300);
    }
  }
  main {
    width: 100%;
    height: 94%;
    // margin-top: px(20);
    padding-top: px(20);
    ul {
      list-style: none;
      padding: 0;
    }
  }
}
</style>


