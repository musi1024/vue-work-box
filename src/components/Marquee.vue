<template>
  <section ref="wrap" id="Marquee">
    <div ref="content" class="marquee-content" :class="[animationClass]" :style="contentStyle">
      <div class="marquee-item" v-for="i in content" :key="i">{{i}}</div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Marquee',
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
      default: 60
    }
  },
  data() {
    return {
      wrapWidth: 0, //父元素宽度
      offsetWidth: 0, // 内容宽度,
      duration: 0, // 一次动画的时间
      animationClass: '' // animattion
    };
  },
  computed: {
    contentStyle() {
      return {
        paddingLeft: this.wrapWidth + 'px',
        animationDelay: this.delay + 's',
        animationDuration: this.duration + 's'
      };
    }
  },
  watch: {
    content: {
      // 监听到有内容,计算宽度,并计算时间,添加动画
      handler() {
        this.wrapWidth = 0;
        this.$nextTick(() => {
          const { wrap, content } = this.$refs;
          const wrapWidth = wrap.getBoundingClientRect().width;
          const offsetWidth = content.getBoundingClientRect().width;
          this.wrapWidth = wrapWidth;
          this.offsetWidth = offsetWidth;
          this.duration = offsetWidth / this.speed;
          this.animationClass = 'horizontal-infinite';
        });
      }
    }
  },
  methods: {}
};
</script>

<style lang="scss">
#Marquee {
  position: relative;
  padding: 0;
  width: 100%;
  height: px(76);
  line-height: px(76);
  font-size: px(46);
  color: rgb(255, 255, 255);
  background-color: black;
  overflow: hidden;

  .marquee-content {
    @include flex();
    flex-direction: column;
    position: absolute;
    white-space: nowrap;
    flex-direction: row;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    z-index: 1;
  }
  .marquee-item {
    margin-left: px(70);
  }

  .horizontal-infinite {
    animation: horizontal-infinite linear infinite;
  }
}

@keyframes horizontal-infinite {
  to {
    transform: translate3d(-100%, 0, 0);
  }
}
</style>