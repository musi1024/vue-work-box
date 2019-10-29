<template>
  <section ref="wrap" class="base-marquee">
    <div
      ref="content"
      class="base-marquee-content"
      :class="[animationClass]"
      :style="contentStyle"
      @webkitAnimationIteration="onAnimationIteration"
      @animationiteration="onAnimationIteration"
    >
      <slot :content="runningContent"></slot>
    </div>
  </section>
</template>

<script>
function getType(obj) {
  return Object.prototype.toString.call(obj).slice(8, -1);
}
export default {
  name: 'Marquee',
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
      default: 200
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
        animationDuration: this.duration + 's'
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
        const { wrap, content } = this.$refs;
        this.wrapWidth = wrap.getBoundingClientRect().width;
        this.contentWidth = content.getBoundingClientRect().width;
        this.duration = (this.contentWidth + this.wrapWidth) / this.speed;
        this.animationClass = 'animate-infinite';
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

<style lang='scss' scoped>
.base-marquee {
  position: relative;
  width: 100vw;
  height: 24px;
  line-height: 24px;
  padding: 0;
  overflow: hidden;

  .base-marquee-content {
    position: absolute;
    white-space: nowrap;
    padding-left: 100vw;
  }

  .animate-infinite {
    animation: marquee-infinite linear infinite;
  }
}

@keyframes marquee-infinite {
  to {
    transform: translate3d(-100%, 0, 0);
  }
}
</style>