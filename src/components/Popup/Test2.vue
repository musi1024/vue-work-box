<template>
  <BasePopup v-if="show" @mask="close">
    <div class="test-wrap 1" @click="a = 2">ddd</div>
    {{ a }}
  </BasePopup>
</template>

<script>
import BasePopup from '@/components/Popup/BasePopup';
export default {
  name: 'Test2',
  components: { BasePopup },
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
