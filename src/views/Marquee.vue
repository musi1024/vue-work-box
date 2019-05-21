<template>
  <section id="MarqueePage">
    <Marquee class="Marquee" :content="content" :isHorizontal="true">
      <span class="marquee-content" v-for="(item, index) in content" :key="index">{{item}}召唤出</span>
    </Marquee>
    <Marquee class="Marquee" :content="content" :speed="20">
      <span class="marquee-content" v-for="(item, index) in content" :key="index">{{item}}召唤出</span>
    </Marquee>
    <Marquee class="Marquee" :content="content" :speed="20"></Marquee>
    <section class="test">
      <transition name="slide">
        <span class="test-content" :key="text.id">{{text.val}}召唤出</span>
      </transition>
    </section>
    <section class="test">
      <transition name="slideLeft">
        <span class="test-content" :key="text.id">{{text.val}}召唤出</span>
      </transition>
    </section>
  </section>
</template>

<script>
import Marquee from '../components/Marquee';
export default {
  name: 'MarqueePage',
  components: {
    Marquee
  },
  data() {
    return {
      content: '',
      number: 0
    };
  },
  computed: {
    text() {
      return {
        id: this.number,
        val: this.content[this.number]
      };
    }
  },
  mounted() {
    this.content = [
      '111111111111111',
      '2222222222222222',
      '33333333333333333333',
      '444444444444444',
      '55555555555555'
    ];
    this.startMove();
  },
  methods: {
    startMove() {
      // eslint-disable-next-line
      let timer = setTimeout(() => {
        if (this.number === 2) {
          this.number = 0;
        } else {
          this.number += 1;
        }
        this.startMove();
      }, 5000); // 滚动不需要停顿则将2000改成动画持续时间
    }
  }
};
</script>

<style lang="scss" scoped>
.test {
  @include flex(flex-start);
  flex-direction: column;
  width: 100%;
  height: px(80);
  line-height: px(80);
  font-size: px(30);
  overflow: hidden;
  background: #000000;
  color: #ffffff;
  position: relative;
}
.test-content {
  width: 100%;
  position: absolute;
  bottom: 0;
}
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s linear;
}
.slide-enter {
  transform: translateY(100%) scale(1);
  opacity: 1;
}
.slide-leave-to {
  transform: translateY(-100%) scale(1);
  opacity: 0;
}
.slideLeft-enter-active,
.slideLeft-leave-active {
  transition: all 5s linear;
}
.slideLeft-enter {
  transform: translateX(100%) scale(1);
  opacity: 1;
}
.slideLeft-leave-to {
  transform: translateX(-100%) scale(1);
  opacity: 0;
}
</style>
