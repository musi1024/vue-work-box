<template>
  <transition :name="slideDirection">
    <section class="base-tab-pane" v-if="show">
      <slot></slot>
    </section>
  </transition>
</template>
  
<script>
export default {
  name: 'BaseTabPane',
  props: {
    name: Number
  },
  data() {
    return {
      value: null,
      preTab: null,
      show: false
    };
  },
  computed: {
    slideDirection() {
      let res;
      if (this.value === this.name) {
        res = this.preTab > this.value ? 'slide-left' : 'slide-right';
      } else {
        res = this.value > this.name ? 'slide-left' : 'slide-right';
      }
      return res;
    }
  },
  mounted() {
    this.$bus.$on('CHANGE_TAB', (tab, preTab) => {
      this.preTab = preTab;
      this.value = tab;
      this.$nextTick(() => {
        this.checkShow();
      });
    });
    this.$bus.$on('SET_TAB_VALUE', e => {
      this.value = e;
      this.checkShow();
    });
  },
  methods: {
    checkShow() {
      this.show = this.value === this.name;
    }
  }
};
</script>

<style scoped lang="scss">
.base-tab-pane {
  @include lt(0, 0);
  width: 100%;
  background-color: #eeeeee;
  padding: px(40);
}
.slide-left-enter-active {
  animation: slideInLeft 0.2s;
}
.slide-left-leave-active {
  animation: slideOutLeft 0.2s;
}
.slide-right-enter-active {
  animation: slideInRight 0.2s;
}
.slide-right-leave-active {
  animation: slideOutRight 0.2s;
}
</style>
