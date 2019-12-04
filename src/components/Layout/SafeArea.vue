<template>
  <section class="safe-area">
    <slot></slot>
  </section>
</template>

<script>
export default {
  name: 'SafeArea'
};
</script>
<style lang="scss" scoped>
.safe-area {
  width: 100%;
  height: 1206px;
  position: relative;
  display: flex;
  flex-direction: column;
}

@media (min-aspect-ratio: 750 / 1200) {
  .safe-area {
    height: 100%;
  }
}
</style>
