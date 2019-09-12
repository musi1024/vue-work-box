<template>
  <li>
    <slot></slot>
  </li>
</template>

<script>
export default {
  name: 'MarqueeItem',
  mounted() {
    this.$nextTick(() => {
      this.$parent.destroy();
      this.$parent.init();
      this.$parent.start();
    });
  }
};
</script>
