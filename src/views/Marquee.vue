<template>
  <section id="MarqueePage">
    <Marquee class="Marquee" :content="content" :isHorizontal="true">
      <span class="marquee-content" v-for="(item, index) in content" :key="index">{{item}}召唤出</span>
    </Marquee>
    <Marquee class="Marquee" :content="content" :isHorizontal="false">
      <span class="marquee-content" v-for="(item, index) in content" :key="index">{{item}}召唤出</span>
    </Marquee>
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
      content: ''
    };
  },
  mounted() {
    this.content = [
      '111111111111111',
      '2222222222222222',
      '33333333333333333333',
      '444444444444444',
      '55555555555555'
    ];
  }
};
</script>

<style lang="scss" scoped>
#MarqueePage {
  
}
</style>
