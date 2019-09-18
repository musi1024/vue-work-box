<template>
  <section id="app">
    <div class="rank">
      <div class="rank-title">花朵数量排行榜</div>
      <ul class="rank-box scrollable" v-infinite-scroll="load">
        <li class="rank-item" v-for="(i,index) in list" :key="index">
          <span class="rank-item-no">{{index + 1}}.</span>
          <span class="rank-item-name">{{i.nickname}}的花园</span>
          <span class="rank-item-num">{{i.flower_finish_num}}朵</span>
        </li>
        <li class="rank-item" v-if="lock">加载中。。。。</li>
      </ul>
      <div class="rank-my">
        <span class="rank-my-no">{{rank}}. 我的花园</span>
        <span class="rank-my-num">1朵</span>
      </div>
    </div>
  </section>
</template>

<script>
const items = [
  {
    openid: '2',
    nickname: 'b',
    flower_finish_num: 10
  },
  {
    openid: '1',
    nickname: 'a',
    flower_finish_num: 10
  },
  {
    openid: '3',
    nickname: 'c',
    flower_finish_num: 5
  },
  {
    openid: '2',
    nickname: 'b',
    flower_finish_num: 10
  }
];
export default {
  name: 'App',
  components: {},
  data() {
    return {
      count: 0,
      list: [],
      rank: 1,
      page: 1,
      lock: false
    };
  },
  mounted() {
    this.list = this.list.concat(items);
    this.list = this.list.concat(items);
  },
  methods: {
    load() {
      if (this.lock) return;
      this.lock = true;
      console.log('**debug**');
      setTimeout(() => {
        this.list = this.list.concat(items);
        this.lock = false;
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

  .rank {
    @include wh(666, 799);
    @include flex(flex-start);
    flex-direction: column;
    position: relative;
    transition: all 0.2s ease-in-out;
    background-color: #2c3e50;
  }
  .rank-title {
    @include wh(360, 71);
    @include flex();
    margin: px(45) 0 px(49);
    font-size: px(40);
    font-weight: bold;
    color: #ffffff;
  }

  .rank-box {
    @include wh(471, 350);
    border-bottom: 1px solid #9ab0d9;
    list-style: none;
    padding: 0;
    margin: 0;
    overflow: auto;
  }

  .rank-item {
    @include flex();
    padding-right: px(50);
    padding-bottom: px(18);
    font-size: px(30);
    color: rgb(72, 106, 170);
    &-name {
      @include truncate-text();
      width: 69%;
      padding-left: px(20);
      text-align: start;
    }
    &-no {
      min-width: 15%;
      text-align: end;
    }
    &-num {
      width: 16%;
      font-weight: bold;
      color: #ff5555;
      text-align: end;
    }
  }

  .rank-my {
    @include wh(405, 50);
    @include flex(space-between);
    margin-top: px(32);
    padding: 0 px(20);
    font-size: px(30);
    line-height: px(50);
    border-radius: px(25);
    background-color: rgb(255, 255, 255);
    font-weight: bold;
    &-no {
      color: #c03925;
    }
    &-num {
      color: #ff5555;
    }
  }

  .rank-confirm-btn {
    @include wh(100, 80);
    margin: px(20);
  }
}
</style>
