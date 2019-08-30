<template>
  <section id="app">
    <Marquee class="marquee" :content="arr"></Marquee>
    <button @click="test1">jjdj</button>
    <button @click="test2">222</button>
  </section>
</template>

<script>
import Marquee from './components/Marquee';
export default {
  name: 'App',
  components: { Marquee },
  data() {
    return {
      arr: []
    };
  },
  computed: {},
  mounted() {
    setTimeout(() => {
      this.arr = ['1111', '2222', '3333'];
    }, 500);
  },
  methods: {
    test1() {
      setTimeout(() => {
        this.arr.push('eee');
      }, 500);
    },
    test2() {
      this.arr = ['8338839', '0djdj', '0djdj', '0djdj', '0djdj'];
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
  position: relative;
  .marquee {
    height: px(40);
    background-color: #2c3e50;
    color: aliceblue;
  }
}
</style>
