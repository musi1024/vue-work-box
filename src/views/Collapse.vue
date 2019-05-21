<template>
  <section id="Collapse">
    <base-collapse v-for="item in arr" :key="item.id" :name="item.name">
      <template v-slot:title>{{item.name}}</template>
      <template v-slot:content>{{item.content}}</template>
    </base-collapse>
  </section>
</template>

<script>
import BaseCollapse from '../components/BaseCollapse';
export default {
  name: 'Collapse',
  components: {
    'base-collapse': BaseCollapse
  },
  data() {
    return {
      arr: [
        { name: 1, content: '22222' },
        { name: 2, content: '22222' },
        { name: 3, content: '22222' },
        { name: 4, content: '22222' }
      ]
    };
  }
};
</script>

