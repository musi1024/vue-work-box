<template>
  <section id="InputPage">
    <!-- <base-input v-model="value" placeholder="eee" :error="value.length > 5"></base-input> -->
    <input type="text" v-model="value">
    <span>{{value}}</span>
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
      value: ''
    };
  },

  computed: {},

  watch: {
    value(e) {
      console.log(e);
    }
  },

  mounted() {},

  methods: {}
};
</script>
<style lang='scss' scoped>
#InputPage {
  @include flex();
  flex-direction: column;
}
</style>