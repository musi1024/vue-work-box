<template>
  <section id="ButtonPage">
    <base-button @CLICK="clickButton">按钮</base-button>
    <base-button :disabled="true" @CLICK="clickButton">禁用按钮</base-button>
    <base-button :plain="true" @CLICK="clickButton">按钮</base-button>
  </section>
</template>

<script>
import BaseButton from '../components/BaseButton';
export default {
  name: 'ButtonPage',
  components: {
    'base-button': BaseButton
  },
  methods: {
    clickButton() {
      console.log(Date.now());
    }
  }
};
</script>

<style lang="scss" scoped>
#ButtonPage {
  @include flex();
  flex-direction: column;
}
</style>


