<template>
  <form @submit.prevent>
    <slot></slot>
  </form>
</template>

<script>
export default {
  name: 'Form',
  provide() {
    return {
      form: this
    };
  },
  props: {
    model: {
      type: Object,
      required: true
    },
    rules: {
      type: Object
    },
    valudateOnInput: {
      type: Boolean,
      default: false
    },
    useErrorMessage: {
      type: Boolean,
      default: true
    },
    labelPosition: {
      type: String,
      default: 'right'
    },
    labelWidth: {
      type: String,
      default: '80'
    }
  },
  methods: {
    validate(cb, props) {
      const tasks = this.$children
        .filter(item => props.includes(item.prop))
        .map(item => item.validate());
      Promise.all(tasks)
        .then(() => cb(false))
        .catch(error => {
          cb(error.errors[0].message);
        });
    }
  }
};
</script>