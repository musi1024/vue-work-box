<template>
  <input class="base-input" :value="value" @input="onInput" v-bind="$attrs" />
</template>

<script>
export default {
  name: 'Input',
  inheritAttrs: false,
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  methods: {
    onInput(e) {
      this.$emit('input', e.target.value);
      this.$parent.$emit('validate');
    }
  }
};
</script>

<style lang="scss">
.base-input {
  border: none;
  background-color: rgba(0, 0, 0, 0);
}
</style>