<template>
  <section id="app">
    <router-view></router-view>
  </section>
</template>

<script>
const list = [
  { name: 'test1', params: { text: 1 } },
  { name: 'test2', params: { text: 2 } },
  { name: 'test2', params: { text: 3 } },
  { name: 'test1', params: { text: 2 } },
  { name: 'test1', params: { text: 4 } }
];

export default {
  name: 'App',
  mounted() {
    this.handlePopup();
  },
  methods: {
    handlePopup() {
      list.reduce(async (prePopup, popup) => {
        await prePopup;
        await this.$popup(popup.name, popup.params);
      }, {});
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
</style>
