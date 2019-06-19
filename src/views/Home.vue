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
        <li v-for="(item, index) in 99" :key="item">
          <base-button @CLICK="goToView(index)">{{item}}</base-button>
        </li>
      </ul>
      <keep-alive v-else>
        <components :is="views"></components>
      </keep-alive>
      <div class="test-btn" @click="test">click</div>
      <div class="test"></div>
    </main>
  </section>
</template>

<script>
import BaseButton from '../components/BaseButton';
import isInViewport from '../utils/Browser/isInViewport';

let config = [
  'Button',
  'Input',
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
    Input: () => import('../views/Input'),
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
    },
    test() {
      console.log(isInViewport(document.querySelector('.test'), true));
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
      margin: 0;
    }
    > span {
      flex-grow: 1;
      min-width: px(300);
    }
  }
  main {
    width: 100%;
    height: 94%;
    padding-top: px(20);
    ul {
      list-style: none;
      padding: 0;
    }
  }
}
.test {
  @include wh(100, 100);
  border: 1px solid red;
  &-btn {
    position: fixed;
    top: 50%;
    @include wh(100, 100);
    border: 1px solid red;
  }
}
</style>


