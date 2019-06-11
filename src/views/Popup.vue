<template>
  <section id="popupPage">
    <base-button @CLICK="popup(1)">触发popup</base-button>
    <base-button @CLICK="popup(2)">触发popup hasclose</base-button>
    <base-button v-for="i in 99" :key="i">{{i}}</base-button>
    <base-popup v-show="showPopup1" @CLOSE_POPUP="showPopup1 = false">
      <div v-for="i in 99" :key="i">{{i}}</div>
    </base-popup>
    <base-popup v-show="showPopup2" :has-close="true" @CLOSE_POPUP="showPopup2 = false">
      <div v-for="i in 99" :key="i">{{i}}</div>
    </base-popup>
  </section>
</template>

<script>
import BaseButton from '../components/BaseButton';
import BasePopup from '../components/BasePopup';
export default {
  name: 'popupPage',
  components: {
    'base-popup': BasePopup,
    'base-button': BaseButton
  },
  data() {
    return {
      showPopup1: false,
      showPopup2: false
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
}
</style>


