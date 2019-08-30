<template>
  <section ref="wrap" id="Marquee">
    <div
      ref="content"
      class="marquee-content"
      :class="[animationClass]"
      :style="contentStyle"
      @animationiteration="onAnimationIteration"
      @webkitAnimationIteration="onAnimationIteration"
    >
      <span v-for="(i, index) in runningContent" :key="index">{{i}}</span>
    </div>
  </section>
</template>

<script>
export default {
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
      default: 200
    }
  },
  mounted() {},
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
    setAnimation() {
      this.animationClass = '';
      this.runningContent = [].concat(this.content);
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
#Marquee {
  width: 100vw;
  height: 24px;
  overflow: hidden;
  position: relative;
  padding: 0;

  .marquee-content {
    position: absolute;
    white-space: nowrap;
    padding-left: 100vw;
  }

  .animate-infinite {
    animation: paomadeng-infinite linear infinite;
  }
}

@keyframes paomadeng {
  to {
    transform: translate3d(-100%, 0, 0);
  }
}

@keyframes paomadeng-infinite {
  to {
    transform: translate3d(-100%, 0, 0);
  }
}
</style>