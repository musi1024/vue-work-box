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
let config = ['home', 'button', 'popup', 'collapse', 'marquee'];
export default {
  name: 'Home',
  components: {
    'base-button': BaseButton
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
    color: #ffffff;
    background: #000000;
    > span {
      width: 100%;
      height: 100%;
      flex-shrink: 1;
    }
  }
  main {
    margin-top: px(20);
    ul {
      list-style: none;
      padding: 0;
    }
  }
}
</style>


