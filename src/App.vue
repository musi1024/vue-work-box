<template>
  <section id="app">
    <router-view></router-view>
    <Loading v-if="loading" @finish="loading = false"></Loading>
    <div class="post-wrap ">
      <img class="post-img" :src="post" alt="" />
    </div>
  </section>
</template>

<script>
import Loading from '@/views/Loading';
import staticCanvas from '@/rpf/un/staticCanvas';
export default {
  name: 'App',
  components: {
    Loading
  },
  data() {
    return {
      loading: true,
      post: null
    };
  },
  async mounted() {
    const canvas = await staticCanvas({
      width: 750,
      height: 1334,
      layers: [
        {
          type: 'text',
          font: 'bold 64px Arial',
          text: '手机身上啊\nss饿了塞阿拉饿了塞阿拉了塞阿拉饿了塞阿拉',
          fill: '#e44338',
          x: 0,
          y: 0,
          lineHeight: 64,
          maxWidth: 400,
          textOverflow: '...'
        },
        {
          type: 'rect',
          x: 0,
          y: 300,
          width: 400,
          height: 100
        }
      ]
    });
    this.post = await canvas.toDataURL();
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
.post-wrap {
  position: absolute;
  left: 0;
  top: vw(40);
  right: 0;
  margin: 0 auto;
  @include wh(506, 901);
  border: 1px solid black;
}

.post-img {
  max-width: 100%;
  max-height: 100%;
}
</style>
