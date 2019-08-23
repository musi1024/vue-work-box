<template>
  <section id="app">
    <button @click="click">按钮</button>
  </section>
</template>

<script>
export default {
  name: 'App',
  components: {},
  data() {
    return {};
  },
  computed: {},
  mounted() {},
  methods: {
    click() {}
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
