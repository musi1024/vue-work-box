<template>
  <section class="base-tabs">
    <nav class="base-tabs-bar" ref="bar">
      <div
        class="base-tabs-label"
        v-for="tab in tabList"
        :key="tab.index"
        :class="[value == tab.value ? 'active' : '']"
        @click="changeTab(tab.value)"
      >{{tab.label}}</div>
    </nav>
    <main class="base-tabs-content">
      <slot></slot>
    </main>
  </section>
</template>
  
<script>
export default {
  name: 'BaseTabs',
  model: {
    prop: 'value',
    event: 'CHANGE_TAB'
  },
  props: {
    tabList: Array,
    value: Number
  },
  data() {
    return {};
  },
  mounted() {
    // this.$refs.bar.scrollLeft = this.$refs.bar.scrollWidth;
  },
  methods: {
    changeTab(tab) {
      this.$emit('CHANGE_TAB', tab);
    }
  }
};
</script>

<style scoped lang="scss">
.base-tabs {
  width: 100%;
  outline: none;
  -webkit-appearance: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  &-bar {
    @include flex(flex-start);
    overflow-x: scroll;
    margin: 0 px(30);
  }
  &-label {
    flex-grow: 1;
    position: relative;
    width: max-content;
    margin: px(20);
    padding: px(5) px(20);
    background-color: #333333;
    color: #eeeeee;
    border: 1px solid #eeeeee;
    cursor: pointer;
    transition: all 0.2s;
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
    width: 100%;
    background-color: #eeeeee;
    padding: px(40);
  }
}
</style>
