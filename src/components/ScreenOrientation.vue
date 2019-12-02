<template>
  <section v-if="isOrientation" id="ScreenOrientation">
    <div></div>
    <p>竖屏体验效果更佳</p>
  </section>
</template>

<script>
export default {
  name: 'ScreenOrientation',
  data() {
    return {
      isOrientation: false
    };
  },
  mounted() {
    window.addEventListener(
      'onorientationchange' in window ? 'orientationchange' : 'resize',
      () => {
        if (window.orientation === 90 || window.orientation === -90) {
          this.isOrientation = true;
        } else {
          this.isOrientation = false;
        }
      },
      false
    );
  }
};
</script>

<style lang="scss" scoped>
#ScreenOrientation {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 5000;
  background: #121212;
  @include flex();
  flex-direction: column;
  > div {
    @include img('../assets/images/screenOrientation.png');
    width: vw(250);
    height: vw(242);
    animation: orientation 2s ease-out 0s infinite;
  }
  > p {
    width: 100%;
    font-size: vw(16);
    color: #bbbbbb;
    text-align: center;
  }
}
</style>
