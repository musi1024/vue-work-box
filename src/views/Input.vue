<template>
  <section id="InputPage">
    <base-input v-model="value1" placeholder="error value more than 5" :error="value1.length > 5"></base-input>
    <span>{{value1}}</span>

    <base-input v-model="value2" type="number" placeholder="number"></base-input>
    <span>{{value2}}</span>

    <base-input v-model.trim="value3" placeholder="trim"></base-input>
    <span>{{value3}}</span>
  </section>
</template>

<script>
import BaseInput from '../components/BaseInput';
export default {
  name: 'InputPage',
  components: {
    'base-input': BaseInput
  },
  data() {
    return {
      value1: '',
      value2: '',
      value3: ''
    };
  },

  computed: {},

  watch: {},

  mounted() {},

  methods: {}
};
</script>
<style lang='scss' scoped>
#InputPage {
  @include flex();
  flex-direction: column;
  .base-input {
    margin: px(20);
  }
}
</style>