<template>
  <section id="home">
    <header>
      <base-button @CLICK="change(false)">&lt;</base-button>
      <span>{{config[state]}}</span>
      <base-button @CLICK="change(true)">&gt;</base-button>
      <base-button @CLICK="state = 0">home</base-button>
    </header>
    <main>
      <ul v-if="state === 0">
        <li v-for="(item, index) in config" :key="item">
          <base-button @CLICK="state = index">{{item}}</base-button>
        </li>
      </ul>
      <router-view v-else></router-view>
    </main>
  </section>
</template>

<script>
import BaseButton from '../components/BaseButton';
// import ScrollWrap from '../components/ScrollWrap';

let config = [
  'home',
  'button',
  'popup',
  'alert',
  'select',
  'tabs',
  'collapse',
  'scroll',
  'marquee'
];
export default {
  name: 'Home',
  components: {
    'base-button': BaseButton,
    // 'scroll-wrap': ScrollWrap
  },
  data() {
    return {
      config,
      state: 0
    };
  },
  watch: {
    state() {
      this.$router.replace({ name: config[this.state] });
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
    margin-top: px(20);
    ul {
      list-style: none;
      padding: 0;
    }
  }
}
</style>


