<template>
  <section ref="wrap" class="base-marquee-horizontal">
    <div
      ref="content"
      class="base-marquee-horizontal-content"
      :class="[animationClass]"
      :style="contentStyle"
      @webkitAnimationIteration="onAnimationIteration"
      @animationiteration="onAnimationIteration"
    >
      <slot :runningContent="runningContent"></slot>
    </div>
  </section>
</template>

<script>
function getType(obj) {
  return Object.prototype.toString.call(obj).slice(8, -1);
}
export default {
  name: 'MarqueeHorizontal',
  props: {
    content: {
      type: [Number, Object, String, Array],
      default: ''
    },
    delay: {
      type: Number,
      default: 0.5
    },
    speed: {
      type: Number,
      default: 80
    }
  },
  data() {
    return {
      wrapWidth: 0,
      contentWidth: 0,
      duration: 0,
      animationClass: '',
      runningContent: null,
      isUpdate: false
    };
  },
  computed: {
    contentStyle() {
      return {
        animationDelay: this.delay + 's',
        animationDuration: this.duration + 's',
        paddingLeft: this.wrapWidth + 'px'
      };
    }
  },
  watch: {
    content: {
      deep: true,
      handler() {
        if (!this.runningContent) {
          this.setAnimation();
        } else {
          this.isUpdate = true;
        }
      }
    }
  },
  mounted() {
    this.wrapWidth = this.$refs.wrap.getBoundingClientRect().width;
  },
  methods: {
    setContent() {
      switch (getType(this.content)) {
        case 'Array':
          this.runningContent = [].concat(this.content);
          break;
        case 'Object':
          this.runningContent = { ...this.content };
          break;
        case 'String':
          this.runningContent = this.content;
          break;
        case 'Number':
          this.runningContent = this.content;
          break;
        default:
          break;
      }
    },
    setAnimation() {
      this.animationClass = '';
      this.setContent();
      this.$nextTick(() => {
        this.contentWidth = this.$refs.content.getBoundingClientRect().width;
        this.duration = (this.contentWidth + this.wrapWidth) / this.speed;
        this.animationClass = 'marquee-infinite';
        this.isUpdate = false;
      });
    },
    onAnimationIteration() {
      if (!this.isUpdate) return;
      this.setAnimation();
    }
  }
};
</script>

<style lang="scss" scoped>
.base-marquee-horizontal {
  position: relative;
  width: 100vw;
  overflow: hidden;

  &-content {
    @include lt(0, 0);
    display: flex;
    height: 100%;
    white-space: nowrap;
  }

  .marquee-infinite {
    animation: marquee-infinite linear infinite;
  }
}

@keyframes marquee-infinite {
  to {
    transform: translateX(-100%);
  }
}
</style>
