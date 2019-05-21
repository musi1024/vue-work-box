<template>
  <div class="base-collapse">
    <div class="base-collapse-title" @click="toggleContent">{{title}}</div>
    <div class="base-collapse-content" :style="{height}">{{content}}</div>
  </div>
</template>

<script>
export default {
  name: 'BaseCollapse',
  data() {
    return {
      showContent: false
    };
  },
  props: {
    title: String,
    content: String
  },
  computed: {
    height() {
      return this.showContent ? this.contentHeight + 'px' : '0px';
    }
  },
  mounted() {
    this.contentHeight = this.$el.querySelector(
      '.base-collapse-content'
    ).scrollHeight;
  },
  methods: {
    toggleContent() {
      this.showContent = !this.showContent;
    }
  }
};
</script>

<style lang="scss" scoped>
.base-collapse {
  width: 100vw;
  border: 1px solid #333;
  margin: 10px 0;
  overflow: hidden;
  &-title {
    width: 100%;
    height: 30px;
  }
  &-content {
    width: 100%;
    transition: height 0.3s ease-in-out;
    word-wrap: break-word;
  }
}
</style>
