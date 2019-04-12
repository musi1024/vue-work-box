<template>
  <div ref="wrap" class="wrap marquee">
    <div
      ref="content"
      class="content"
      :class="animationClass"
      :style="contentStyle"
      @animationend="onAnimationEnd"
      @webkitAnimationEnd="onAnimationEnd"
    >
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'marquee',
  props: {
    content: {
      default: ''
    },
    delay: {
      type: Number,
      default: 0.5
    },
    speed: {
      type: Number,
      default: 50
    }
  },
  mounted() {},
  data() {
    return {
      wrapWidth: 0, //父盒子宽度
      firstRound: true, //判断是否
      duration: 0, //css3一次动画需要的时间
      offsetWidth: 0, //子盒子的宽度
      animationClass: '' //添加animate动画
    };
  },
  computed: {
    contentStyle() {
      return {
        paddingLeft: this.wrapWidth + 'px',
        // 只有第一次的时候需要延迟
        animationDelay: (this.firstRound ? this.delay : 0) + 's',
        animationDuration: this.duration + 's'
      };
    }
  },
  watch: {
    content: {
      // 监听到有内容,计算宽度,并计算时间,添加动画
      handler() {
        this.$nextTick(() => {
          const { wrap, content } = this.$refs;
          const wrapWidth = wrap.getBoundingClientRect().width;
          const offsetWidth = content.getBoundingClientRect().width;
          this.wrapWidth = wrapWidth;
          this.offsetWidth = offsetWidth;
          this.duration = offsetWidth / this.speed;
          this.animationClass = 'animate-infinite';
        });
      }
    }
  },
  methods: {
    onAnimationEnd() {
      this.firstRound = false;
      this.duration = (this.offsetWidth + this.wrapWidth) / this.speed;
    }
  }
};
</script>
<style lang="scss" scoped>
.wrap {
  width: 100%;
  height: 24px;
  line-height: 24px;
  overflow: hidden;
  position: relative;
  background: #000000;
  color: #eeeeee;
  font-size: 12px;
  position: relative;
  padding: 0;

  & .content {
    position: absolute;
    white-space: nowrap;
  }

  .animate-infinite {
    animation: marquee-infinite linear infinite;
  }
}
</style>