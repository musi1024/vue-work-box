<template>
  <section class="base-tabs">
    <scroll-wrap class="base-tabs-bar">
      <div
        class="base-tabs-label"
        v-for="tab in tabList"
        :key="tab.index"
        :class="[value == tab.value ? 'active' : '']"
        @click="changeTab(tab.value)"
      >{{tab.label}}</div>
    </scroll-wrap>
    <div class="base-tabs-content">
      <slot></slot>
    </div>
  </section>
</template>
  
<script>
import ScrollWrap from '../ScrollWrap';

export default {
  name: 'BaseTabs',
  components: {
    'scroll-wrap': ScrollWrap
  },
  model: {
    prop: 'value',
    event: 'change-tab'
  },
  props: {
    tabList: Array,
    value: Number
  },
  data() {
    return {
      preTab: this.value
    };
  },
  watch: {
    value(e) {
      this.changeTab(e);
      this.$nextTick(() => {
        this.goToActive();
      });
    }
  },
  mounted() {
    this.goToActive();
    this.$bus.$emit('SET_TAB_VALUE', this.value);
  },
  methods: {
    changeTab(tab) {
      this.preTab = this.value;
      this.$emit('change-tab', tab);
      this.$bus.$emit('CHANGE_TAB', tab, this.preTab);
    },
    goToActive() {
      let active = document.querySelector('.base-tabs-label.active');
      let bar = document.querySelector('.base-tabs-bar');
      bar.scrollLeft =
        active.offsetLeft - this.$el.offsetWidth / 2 + active.offsetWidth / 2;
    }
  }
};
</script>

<style scoped lang="scss">
.base-tabs {
  position: relative;
  width: 100%;
  outline: none;
  -webkit-appearance: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  &-bar {
    @include flex(flex-start);
    margin: 0 px(30);
  }
  &-label {
    flex-grow: 1;
    width: max-content;
    margin: px(20);
    padding: px(5) px(20);
    background-color: #333333;
    color: #eeeeee;
    border: 1px solid #eeeeee;
    cursor: pointer;
    transition: all 0.6s;
    &:first-child {
      margin-left: 0;
    }

    &.active {
      background-color: #eeeeee;
      color: #333333;
      border: 1px solid #333333;
    }
  }

  &-content {
    position: relative;
    min-height: px(300);
  }
}
</style>
