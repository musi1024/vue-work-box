<template>
  <section class="base-collapse">
    <slot></slot>
  </section>
</template>

<script>
function isArray(obj) {
  if (typeof Array.isArray === 'undefined') {
    return Object.prototype.toString.call(obj) === '[object Array]';
  } else {
    return Array.isArray(obj);
  }
}
export default {
  name: 'BaseCollapse',
  model: {
    props: 'value',
    event: 'change'
  },
  props: {
    value: [Array, Number, String]
  },
  provide() {
    return {
      collapse: this
    };
  },
  data() {
    return {
      actives: this.value
    };
  },
  watch: {
    value(value) {
      this.actives = value;
    }
  },
  methods: {
    handleClick(name) {
      let activeNames;
      if (isArray(this.actives)) {
        activeNames = this.actives.slice(0);
        let index = activeNames.indexOf(name);
        index > -1 ? activeNames.splice(index, 1) : activeNames.push(name);
      } else {
        activeNames = name === this.actives ? '' : name;
      }
      this.$emit('change', activeNames);
    }
  }
};
</script>
