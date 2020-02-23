<template>
  <section class="home">
    <div class="safe-area">
      <MusicBtn />
    </div>
  </section>
</template>

<script>
import MusicBtn from '@/components/MusicBtn';
export default {
  name: 'Home',
  components: { MusicBtn },
  props: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss" scoped>
.home {
  width: 100vw;
  height: 100%;
  @include lt(0, 0);
  @include flex();
}

.safe-area {
  width: 100%;
  height: vw(1206);
  position: relative;
}

@media (min-aspect-ratio: 750 / 1206) {
  .safe-area {
    height: 100%;
  }
}
</style>
