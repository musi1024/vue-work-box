<template>
  <input
    class="base-input"
    :class="{error: isError}"
    type="text"
    :value="value"
    @input="$emit('input', $event.target.value)"
    @blur="blur"
    @focus="focus"
  >
</template>

<script>
export default {
  name: 'BaseInput',
  props: {
    value: String,
    error: Boolean
  },
  data() {
    return {
      isError: this.error
    };
  },

  computed: {},

  watch: {
    error(e) {
      this.isError = e;
    }
  },

  mounted() {},

  methods: {
    blur() {
      this.hasFocus = false;
      setTimeout(() => {
        if (!this.hasFocus) {
          window.scrollTo(0, 0);
        }
      }, 100);
    },
    focus() {
      this.hasFocus = true;
    }
  }
};
</script>
<style lang='scss' scoped>
.base-input {
  border-color: #000000;
  &.error {
    border-color: red;
  }
}
</style>