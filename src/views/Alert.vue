<template>
  <section id="AlertPage">
    <base-alert :show-alert="showAlert" @CLOSE_ALERT="showAlert = false"></base-alert>
    <base-button @CLICK="showAlert = true">alert</base-button>
  </section>
</template>

<script>
import BaseAlert from '../components/BaseAlert';
import BaseButton from '../components/BaseButton';

export default {
  name: 'AlertPage',
  components: {
    'base-alert': BaseAlert,
    'base-button': BaseButton
  },
  data() {
    return {
      showAlert: false
    };
  }
};
</script>

<style lang="scss" scoped>
</style>
