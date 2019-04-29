<template>
  <div class="base-tabs">
    <div class="base-tabs-bar">
      <div class="base-tabs-bar-nav">
        <div
          class="base-tabs-tab"
          v-for="tab in tabList"
          :key="tab.index"
          :class="[tabIndex == tab.index ? 'base-tabs-active' : '']"
          @click="changeTab(tab)"
        >{{tab.name}}</div>
      </div>
    </div>
    <div class="base-tabs-content">
      <slot></slot>
    </div>
  </div>
</template>
  
<script>
export default {
  name: 'MyTabs',
  props: {
    tabList: Array,
    tabIndex: Number
  },
  data() {
    return {};
  },
  methods: {
    changeTab(tab) {
      this.$emit('CHANGE', tab);
    }
  }
};
</script>

<style scoped lang="scss">
.base-tabs {
  font-size: 14px;
  color: #444;
  &-bar {
    border-bottom: 1px solid #eee;
    position: relative;
    padding: 5px 0;
    &-nav {
      display: table;
      margin-left: 35px;
      position: absolute;
      bottom: -1px;
    }
  }
  &-tab {
    min-width: 110px;
    padding: 5px 0;
    position: relative;
    display: inline-block;
    text-align: center;
    cursor: pointer;
  }
  &-active {
    border-top: 1px solid pink;
    border-left: 1px solid pink;
    border-right: 1px solid pink;
    border-bottom: 1px solid #fff;
  }
  &-content {
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 30px;
  }
}
</style>
