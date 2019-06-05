<template>
  <section id="TabsPage">
    <base-tabs :tab-list="tabList" v-model="value">
      <div v-if="value === 1">
        tabs 1
        你会注意到，如果你选择了一篇文章，切换到 Archive 标签，然后再切换回 Posts，是不会继续展示你之前选择的文章的。这是因为你每次切换新标签的时候，Vue 都创建了一个新的 currentTabComponent 实例。
        元素将其动态组件包裹起来。
        来看看修改后的结果：
        你会注意到，如果你选择了一篇文章，切换到 Archive 标签，然后再切换回 Posts，是不会继续展示你之前选择的文章的。这是因为你每次切换新标签的时候，Vue 都创建了一个新的 currentTabComponent 实例。
        元素将其动态组件包裹起来。
        来看看修改后的结果： 你会注意到，如果你选择了一篇文章，切换到 Archive 标签，然后再切换回 Posts，是不会继续展示你之前选择的文章的。这是因为你每次切换新标签的时候，Vue 都创建了一个新的 currentTabComponent 实例。
        元素将其动态组件包裹起来。
        来看看修改后的结果： 你会注意到，如果你选择了一篇文章，切换到 Archive 标签，然后再切换回 Posts，是不会继续展示你之前选择的文章的。这是因为你每次切换新标签的时候，Vue 都创建了一个新的 currentTabComponent 实例。
        元素将其动态组件包裹起来。
        来看看修改后的结果： 你会注意到，如果你选择了一篇文章，切换到 Archive 标签，然后再切换回 Posts，是不会继续展示你之前选择的文章的。这是因为你每次切换新标签的时候，Vue 都创建了一个新的 currentTabComponent 实例。
        元素将其动态组件包裹起来。
        来看看修改后的结果：
      </div>
      <div v-if="value === 2">
        tabs 2
        <base-tabs :tab-list="tabList" v-model="value1">tab in tab {{value1}}</base-tabs>
      </div>
      <div v-if="value === 3">tabs 3</div>
      <div v-if="value === 4">tabs 4</div>
      <div v-if="value === 5">tabs 5</div>
      <div v-if="value > 5">tabs none</div>
    </base-tabs>
  </section>
</template>

<script>
import BaseTabs from '../components/BaseTabs';
export default {
  name: 'TabsPage',
  components: {
    'base-tabs': BaseTabs
  },
  data() {
    return {
      value: 1,
      value1: 1,
      tabList: [
        { label: '1111', value: 1 },
        { label: '2222', value: 2 },
        { label: '3333', value: 3 },
        { label: '4444', value: 4 },
        { label: '5555', value: 5 },
        { label: '6666', value: 6 },
        { label: '7777', value: 7 },
        { label: '8888', value: 8 },
        { label: '9999', value: 9 },
        { label: '1010', value: 10 },
        { label: '1111111', value: 11 }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
#TabsPage {
}
</style>


