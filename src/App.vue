<template>
  <section id="app">
    <router-view></router-view>
    <Test1 v-model="show"></Test1>
    <button @click="toggle">button</button>
  </section>
</template>

<script>
import Test1 from '@/components/Popup/Test1';
export default {
  name: 'App',
  components: {
    Test1
  },
  data() {
    return {
      show: false
    };
  },
  methods: {
    toggle() {
      this.show = !this.show;
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
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
.btn {
  @include wh(200, 100);
  background-color: #333333;
}
</style>
