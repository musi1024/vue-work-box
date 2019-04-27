<template>
  <div id="home">
    <!-- <base-button :plain="false" class="demo-btn">按钮</base-button> -->
    <div class="loading"></div>
    <base-button :plain="true" @CLICK_BTN="clickDialogBtn" disabled>不可用按钮</base-button>
    <base-button @CLICK_BTN="clickDialogBtn">触发dialog按钮</base-button>
    <base-button @CLICK_BTN="clickAlertBtn">触发alert按钮</base-button>
    <base-button @CLICK_BTN="clickFlipBtn">触发flip按钮</base-button>
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
    <base-dialog v-show="showDialog" @CLOSE_DIALOG="closeDialog" width="80vw" title="1">
      <template v-slot:header>
        here is title
        <base-button class="dialog-close" :plain="true" @CLICK_BTN="closeDialog">x</base-button>
      </template>
      <template v-slot:main>here is main</template>
      <template v-slot:footer>
        <base-button :plain="true" @CLICK_BTN="closeDialog">取消</base-button>
        <base-button @CLICK_BTN="closeDialog">确认</base-button>
      </template>
    </base-dialog>
    <Marquee :content="arr">
      <span class="marquee-content" v-for="(item, index) in arr" :key="index">{{item}}</span>
    </Marquee>
    <flip-card class="flip-card" :start-flip="flip" :has-follow-up="true" @CLICK_CARD="clickFlipBtn">
      <template v-slot:face>
        <div class="card-face"></div>
      </template>
      <template v-slot:back>
        <div class="card-back"></div>
      </template>
    </flip-card>
  </div>
</template>

<script>
import BaseButton from '@/components/BaseButton';
import BaseDialog from '@/components/BaseDialog';
import BaseAlert from '@/components/BaseAlert';
import Marquee from '@/components/Marquee';
import FlipCard from '@/components/FlipCard';
export default {
  name: 'Home',
  components: {
    'base-button': BaseButton,
    'base-dialog': BaseDialog,
    'base-alert': BaseAlert,
    'flip-card': FlipCard,
    Marquee
  },
  data() {
    return {
      showDialog: false,
      showAlert: false,
      arr: [],
      flip: false
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


