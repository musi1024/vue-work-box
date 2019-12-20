<!--
 * @Author: musi
 * @Date: 2019-12-11 15:40:49
 * @LastEditors  : musi
 * @LastEditTime : 2019-12-20 11:29:00
 * @Description: file content
 -->
<template>
  <section id="app">
    <router-view></router-view>
  </section>
</template>

<script>
export default {
  name: 'App'
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
