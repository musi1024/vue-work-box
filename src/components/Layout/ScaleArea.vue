<template>
  <div class="scale-area" :style="style">
    <slot />
  </div>
</template>

<script>
const HPW = window.innerHeight / window.innerWidth;
export default {
  name: 'ScaleArea',
  props: {
    maxHpW: {
      type: Number,
      default: 1200 / 750
    }
  },
  computed: {
    style() {
      if (this.maxHpW === 0 || this.maxHpW < HPW) return {};
      return {
        transform: `scale(${HPW / this.maxHpW})`
      };
    }
  }
};
</script>
