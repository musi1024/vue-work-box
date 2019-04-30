<template>
  <section class="container">
    <v-reload
      :on-infinite-load="onInfiniteLoad"
      :parent-pull-up-state="infiniteLoadData.pullUpState"
    >
      <div class="card_order">
        <div slot="load-more">
          <li class="card_list" v-for="(item) in infiniteLoadData.pullUpList" :key="item.id">
            <div class="card_content">
              <div class="card_list_text">
                <p class="card_name">{{item.cardName}}</p>
              </div>
            </div>
          </li>
        </div>
      </div>
    </v-reload>
  </section>
</template>

<script>
import PullUpReload from '../components/PullUpReload';
export default {
  data() {
    return {
      card_list: [
        {
          cardName: '平安银行信用卡'
        },
        {
          cardName: '平安银行信用卡'
        },
        {
          cardName: '平安银行信用卡'
        },
        {
          cardName: '平安银行信用卡'
        },
        {
          cardName: '平安银行信用卡'
        },
        {
          cardName: '平安银行信用卡'
        },
        {
          cardName: '平安银行信用卡'
        },
        {
          cardName: '平安银行信用卡'
        },
        {
          cardName: '平安银行信用卡'
        },
        {
          cardName: '平安银行信用卡'
        },
        {
          cardName: '平安银行信用卡'
        },
        {
          cardName: '平安银行信用卡'
        },
        {
          cardName: '平安银行信用卡'
        },
        {
          cardName: '平安银行信用卡'
        },
        {
          cardName: '平安银行信用卡'
        },
        {
          cardName: '平安银行信用卡'
        }
      ],

      // 上拉加载的设置
      infiniteLoadData: {
        initialShowNum: 9, // 初始显示多少条
        everyLoadingNum: 3, // 每次加载的个数
        pullUpState: 0, // 子组件的pullUpState状态
        pullUpList: [], // 上拉加载更多数据的数组
        showPullUpListLength: this.initialShowNum // 上拉加载后所展示的个数
      }
    };
  },
  mounted() {
    this.getStartPullUpState();
    this.getPullUpDefData();
  },
  methods: {
    // 获取上拉加载的初始数据
    getPullUpDefData() {
      this.infiniteLoadData.pullUpList = [];
      for (let i = 0; i < this.infiniteLoadData.initialShowNum; i++) {
        this.infiniteLoadData.pullUpList.push(this.card_list[i]);
      }
    },

    getStartPullUpState() {
      if (this.card_list.length === this.infiniteLoadData.initialShowNum) {
        // 修改子组件的pullUpState状态
        this.infiniteLoadData.pullUpState = 3;
      } else {
        this.infiniteLoadData.pullUpState = 0;
      }
    },

    // 上拉一次加载更多的数据
    getPullUpMoreData() {
      this.showPullUpListLength = this.infiniteLoadData.pullUpList.length;
      if (
        this.infiniteLoadData.pullUpList.length +
          this.infiniteLoadData.everyLoadingNum >
        this.card_list.length
      ) {
        for (
          let i = 0;
          i < this.card_list.length - this.showPullUpListLength;
          i++
        ) {
          this.infiniteLoadData.pullUpList.push(
            this.card_list[i + this.showPullUpListLength]
          );
        }
      } else {
        for (let i = 0; i < this.infiniteLoadData.everyLoadingNum; i++) {
          this.infiniteLoadData.pullUpList.push(
            this.card_list[i + this.showPullUpListLength]
          );
        }
      }
      if (this.card_list.length === this.infiniteLoadData.pullUpList.length) {
        this.infiniteLoadData.pullUpState = 3;
      } else {
        this.infiniteLoadData.pullUpState = 0;
      }
    },

    // 上拉加载
    onInfiniteLoad(done) {
      if (this.infiniteLoadData.pullUpState === 0) {
        this.getPullUpMoreData();
      }
      done();
    }
  },
  components: {
    'v-reload': PullUpReload
  }
};
</script>

<style scoped>
</style>