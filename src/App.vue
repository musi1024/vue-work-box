<template>
  <section id="app">
    <router-view></router-view>
  </section>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    this.$popup('test', { show: true });
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
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
</style>
