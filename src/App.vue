<template>
  <div id="app">
    <!-- <base-button :plain="false" class="demo-btn">按钮</base-button> -->
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
    <base-dialog v-if="showDialog" @CLOSE_DIALOG="closeDialog" width="80vw" title="1">
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
    <div class="dd" :class="{flip}">
      https://codepen.io/shayhowe/pen/Fvjnf
      <div class="bb face"></div>
      <div class="bb back"></div>
    </div>
  </div>
</template>

<script>
import BaseButton from './components/BaseButton';
import BaseDialog from './components/BaseDialog';
import BaseAlert from './components/BaseAlert';
import Marquee from './components/Marquee';
import { setTimeout } from 'timers';

export default {
  name: 'App',
  components: {
    'base-button': BaseButton,
    'base-dialog': BaseDialog,
    'base-alert': BaseAlert,
    Marquee
  },
  data() {
    return {
      showDialog: false,
      showAlert: false,
      arr: [],
      flip: false,
      flipEnd: false,
      text: '1111'
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
      setTimeout(() => {
        this.text = '22222';
      }, 1000);
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
  width: 100vw;
  height: 100vh;
  position: relative;
  .marquee-content {
    margin-left: 20px;
  }
  .dd {
    position: absolute;
    width: 200px;
    height: 200px;
    top: 50%;
    left: 50%;
    margin-left: -75px;
    transition: all 1s linear;
    & > .bb {
      width: 200px;
      height: 200px;
      position: absolute;
      top: 0;
      left: 0;
    }
    .face {
      @include set-image('./assets/images/1.jpg');
    }
    .back {
      @include set-image('./assets/images/2.jpg');
      z-index: 1;
    }
    &.flip {
      transform: rotateY(180deg);
      backface-visibility: hidden;
    }
  }
}
</style>
