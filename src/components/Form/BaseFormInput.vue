<template>
  <input
    class="base-form-input"
    :value="value"
    @input="onInput"
    v-bind="$attrs"
  />
</template>

<script>
export default {
  name: 'BaseFormInput',
  inject: ['form'],
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
      this.form.valudateOnInput && this.$parent.$emit('validate');
    }
  }
};
</script>

<style lang="scss">
.base-form-input {
  border: none;
  background-color: rgba(0, 0, 0, 0);
}
</style>
