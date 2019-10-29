<template>
  <section>
    <MarqueeVertical class="marquee-1">
      <MarqueeVerticalItem v-for="i in 10" :key="i">{{i}}</MarqueeVerticalItem>
    </MarqueeVertical>
    <MarqueeVertical class="marquee-2" direction="down">
      <MarqueeVerticalItem v-for="i in 10" :key="i">{{i}}</MarqueeVerticalItem>
    </MarqueeVertical>
  </section>
</template>

<script>
import MarqueeVertical from '../components/MarqueeVertical/MarqueeVertical';
import MarqueeVerticalItem from '../components/MarqueeVertical/MarqueeVerticalItem';
export default {
  components: {
    MarqueeVertical,
    MarqueeVerticalItem
  },
  props: [''],
  data() {
    return {};
  },

  computed: {},

  watch: {},

  beforeMount() {},

  mounted() {},

  methods: {}
};
</script>
<style lang='scss' scoped>
.marquee-1 {
  background-color: antiquewhite;
  width: vw(200);
}
</style>