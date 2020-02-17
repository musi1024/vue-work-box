<template>
  <section id="app">
    <transition name="fade">
      <router-view v-if="!loading && isReady"></router-view>
      <Loading v-else :start-load="isReady" @finish="loading = false"></Loading>
    </transition>
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
      isReady: false,
      loading: true
    };
  },
  mounted() {
    this.isReady = true;
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
