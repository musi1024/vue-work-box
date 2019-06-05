<template>
  <section id="AlertPage">
    <base-alert
      :show-alert="showAlert"
      transition-class="alert-fade"
      @CLOSE_ALERT="showAlert = false"
    >alert fade</base-alert>
    <base-alert
      :show-alert="showAlert1"
      transition-class="alert-up"
      @CLOSE_ALERT="showAlert1 = false"
    >alert up</base-alert>
    <base-alert
      :show-alert="showAlert2"
      :auto-close="false"
      transition-class="alert-down"
      @CLOSE_ALERT="showAlert2 = false"
    >alert down not auto close</base-alert>
    <base-alert
      :show-alert="showAlert3"
      :auto-close="false"
      :has-close="true"
      transition-class="alert-left"
      @CLOSE_ALERT="showAlert3 = false"
    >alert left has close btn</base-alert>
    <base-alert
      :show-alert="showAlert4"
      :auto-close="false"
      :has-close="true"
      transition-class="alert-right"
      @CLOSE_ALERT="showAlert4 = false"
    >alert right has close btnalert right has close btnalert right has close btnalert right has close btnalert right has close btnalert right has close btnalert right has close btnalert right has close btnalert right has close btnalert right has close btnalert right has close btnalert right has close btnalert right has close btnalert right has close btnalert right has close btn</base-alert>
    <base-button @CLICK="showAlert = true">alert fade</base-button>
    <base-button @CLICK="showAlert1 = true">alert up</base-button>
    <base-button @CLICK="showAlert2 = true">alert down not auto close</base-button>
    <base-button @CLICK="showAlert3 = true">alert left has close btn</base-button>
    <base-button @CLICK="showAlert4 = true">alert right has close btn</base-button>
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
      showAlert: false,
      showAlert1: false,
      showAlert2: false,
      showAlert3: false,
      showAlert4: false,
    };
  }
};
</script>

<style lang="scss" scoped>
#AlertPage {
  @include flex();
  flex-direction: column;
}
</style>
