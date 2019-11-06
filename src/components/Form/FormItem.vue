<template>
  <div :class="['form-item', `label-${form.labelPosition}` ]">
    <label class="form-item-label" :style="labelStyle" v-if="label">{{label}}</label>
    <slot></slot>
    <div class="form-item-error" v-if="form.useErrorMessage && errorMessage">{{errorMessage}}</div>
  </div>
</template>

<script>
import Schema from 'async-validator';
export default {
  name: 'FormItem',
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
  computed: {
    labelStyle() {
      return {
        width: this.form.labelWidth / 7.5 + 'vw',
        textAlign: this.form.labelPosition === 'right' ? 'right' : 'left'
      };
    }
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
.form-item {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  margin: 0 auto;

  &.label-top {
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
  }

  &-error {
    position: absolute;
    top: 100%;
    left: 0%;
    font-size: 14px;
    color: red;
  }
}
</style>