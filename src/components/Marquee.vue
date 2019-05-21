<template>
  <div ref="wrap" id="Marquee">
    <div
      ref="content"
      id="Marquee-content"
      :class="[animationClass, isHorizontal ? 'horizontal' : '']"
      :style="contentStyle"
    >
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Marquee',
  props: {
    content: {
      default: ''
    },
    isSeamless: {
      type: Boolean,
      default: false
    },
    isHorizontal: {
      type: Boolean,
      default: false
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
      offsetWidth: 0, //子盒子的宽度,
      wrapHeight: 0,
      offsetHeight: 0,
      animationClass: '' //添加animate动画
    };
  },
  computed: {
    contentStyle() {
      return {
        paddingLeft: (this.isHorizontal ? this.wrapWidth : 0) + 'px',
        paddingTop: (this.isHorizontal ? 0 : this.wrapHeight) + 'px',
        animationDelay: this.delay + 's',
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
          const wrapHeight = wrap.getBoundingClientRect().height;
          const offsetHeight = content.getBoundingClientRect().height;
          this.wrapWidth = wrapWidth;
          this.offsetWidth = offsetWidth;
          this.wrapHeight = wrapHeight;
          this.offsetHeight = offsetHeight;
          this.duration =
            (this.isHorizontal ? offsetWidth : offsetHeight) / this.speed;
          this.animationClass = this.isHorizontal
            ? 'horizontal-infinite'
            : 'vertical-infinite';
        });
      }
    }
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
#Marquee {
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

  &-content {
    @include flex();
    flex-direction: column;
    &.horizontal {
      position: absolute;
      white-space: nowrap;
      flex-direction: row;
    }
  }

  .horizontal-infinite {
    animation: horizontal-infinite linear infinite;
  }
  .vertical-infinite {
    animation: vertical-infinite linear infinite;
  }
}

@keyframes horizontal-infinite {
  to {
    transform: translate3d(-100%, 0, 0);
  }
}

@keyframes vertical-infinite {
  to {
    transform: translate3d(0, -100%, 0);
  }
}
</style>