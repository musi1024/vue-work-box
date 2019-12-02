<template>
  <label
    class="base-radio"
    :class="{ checked: model == value, disabled: disabled }"
  >
    <input
      type="radio"
      ref="radio"
      :value="value"
      @click="updateVal"
      :disabled="disabled"
    />
  </label>
</template>
<script>
export default {
  name: 'BaseRadio',
  model: {
    prop: 'model',
    event: 'change'
  },
  props: {
    value: {
      type: [String, Number],
      require: true
    },
    model: {
      type: [String, Number],
      require: true
    },
    checked: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    if (this.checked === true) this.updateVal();
  },
  methods: {
    updateVal() {
      this.$emit('change', this.$refs.radio && this.$refs.radio.value);
    }
  }
};
</script>
<style lang="scss">
.base-radio {
  @include wh(32, 32);
  border-radius: 50%;
  border: 1px solid #ffffff;
  display: inline-block;
  position: relative;
}
.base-radio.disabled {
  border-color: #ccc;
}
.base-radio::after {
  content: '';
  @include wh(16, 16);
  border-radius: 50%;
  display: inline-block;
  @include center();
  background-color: #ffffff;
  transition: all 0.5s ease;
  opacity: 0;
  transform: scale(0);
}
.base-radio.disabled::after {
  background-color: #ccc;
}
.base-radio.checked::after {
  opacity: 1;
  transform: scale(1);
}
.base-radio input[type='radio'] {
  opacity: 0;
  margin: 0;
}
</style>
