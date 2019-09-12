<template>
  <BasePopup v-if="show" class="error-popup" v-longPress="{handler:alert, time:1000}">{{content}}</BasePopup>
</template>

<script>
import BasePopup from './BasePopup';
export default {
  name: 'Error',
  components: { BasePopup },
  props: {
    content: {
      type: String,
      default: 'error'
    },
    onShow: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      show: false
    };
  },
  mounted() {
    this.show = true;
    this.onShow(this);
  },
  methods: {
    alert() {
      alert(this.content);
    }
  }
};
</script>

<style lang="scss">
.error-popup .base-popup-container {
  @include wh(600, 800);
  @include flex();
  background-color: aliceblue;
}
</style>
