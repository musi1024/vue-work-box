<template>
  <section class="home">
    <div class="safe-area">
      <input v-model="text" type="text" />
    </div>
  </section>
</template>

<script>
export default {
  name: 'Home',
  components: {},
  props: {},
  data() {
    return {
      text: ''
    };
  },
  computed: {},
  watch: {
    text(e) {
      this.$store.commit('setText', e);
    }
  },
  mounted() {
    this.text = this.$store.state.text;
    this.$store.commit('modal/show', {
      type: 'madol1',
      props: { show: true }
    });
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
.home {
  width: 100vw;
  height: 100%;
  @include lt(0, 0);
  @include flex();

  input {
    border: 1px solid red;
  }
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
