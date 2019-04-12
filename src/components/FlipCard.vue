<template>
  <div
    class="flip-card"
    :class="{flip}"
    @animationend="scale = true"
    @webkitAnimationEnd="scale = true"
  >
    <div class="card flip-card-face">
      <slot name="face"></slot>
    </div>
    <div class="card flip-card-back" :class="{scale}">
      <slot name="back"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'flipCard',
  props: {
    startFlip: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      flip: this.startFlip,
      scale: false
    };
  },
  watch: {
    startFlip(val) {
      this.flip = val;
    }
  }
};
</script>

<style lang="scss" scoped>
.flip-card {
  position: relative;
  perspective: 600;
  transform-style: preserve-3d;
  transition: all 1s ease-in-out;
  & > .card {
    position: absolute;
    top: 0;
    left: 0;
  }
  &-face {
    backface-visibility: hidden;
  }
  &-back {
    transform: rotateY(180deg);
    &.scale {
      animation: scale 1.2s ease-in-out infinite alternate-reverse;
    }
  }
  &.flip {
    animation: flip 1s ease-in-out;
  }
}

@keyframes flip {
  to {
    transform: rotateY(180deg);
  }
}
@keyframes scale {
  100% {
    transform: scale(1);
  }
  0% {
    transform: scale(1.2);
  }
}
</style>


