<template>
  <li>
    <slot></slot>
  </li>
</template>

<script>
export default {
  name: 'MarqueeVerticalItem',
  mounted() {
    this.$nextTick(() => {
      this.$parent.destroy();
      this.$parent.init();
      this.$parent.start();
    });
  }
};
</script>
