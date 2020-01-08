<template>
  <BaseModal v-show="show" @mask="close" @leave="leave"></BaseModal>
</template>

<script>
import BaseModal from '@/components/Modal/BaseModal';
export default {
  name: 'Test1',
  components: { BaseModal },
  data() {
    return {
      show: false
    };
  },
  methods: {
    close() {
      this.show = false;
    },
    leave() {
      this.remove();
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
