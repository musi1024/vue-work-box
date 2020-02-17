<template>
  <section>
    <MarqueeHorizontal class="marquee-horizontal" :content="content">
      <template v-slot="{ runningContent }">
        <div
          class="marquee-horizontal-item"
          v-for="i in runningContent"
          :key="i.index"
        >
          {{ i }}
        </div>
      </template>
    </MarqueeHorizontal>
    <MarqueeVertical class="marquee-1">
      <MarqueeVerticalItem v-for="i in 10" :key="i">
        {{ i }}
      </MarqueeVerticalItem>
    </MarqueeVertical>
    <MarqueeVertical class="marquee-2" direction="down">
      <MarqueeVerticalItem v-for="i in 10" :key="i">
        {{ i }}
      </MarqueeVerticalItem>
    </MarqueeVertical>
  </section>
</template>

<script>
import MarqueeHorizontal from '@components/Marquee/MarqueeHorizontal';
import MarqueeVertical from '@/components/Marquee/MarqueeVertical';
import MarqueeVerticalItem from '@/components/Marquee/MarqueeVerticalItem';
export default {
  components: {
    MarqueeHorizontal,
    MarqueeVertical,
    MarqueeVerticalItem
  },
  data() {
    return { content: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0] };
  },

  mounted() {
    setInterval(() => {
      this.content.push('00');
    }, 1000);
  }
};
</script>
<style lang="scss" scoped>
.marquee-1 {
  background-color: antiquewhite;
  width: vw(200);
}
.marquee-horizontal {
  @include wh(600, 300);
  background-color: black;
  color: wheat;
  &-item {
    margin-left: vw(20);
    font-size: vw(80);
    line-height: 1.8;
  }
}
</style>
