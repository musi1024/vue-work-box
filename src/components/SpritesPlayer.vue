<template>
  <canvas ref="target" />
</template>

<script>
import CanvasSprite from '@/utils/canvas-sprite';
const STATE_MAP = {
  PLAYING: 'playing',
  PAUSED: 'paused',
  STOP: 'stop'
};
export default {
  props: {
    imageUrl: {
      type: String,
      default: ''
    },
    frames: {
      type: Number,
      default: 0
    },
    fps: {
      type: Number,
      default: 24
    },
    loop: {
      type: Boolean,
      default: false
    },
    loopTimes: {
      type: Number,
      default: undefined
    },
    loopFrames: {
      type: Number,
      default: undefined
    },
    state: {
      type: String,
      default: STATE_MAP.PLAYING
    }
  },
  data() {
    return {
      cs: {}
    };
  },
  watch: {
    state(val) {
      switch (val) {
        case STATE_MAP.PLAYING: {
          this.init();
          this.cs.play();
          break;
        }
        case STATE_MAP.PAUSED: {
          // this.cs.pause();
          break;
        }
        case STATE_MAP.STOP: {
          // this.cs.stop();
          break;
        }
        default:
          break;
      }
    },
    changeImg(img) {
      img && this.init();
    }
  },
  computed: {
    /*  changeImg() {
      return this.state === STATE_MAP.PLAYING ? false : this.imageUrl;
    } */
  },
  mounted() {
    if (this.imageUrl && this.state !== STATE_MAP.STOP) this.init();
  },
  destroyed() {
    this.cs.destroy && this.cs.destroy();
  },
  methods: {
    init() {
      this.cs.destroy && this.cs.destroy();
      const {
        imageUrl,
        frames,
        fps,
        state,
        loop,
        loopTimes,
        loopFrames
      } = this;
      this.cs = CanvasSprite({
        canvas: this.$refs.target,
        imageUrl,
        frames,
        fps,
        loop,
        loopTimes,
        loopFrames,
        onEnd: () => {
          this.$emit('end');
          setTimeout(() => {
            this.cs.destroy();
          }, 300);
        },
        onLoop: count => {
          this.$emit('loop', count);
        },
        onStart: () => {
          this.$emit('start');
        }
      });
      if (state !== STATE_MAP.PLAYING) this.cs.pause();
    }
  }
};
</script>
