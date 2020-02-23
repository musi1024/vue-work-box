<template>
  <div :class="['music-btn', isPlay && 'active']" @click="toggle"></div>
</template>

<script>
export default {
  name: 'MusicBtn',
  props: {},
  data() {
    return {
      isPlay: false
    };
  },
  mounted() {
    this.$bgm.onToggleState(state => {
      this.isPlay = state;
    });
  },
  methods: {
    toggle() {
      this.isPlay = !this.isPlay;
      this.isPlay ? this.$bgm.play() : this.$bgm.pause();
    }
  }
};
</script>
<style lang="scss" scoped>
.music-btn {
  @include wh(100, 100);
  margin: 0 auto;
  background-color: black;

  &.active {
    background-color: blue;
    animation: rotate360 3s linear infinite;
  }
}
</style>
