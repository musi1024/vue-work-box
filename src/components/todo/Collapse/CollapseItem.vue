<template>
  <section class="base-collapse-item" @click="clickItem">
    <div class="base-collapse-item-title">
      <slot name="title">{{title}}</slot>
    </div>
    <div class="base-collapse-item-content" ref="content" :class="[this.isActive ? '' : 'close']">
      <slot></slot>
    </div>
  </section>
</template>

<script>
export default {
  name: 'BaseCollapseItem',
  props: {
    name: [Number, String],
    title: String
  },
  inject: ['collapse'],
  data() {
    return {
      contentHeight: ''
    };
  },
  watch: {
    isActive() {
      this.setHeight();
    }
  },
  computed: {
    isActive() {
      return [].concat(this.collapse.actives).indexOf(this.name) > -1;
    }
  },
  mounted() {
    this.getHeight();
    this.setHeight();
  },
  methods: {
    clickItem() {
      this.$parent.handleClick(this.name);
    },
    getHeight() {
      let el = this.$refs.content;
      el.style.height = 'auto';
      this.contentHeight = el.offsetHeight + 'px';
      el.style.height = '0px';
      el.style.transition = `all 350ms ease`;
    },
    setHeight() {
      this.$refs.content.style.height = this.isActive
        ? this.contentHeight
        : '0px';
    }
  }
};
</script>

<style lang="scss" scoped>
.base-collapse-item {
  width: 100%;
  &-content {
    word-wrap: break-word;
    word-break: break-all;
    overflow: hidden;
    &.close {
      height: 0;
    }
  }
}
</style>
