<template>
  <scroll-wrap id="ScrollPage">
    <base-button @CLICK="goToBottom">goToBottom</base-button>
    <div class="scroll-item" v-for="i in 99" :key="i">{{i}}</div>
    <base-button @CLICK="goToTop">goToTop</base-button>
  </scroll-wrap>
</template>

<script>
import scrollSmoothTo from '../utils/scrollSmoothTo';
import ScrollWrap from '../components/ScrollWrap';
import BaseButton from '../components/BaseButton';

export default {
  name: 'ScrollPage',
  components: {
    'scroll-wrap': ScrollWrap,
    'base-button': BaseButton
  },
  props: [],
  data() {
    return {};
  },
  computed: {},
  watch: {},
  mounted() {
    console.log(this.$el.offsetHeight, this.$el.scrollHeight);
  },
  methods: {
    goToBottom() {
      scrollSmoothTo(this.$el, this.$el.scrollHeight - this.$el.offsetHeight);
    },
    goToTop() {
      scrollSmoothTo(this.$el);
    }
  }
};
</script>
<style lang='scss' scoped>
#ScrollPage {
  height: 100%;
  .base-button {
    height: px(80);
  }
}
</style>