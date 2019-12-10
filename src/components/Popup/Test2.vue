<template>
  <BasePopup v-model="visible" @leave="onLeave" @mask="visible = false">
    <div class="test-wrap 2">{{ param.text }}</div>
  </BasePopup>
</template>

<script>
import BasePopup from '@/components/Popup/BasePopup';
export default {
  name: 'Test2',
  components: { BasePopup },
  methods: {
    onLeave() {
      this.resolve();
    }
  }
};
</script>
<style lang="scss" scoped>
.test-wrap {
  @include wh(300, 300);
  background-color: #dddddd;
}
</style>
