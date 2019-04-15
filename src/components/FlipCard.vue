<template>
  <div
    class="flip-card"
    :class="{flip}"
    @animationend="flipEnd"
    @webkitAnimationEnd="flipEnd"
    @click="clickCard"
  >
    <div class="card flip-card-face" v-if="!disabled">
      <slot name="face"></slot>
    </div>
    <div class="card flip-card-back" :class="{scale, disabled}">
      <slot name="back"></slot>
    </div>
    <div class="flip-card-text">
      <slot name="text"></slot>
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
    },
    hasFollowUp: {
      type: Boolean
    }
  },
  data() {
    return {
      flip: this.startFlip,
      scale: false,
      disabled: false
    };
  },
  methods: {
    clickCard() {
      this.$emit('CLICK_CARD');
    },
    flipEnd() {
      this.$emit('FLIP_END');
      this.scale = this.hasFollowUp;
      this.disabled = !this.hasFollowUp;
    }
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
    backface-visibility: hidden;
  }
  &-back {
    transform: rotateY(-180deg);
    &.scale {
      animation: scale 1.2s ease-in-out infinite alternate-reverse;
    }
    &.disabled {
      transform: rotateY(360deg);
    }
  }
  &-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  &.flip {
    animation: flip 2s ease-in-out;
  }
}
</style>


