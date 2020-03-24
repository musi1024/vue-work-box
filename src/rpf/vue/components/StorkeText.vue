<template>
  <div class="st-wrap">
    <span
      class="st-before"
      :style="{
        'text-stroke': `${strokeWidth} ${stroke}`
      }"
    >
      {{ text }}
    </span>
    <span class="st-text">{{ text }}</span>
  </div>
</template>
<script>
export default {
  props: {
    text: {
      type: String,
      default: '',
      required: true
    },
    strokeWidth: {
      type: String,
      default: '5px'
    },
    stroke: {
      type: String,
      default: '#000'
    }
  }
};
</script>
<style lang="scss" scoped>
.st-wrap {
  display: inline-block;
  white-space: nowrap;
  position: relative;
  color: white;

  .st-text {
    position: relative;
    z-index: 2;
  }
  .st-before {
    position: absolute;
    z-index: 1;
  }
}
</style>
