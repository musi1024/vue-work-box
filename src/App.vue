<template>
  <section id="app">
    <Marquee>
      <MarqueeItem v-for="i in number" :key="i">marquee marqueemarqueemarquee{{i}}</MarqueeItem>
    </Marquee>
  </section>
</template>

<script>
import Marquee from './components/Marquee/Marquee';
import MarqueeItem from './components/Marquee/MarqueeItem';
export default {
  name: 'App',
  components: { Marquee, MarqueeItem },
  data() {
    return { number: 10 };
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
