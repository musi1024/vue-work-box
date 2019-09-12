<template>
  <component :is="tag" ref="container">
    <slot></slot>
  </component>
</template>
<script>
// https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html
import isIOS from '../../un/isIOS';
export default {
  name: 'ClickOutside',
  props: {
    tag: {
      type: String,
      default: 'div'
    }
  },
  mounted() {
    if (isIOS()) {
      document.addEventListener('touchend', this.docClick, true);
    } else {
      document.addEventListener('click', this.docClick, true);
    }
  },
  destroyed() {
    if (isIOS()) {
      document.removeEventListener('touchend', this.docClick, true);
    } else {
      document.removeEventListener('click', this.docClick, true);
    }
  },
  methods: {
    docClick(e) {
      if (!this.$refs.container.contains(e.target)) {
        this.$emit('click-outside');
      }
    }
  }
};
</script>