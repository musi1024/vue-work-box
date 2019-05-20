<template>
  <section id="home">
    <header>
      <button type="button" @click="change(false)"><</button>
      <span>{{config[state]}}</span>
      <button type="button" @click="change(true)">></button>
      <button type="button" @click="state = 0">home</button>
    </header>
    <main>
      <router-view></router-view>
    </main>
  </section>
</template>

<script>
let config = ['home', 'button'];
export default {
  name: 'Home',
  components: {},
  data() {
    return {
      config,
      state: 0
    };
  },
  watch: {
    state(e) {
      console.log(e);
      this.$router.push({ name: config[this.state] });
    }
  },
  methods: {
    change(e) {
      if (e) {
        this.state = this.state >= config.length - 1 ? 0 : this.state + 1;
      } else {
        this.state = this.state === 0 ? config.length - 1 : this.state - 1;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
#home {
  header {
    @include flex(space-around);
    margin: px(50);
  }
}
</style>


