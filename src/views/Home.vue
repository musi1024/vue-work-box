<template>
  <div id="home">
    <base-button :plain="true" @CLICK="clickDialogBtn" disabled>不可用按钮</base-button>
    <base-button @CLICK="clickDialogBtn">触发dialog按钮</base-button>
    <base-button @CLICK="clickAlertBtn">触发alert按钮</base-button>
    <base-button @CLICK="clickFlipBtn">触发flip按钮</base-button>
    <base-button @CLICK="clickPopupBtn">触发popup按钮</base-button>
    <base-popup v-show="showPopup" @CLOSE_POPUP="closePopup"></base-popup>
    <base-alert
      :show-alert="showAlert"
      :has-icon="true"
      :auto-close="false"
      @CLOSE_ALERT="closeAlert"
    >
      <template v-slot:icon>I</template>
      <template v-slot:main>tttttttttt</template>
      <template v-slot:close>x</template>
    </base-alert>
    <base-dialog class="test-dialog" v-show="showDialog" @CLOSE_DIALOG="closeDialog">
      <div class="test-dialog-container" @click.stop>
        <h3>here is title</h3>
        <base-button @CLICK="closeDialog">确认</base-button>
      </div>
    </base-dialog>
    <Marquee :content="arr">
      <span class="marquee-content" v-for="(item, index) in arr" :key="index">{{item}}</span>
    </Marquee>
    <flip-card
      class="flip-card"
      :start-flip="flip"
      :has-follow-up="true"
      @CLICK_CARD="clickFlipBtn"
    >
      <template v-slot:face>
        <div class="card-face"></div>
      </template>
      <template v-slot:back>
        <div class="card-back"></div>
      </template>
    </flip-card>
    <base-tabs :tab-list="tabList" :tab-index="tabIndex" @CHANGE="changeTab">
      <div v-if="!tabIndex">111111111111111111111111</div>
      <div v-else>1111111111111222211111111111</div>
    </base-tabs>
    <base-collapse v-for="item in collapseArr" :key="item.index" :title="item.title" :content='item.content'></base-collapse>
  </div>
</template>

<script>
import BaseTabs from '../components/BaseTabs';
import BaseButton from '../components/BaseButton';
import BaseDialog from '../components/BaseDialog';
import BaseAlert from '../components/BaseAlert';
import BasePopup from '../components/BasePopup';
import BaseCollapse from '../components/BaseCollapse';
import Marquee from '../components/Marquee';
import FlipCard from '../components/FlipCard';
export default {
  name: 'Home',
  components: {
    'base-button': BaseButton,
    'base-dialog': BaseDialog,
    'base-alert': BaseAlert,
    'base-popup': BasePopup,
    'base-tabs': BaseTabs,
    'flip-card': FlipCard,
    'base-collapse': BaseCollapse,
    Marquee
  },
  data() {
    return {
      showDialog: false,
      showAlert: false,
      showPopup: false,
      arr: [],
      flip: false,
      tabIndex: 0,
      tabList: [
        {
          index: 0,
          name: '选项一'
        },
        {
          index: 1,
          name: '选项二'
        }
      ],
      collapseArr: [
        { title: '222222', content: '2312333333333333333333333333333339231233333333333333333333333333333923123333333333333333333333333333392312333333333333333333333333333339' },
        { title: '2222222', content: '233219' },
        { title: '221112222', content: '13123213' },
        { title: '22214152414222', content: '2312333333333333333333333333333339' }
      ]
    };
  },
  mounted() {
    this.arr = [
      '111111111111111',
      '222222222222222',
      '333333333333333',
      '444444444444444',
      '555555555555555',
      '666666666666666',
      '777777777777777'
    ];
  },
  methods: {
    changeTab(tab) {
      this.tabIndex = tab.index;
    },
    clickDialogBtn() {
      console.log('click dialog btn');
      this.showDialog = true;
    },
    clickAlertBtn() {
      console.log('click alert btn');
      this.showAlert = true;
    },
    closeDialog() {
      console.log('close dialog');
      this.showDialog = false;
    },
    closeAlert() {
      console.log('close alert');
      this.showAlert = false;
    },
    clickFlipBtn() {
      console.log('flip');
      this.flip = true;
    },
    closePopup() {
      console.log('close popup');
      this.showPopup = false;
    },
    clickPopupBtn() {
      console.log('click popup btn');
      this.showPopup = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.marquee-content {
  margin-left: 20px;
}
.flip-card {
  margin: 40px;
  width: 200px;
  height: 200px;
  .card-back {
    width: 200px;
    height: 200px;
    background-color: red;
  }
  .card-face {
    width: 200px;
    height: 200px;
    background-color: blueviolet;
  }
}
</style>


