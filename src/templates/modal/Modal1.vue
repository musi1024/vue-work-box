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
  mounted() {
    this.show = true;
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
<style lang="scss" scoped></style>
