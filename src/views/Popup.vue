<template>
  <section id="popupPage">
    <base-button @CLICK="popup(1)">触发 popup 1</base-button>
    <base-popup :visible.sync="showPopup1" animation-name="bounceInUp">
      <main class="popup-content">
        <base-button class="popup-btn" @CLICK="showPopup1 = false">close popup 1</base-button>
        <div v-for="i in 99" :key="i">{{i}}</div>
      </main>
    </base-popup>

    <base-button @CLICK="popup(2)">触发 popup 2</base-button>
    <base-popup :visible.sync="showPopup2">
      <main class="popup-content">
        <base-button class="popup-btn" @CLICK="showPopup2 = false">close popup 2</base-button>
        <div v-for="i in 99" :key="i">{{i}}</div>
      </main>
    </base-popup>

    <base-button @CLICK="popup(3)">触发 popup 3</base-button>
    <base-popup :visible.sync="showPopup3">
      <main class="popup-content">
        <base-button class="popup-btn" @CLICK="showPopup3 = false">close popup 3</base-button>
        <div v-for="i in 99" :key="i">{{i}}</div>
      </main>
    </base-popup>
  </section>
</template>
  
<script>
import BaseButton from '../components/BaseButton';
import BasePopup from '../components/Popup/BasePopup';
export default {
  name: 'popupPage',
  components: {
    'base-popup': BasePopup,
    'base-button': BaseButton
  },
  data() {
    return {
      showPopup1: false,
      showPopup2: false,
      showPopup3: false
    };
  },
  mounted() {
    this.$bus.$on('SHOW_POPUP', e => {
      switch (e) {
        case 1:
          this.showPopup1 = true;
          break;
        case 2:
          this.showPopup2 = true;
          break;
        case 3:
          this.showPopup3 = true;
          break;
        default:
          break;
      }
    });
  },
  methods: {
    popup(e) {
      this.$bus.$emit('SHOW_POPUP', e);
    }
  }
};
</script>

<style lang="scss" scoped>
#popupPage {
  @include flex();
  flex-direction: column;
  .popup-content {
    width: 100%;
    height: 100%;
    overflow-y: scroll;
  }
}
</style>


