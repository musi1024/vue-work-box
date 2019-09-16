<template>
  <section id="app">
    <Collapse class="collapse" v-for="(i,index) in 3" :index="index" :key="i">
      <template v-slot:title>
        <div class="title">title-{{i}}</div>
      </template>
      <template v-slot:content>
        <div
          class="content"
        >content-{{i}}content-{{i}}content-{{i}}content-{{i}}content-{{i}}content-{{i}}content-{{i}}vs</div>
      </template>
    </Collapse>
  </section>
</template>

<script>
import Collapse from './components/Collapse';
export default {
  name: 'App',
  components: {
    Collapse
  },
  data() {
    return {};
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
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  .collapse {
    border: 1px solid black;
    margin: px(30) 0;
    color: white;
    background-color: #2c3e50;
  }
}
</style>
