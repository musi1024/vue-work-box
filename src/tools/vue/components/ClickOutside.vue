<template>
  <component :is="tag" ref="container">
    <slot></slot>
  </component>
</template>
<script>
export default {
  name: 'ClickOutside',
  props: {
    tag: {
      type: String,
      default: 'div'
    }
  },
  mounted() {
    document.addEventListener('click', this.docClick, false);
  },
  destroyed() {
    document.removeEventListener('click', this.docClick, false);
  },
  methods: {
    docClick(e) {
      if (!this.$refs.container.contains(e.target)) {
        this.$emit('click-outside');
      }
    }
  }
}
</script>