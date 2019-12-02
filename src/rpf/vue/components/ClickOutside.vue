<template>
  <component :is="tag" ref="container">
    <slot></slot>
  </component>
</template>
<script>
// https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html
import isIOS from '../../un/isIOS';
const envIOS = isIOS();
export default {
  name: 'ClickOutside',
  props: {
    tag: {
      type: String,
      default: 'div'
    }
  },
  created() {
    this.isTouch = false;
  },
  mounted() {
    if (envIOS) {
      document.addEventListener('touchend', this.docClick, true);
    }
    document.addEventListener('click', this.docClick, true);
  },
  destroyed() {
    if (envIOS) {
      document.removeEventListener('touchend', this.docClick, true);
    }
    document.removeEventListener('click', this.docClick, true);
  },
  methods: {
    docClick(e) {
      if (e.type === 'touchend') this.isTouch = true;
      if (e.type === 'click' && this.isTouch) return;
      if (!this.$refs.container.contains(e.target)) {
        setTimeout(() => {
          this.$emit('click-outside');
        }, 360);
      }
    }
  }
};
</script>
