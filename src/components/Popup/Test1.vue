<template>
  <BasePopup v-model="visible" @leave="onLeave" @mask="visible = false">
    <div class="test-wrap 1">{{ param.text }}</div>
  </BasePopup>
</template>

<script>
import BasePopup from '@/components/Popup/BasePopup';
export default {
  name: 'Test1',
  components: { BasePopup },
  methods: {
    onLeave() {
      this.resolve('home');
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
