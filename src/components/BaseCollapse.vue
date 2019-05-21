<template>
  <div class="base-collapse" :class="[size]" @click="toggleContent">
    <slot name="title"></slot>
    <div class="base-collapse-btn" v-show="!showContent"></div>
    <div v-show="showContent">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseCollapse',
  props: { name: Number },
  data() {
    return {
      showContent: false
    };
  },
  computed: {
    size() {
      return this.showContent ? 'big' : 'small';
    }
  },
  mounted() {
    this.$bus.$on('SHOW_CONTENT', e => {
      if (this.name != e) {
        this.showContent = false;
      }
    });
    this.$bus.$on('CLOSE_CONTENT', () => {
      if (this.name != 0) {
        this.showContent = false;
      } else {
        this.showContent = true;
      }
    });
    if (this.name === 0) {
      this.showContent = true;
    }
  },
  methods: {
    toggleContent() {
      this.showContent = !this.showContent;
      this.$bus.$emit('SHOW_CONTENT', this.name);
    }
  }
};
</script>

<style lang="scss" scoped>
.base-collapse {
  position: relative;
  margin-bottom: px(10);
  animation: fadeIn 0.2s ease-in-out;
  transition: all 0.2s;
  border: 1px solid #333333;
  &.big {
    @include wh(577, 204);
    margin: px(10) 0;
  }
  &.small {
    @include wh(577, 111);
  }
}
</style>
