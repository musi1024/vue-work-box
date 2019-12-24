<template>
  <section id="app">
    <router-view></router-view>
    <Loading v-if="loading" @finish="loading = false"></Loading>
  </section>
</template>

<script>
import Loading from '@/views/Loading';
export default {
  name: 'App',
  components: {
    Loading
  },
  data() {
    return {
      loading: true
    };
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
.btn {
  @include wh(200, 100);
  background-color: #333333;
}
</style>
