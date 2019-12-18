<!--
 * @Author: musi
 * @Date: 2019-12-11 15:40:49
 * @LastEditors: musi
 * @LastEditTime: 2019-12-16 15:00:50
 * @Description: file content
 -->
<template>
  <section id="app">
    <router-view></router-view>
    {{ test }}
  </section>
</template>

<script>
import queueCenter from '@/utils/queueCenter';
const qc = queueCenter();

export default {
  name: 'App',
  data() {
    return {
      test: false,
      a: '1'
    };
  },
  mounted() {
    qc.add([
      () => this.changeTest(this.a),
      () => this.$popup('test1', { text: 'sss' })
    ]);
    qc.run();
  },
  methods: {
    changeTest(e) {
      this.test = e;
      setTimeout(() => {
        qc.next();
      }, 2000);
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
