<template>
  <section id="app">
    <Marquee :content="arr"></Marquee>
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
      this.arr.push('eee');
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
}
</style>
