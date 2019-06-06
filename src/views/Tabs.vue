<template>
  <section id="TabsPage">
    <base-tabs :tab-list="tabList" v-model="value" v-if="tabList.length">
      <base-tab-pane v-for="item in tabList" :name="item.value" :key="item.value">{{item.content}}</base-tab-pane>
    </base-tabs>
  </section>
</template>

<script>
import BaseTabs from '../components/BaseTabs';
import BaseTabPane from '../components/BaseTabPane';

export default {
  name: 'TabsPage',
  components: {
    'base-tabs': BaseTabs,
    'base-tab-pane': BaseTabPane
  },
  data() {
    return {
      value: 2,
      tabList: [
        {
          label: '1111',
          value: 1,
          content: `你会注意到，如果你选择了一篇文章元素将其动态组件包裹起来。你会注意到，如果你选择了一篇文章元素将其动态组件包裹起来。`
        },
        {
          label: '2222',
          value: 2,
          content: `你会注意到，如果你选择了一篇文章元素将其动态组件包裹起来。`
        },
        {
          label: '3333',
          value: 3,
          content: `你会注意到，如果你选择了一篇文章元素将其动态组件包裹起来。你会注意到，如果你选择了一篇文章元素将其动态组件包裹起来。`
        },
        {
          label: '4444',
          value: 4,
          content: `你会注意到，如果你选择了一篇文章元素将其动态组件包裹起来。`
        },
        {
          label: '5555',
          value: 5,
          content: `你会注意到，如果你选择了一篇文章元素将其动态组件包裹起来。你会注意到，如果你选择了一篇文章元素将其动态组件包裹起来。`
        },
        {
          label: '6666',
          value: 6,
          content: `你会注意到，如果你选择了一篇文章元素将其动态组件包裹起来。`
        },
        {
          label: '7777',
          value: 7,
          content: `你会注意到，如果你选择了一篇文章元素将其动态组件包裹起来。`
        },
        {
          label: '8888',
          value: 8,
          content: `你会注意到，如果你选择了一篇文章元素将其动态组件包裹起来。`
        },
        {
          label: '9999',
          value: 9,
          content: `你会注意到，如果你选择了一篇文章元素将其动态组件包裹起来。`
        },
        {
          label: '1010',
          value: 10,
          content: `你会注意到，如果你选择了一篇文章元素将其动态组件包裹起来。`
        },
        {
          label: '1111111',
          value: 11,
          content: `你会注意到，如果你选择了一篇文章元素将其动态组件包裹起来。`
        }
      ]
    };
  }
};

</script>

<style lang="scss" scoped>
#TabsPage {
}
</style>


