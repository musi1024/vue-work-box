<template>
  <section id="app">
    <BaseButton @click="click(1)">按钮1</BaseButton>
    <BaseButton @click="click(2)">按钮2</BaseButton>
    <BaseButton @click="click(3)">按钮3</BaseButton>
  </section>
</template>

<script>
import BaseButton from './components/BaseButton';
export default {
  name: 'App',
  components: {
    BaseButton
  },
  data() {
    return {};
  },
  computed: {},
  mounted() {},
  methods: {
    click(e) {
      console.log('click', e);
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
