<template>
  <div id="app">
    <!-- <base-button :plain="false" class="demo-btn">按钮</base-button> -->
    <base-button :plain="true" @CLICK_BTN="clickBtn" disabled>按钮</base-button>
    <base-button :plain="false" @CLICK_BTN="clickBtn">按钮</base-button>
    <base-dialog v-if="showDialog" @CLOSE_DIALOG="closeDialog" width="80vw" title="1">
      <template v-slot:header>
        title
        <base-button class="dialog-close" :plain="true" @CLICK_BTN="closeDialog">x</base-button>
      </template>
      <template
        v-slot:main
      >this is dialogthis is dialogthis is dialogthis is dialogthis is dialogthis is dialogthis is dialogthis is dialogthis is dialogthis is dialogthis is dialogthis is dialogthis is dialogthis is dialogthis is dialogthis is dialog</template>
      <template v-slot:footer>
        <base-button :plain="true" @CLICK_BTN="closeDialog">取消</base-button>
        <base-button :plain="false" @CLICK_BTN="closeDialog">确认</base-button>
      </template>
    </base-dialog>
  </div>
</template>

<script>
import BaseButton from './components/BaseButton';
import BaseDialog from './components/BaseDialog';

export default {
  name: 'App',
  components: {
    'base-button': BaseButton,
    'base-dialog': BaseDialog
  },
  data() {
    return {
      showDialog: false
    };
  },
  methods: {
    clickBtn() {
      console.log('click');
      this.showDialog = true;
    },
    closeDialog() {
      this.showDialog = false;
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
}
</style>
