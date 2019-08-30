<template>
  <div ref="wrap" class="wrap">
    <div
      ref="content"
      class="content"
      :class="[animationClass]"
      :style="contentStyle"
      @animationiteration="onAnimationIteration"
      @webkitAnimationIteration="onAnimationIteration"
    >
      <span v-for="(i, index) in oldContent" :key="index">{{i}}</span>
    </div>
  </div>
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
      oldContent: null,
      wrapWidth: 0, //父盒子宽度
      duration: 0, //css3一次动画需要的时间
      offsetWidth: 0, //子盒子的宽度
      animationClass: '',
      update: false
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
        if (!this.oldContent) {
          this.tt();
        } else {
          this.update = true;
        }
      }
    }
  },
  methods: {
    tt() {
      this.animationClass = '';
      this.oldContent = [].concat(this.content);
      this.$nextTick(() => {
        const { wrap, content } = this.$refs;
        const wrapWidth = wrap.getBoundingClientRect().width;
        const offsetWidth = content.getBoundingClientRect().width;
        this.wrapWidth = wrapWidth;
        this.offsetWidth = offsetWidth;
        this.duration = (this.offsetWidth + this.wrapWidth) / this.speed;
        this.animationClass = 'animate-infinite';
        this.update = false;
      });
    },
    onAnimationIteration() {
      if (!this.update) return;
      this.tt();
    }
  }
};
</script>

<style lang='scss' scoped>
.wrap {
  width: 100%;
  height: 24px;
  overflow: hidden;
  position: relative;
  background: rgba(211, 125, 066, 1);
  position: relative;
  padding: 0;
  span {
    margin-left: px(20);
  }
}

.wrap .content {
  position: absolute;
  white-space: nowrap;
}

.content {
  padding-left: 100vw;
}

.animate-infinite {
  animation: paomadeng-infinite linear infinite;
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