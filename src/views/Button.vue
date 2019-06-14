<template>
  <section id="ButtonPage">
    <base-button @CLICK="clickButton('btn')">按钮</base-button>
    <base-button :plain="true" @CLICK="clickButton('plain btn')">plain按钮</base-button>
    <base-button :lock-time="5000" @CLICK="clickButton('no lock btn')">lock time 5s 按钮</base-button>
    <base-button :use-lock="false" @CLICK="clickButton('no lock btn')">no lock 按钮</base-button>
    <base-button :disabled="true" @CLICK="clickButton('disabled btn')">禁用按钮</base-button>
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
    clickButton(e) {
      console.log(e);
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


