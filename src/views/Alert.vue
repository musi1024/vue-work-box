<template>
  <section id="AlertPage">
    <base-button
      v-for="(item, index) in config"
      :key="item.index"
      @click="showAlert(index)"
    >{{item.content}}</base-button>
  </section>
</template>

<script>
import BaseButton from '../components/BaseButton';

let config = [
  {
    content: 'alert fade',
    transitionName: 'alert-fade'
  },
  { content: 'alert up', transitionName: 'alert-up' },
  {
    content: 'alert down not auto close',
    transitionName: 'alert-down',
    autoClose: false
  },
  {
    content: 'alert left has close btn',
    transitionName: 'alert-left',
    hasCloseBtn: true,
    autoClose: false
  },
  {
    content: `alert right has close btn & auto close`,
    transitionName: 'alert-right',
    hasCloseBtn: true,
    autoClose: false
  }
];

export default {
  name: 'AlertPage',
  components: {
    'base-button': BaseButton
  },
  data() {
    return {
      config
    };
  },
  methods: {
    showAlert(e) {
      this.$alert({ ...config[e] });
      console.log(this.$alert);
    }
  }
};
</script>

<style lang="scss" scoped>
#AlertPage {
  @include flex();
  flex-direction: column;
}
</style>
