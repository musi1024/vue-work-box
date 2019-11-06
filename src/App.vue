<template>
  <section id="app">
    <!-- <router-view></router-view> -->
    <div class="test">11111</div>
  </section>
</template>

<script>
export default {
  name: 'App',
  components: {},
  data() {
    return {};
  },
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
  .test {
    @include wh(400, 200);
    @include bc(100);
    background-color: #2c3e50;
  }
}
</style>
