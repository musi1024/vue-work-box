<template>
  <section id="CollapsePage">
    <base-collapse v-for="item in arr" :key="item.id" :name="item.name">
      <template v-slot:title>{{item.name}}</template>
      <template v-slot:content>{{item.content}}</template>
    </base-collapse>
  </section>
</template>

<script>
import BaseCollapse from '../components/BaseCollapse';
export default {
  name: 'CollapsePage',
  components: {
    'base-collapse': BaseCollapse
  },
  data() {
    return {
      arr: [
        { name: 0, content: '222221111111111111111111' },
        { name: 1, content: '222221111111111111111111' },
        { name: 2, content: '22222111111111111111111' },
        { name: 3, content: '222221111111111111111111' },
        { name: 4, content: '22222111111111111111111111111111111111111111111' },
        { name: 5, content: '22222111111111111111111111111111111111111111111' },
        { name: 6, content: '22222111111111111111111111111111111111111111111' },
        { name: 7, content: '22222111111111111111111111111111111111111111111' },
        { name: 8, content: '22222111111111111111111111111111111111111111111' },
        {
          name: 9,
          content:
            '222221111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111'
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
#CollapsePage {
  @include flex(flex-start);
  flex-direction: column;
  transition: all 0.2s ease-in-out;
}
</style>


