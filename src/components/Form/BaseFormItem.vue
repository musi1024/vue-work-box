<template>
  <div :class="['base-form-item', `base-label-${form.labelPosition}` ]">
    <label :class="form.labelClass" v-if="label">
      <template v-if="!form.labelFullWidth">{{label}}</template>
      <template v-else>
        <span v-for="i in label" :key="i.index">{{ i }}</span>
      </template>
    </label>
    <slot></slot>
    <div :class="form.errorClass" v-if="form.useErrorMessage && errorMessage">{{errorMessage}}</div>
  </div>
</template>

<script>
import Schema from 'async-validator';
export default {
  name: 'BaseFormItem',
  inject: ['form'],
  props: {
    label: {
      type: String,
      default: ''
    },
    prop: {
      type: String
    }
  },
  data() {
    return {
      errorMessage: ''
    };
  },
  mounted() {
    this.$on('validate', () =>
      this.validate().catch(error => console.log(error))
    );
  },
  methods: {
    validate() {
      // 做校验
      const value = this.form.model[this.prop];
      const rules = this.form.rules[this.prop];

      const desc = { [this.prop]: rules };
      const schema = new Schema(desc);
      return schema.validate({ [this.prop]: value }, errors => {
        if (errors) {
          this.errorMessage = errors[0].message;
        } else {
          this.errorMessage = '';
        }
      });
    }
  }
};
</script>

<style lang="scss">
.base-form-item {
  position: relative;
  display: flex;
  width: 100%;
  &-label-right {
    flex-direction: row-reverse;
  }
  &-label-bottom {
    flex-direction: column-reverse;
  }
  &-label-top {
    flex-direction: column;
  }

  &-error {
    position: absolute;
    top: 100%;
    left: 0%;
    font-size: vw(18);
    color: red;
  }
}
</style>