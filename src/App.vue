<template>
  <section id="app">
    <button @click="show">1111</button>
    <button @click="show2">1111</button>
  </section>
</template>

<script>
import { setTimeout } from 'timers';
export default {
  name: 'App',
  components: {},
  data() {
    return {
      arr: null
    };
  },
  computed: {},
  mounted() {},
  methods: {
    show() {
      this.$alert('eeoeeo', {
        autoClose: false,
        transitionName: 'alert-left',
        onShow: e => {
          console.log('show');
        },
        onClose: e => {
          console.log('close');
        }
      });
    },
    show2() {
      this.$alert('jiejfiejif', {
        transitionName: 'alert-up',
        onShow: e => {
          console.log(e);
        },
        onClose: e => {
          console.log(e);
        }
      });
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
