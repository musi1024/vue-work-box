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
    transitionClass: 'alert-fade'
  },
  { content: 'alert up', transitionClass: 'alert-up' },
  {
    content: 'alert down not auto close',
    transitionClass: 'alert-down',
    autoClose: false
  },
  {
    content: 'alert left has close btn',
    transitionClass: 'alert-left',
    hasClose: true
  },
  {
    content: `alert right has close btn & auto close`,
    transitionClass: 'alert-right',
    hasClose: true,
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
      this.$bus.$emit('SHOW_ALERT', { ...config[e] });
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
