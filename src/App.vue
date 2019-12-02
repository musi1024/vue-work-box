<template>
  <section id="app">
    <router-view></router-view>
  </section>
</template>

<script>
import bifurcateBy from '@/utils/Array/bifurcateBy';
export default {
  name: 'App',
  mounted() {
    const arr1 = [1, 2, 3, 4];
    // const arr2 = [1, 2, 3, 4];
    const res = bifurcateBy(arr1, x => x >= 2);
    console.log('**debug**', res);
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
