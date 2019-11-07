<template>
  <form @submit.prevent>
    <slot></slot>
  </form>
</template>

<script>
export default {
  name: 'BaseForm',
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
      default: 'left'
    },
    labelFullWidth: {
      type: Boolean,
      default: false
    },
    labelClass: {
      type: String,
      default: 'base-form-label'
    },
    errorClass: {
      type: String,
      default: 'base-form-item-error'
    }
  },
  methods: {
    validate(cb, props) {
      const tasks = this.$children
        .filter(item => {
          return props ? props.includes(item.prop) : item.prop;
        })
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