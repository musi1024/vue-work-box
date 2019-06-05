<template>
  <section id="SelectPage">
    <base-select :select-option="option" v-model="value" placeholder="请选择"></base-select>
    <base-select :select-option="option1" v-model="value1" placeholder="空选项"></base-select>
    <base-select :select-option="option" v-model="value2" placeholder="请选择"></base-select>
    <base-select :select-option="option" v-model="value3" placeholder="请选择"></base-select>
  </section>
</template>

<script>
import BaseSelect from '../components/BaseSelect';
export default {
  name: 'SelectPage',
  components: {
    'base-select': BaseSelect
  },
  data() {
    return {
      option: [],
      option1: [],
      value: '',
      value1: '',
      value2: '',
      value3: ''
    };
  },
  mounted() {
    this.option = [
      { label: '1111', value: '1' },
      { label: '2222', value: '2' },
      { label: '3333', value: '3' },
      { label: '4444', value: '4' },
      { label: '5555', value: '5' },
      { label: '6666', value: '6' },
      { label: '7777', value: '7' },
      { label: '8888', value: '8' },
      { label: '9999', value: '9' }
    ];
  }
};
</script>


