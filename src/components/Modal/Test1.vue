<template>
  <BaseModal v-if="show" @mask="close">
    <div class="test-wrap 1" @click="a = 2">ddd</div>
    {{ a }}
  </BaseModal>
</template>

<script>
import BaseModal from '@/components/Modal/BaseModal';
export default {
  name: 'Test1',
  components: { BaseModal },
  model: {
    prop: 'show',
    event: 'change'
  },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      a: 1
    };
  },
  methods: {
    close() {
      this.$emit('change', false);
    }
  }
};
</script>
<style lang="scss" scoped>
.test-wrap {
  @include wh(300, 300);
  background-color: #fff;
}
</style>
