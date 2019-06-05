<template>
  <section class="base-select" @click="toggleOption">
    <input
      type="text"
      class="base-select-input"
      v-model="value"
      :readonly="true"
      autocomplete="off"
      :placeholder="placeholder"
    >
    <div class="base-select-btn" :class="{rotate: showOption}">^</div>
    <ul class="base-select-option" v-show="showOption">
      <li class="base-select-item empty" v-show="!selectOption.length">Empty</li>
      <li
        class="base-select-item"
        v-for="item in selectOption"
        :key="item.index"
        @click="select(item.value)"
      >{{item.label}}</li>
    </ul>
  </section>
</template>

<script>
export default {
  name: 'BaseSelect',
  model: {
    prop: 'value',
    event: 'SELECT'
  },
  props: {
    selectOption: Array,
    value: String,
    placeholder: String
  },
  data() {
    return {
      showOption: false
    };
  },
  mounted() {
    window.addEventListener('touchend', this.closeOption, false);
  },
  methods: {
    toggleOption() {
      this.showOption = !this.showOption;
    },
    select(item) {
      this.$emit('SELECT', item);
    },
    closeOption(e) {
      if (!this.$el.contains(e.target)) {
        this.showOption = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.base-select {
  position: relative;
  width: fit-content;
  margin: px(20) auto;
  &-input {
    padding: px(10) px(20);
    border: 2px solid #333333;
    cursor: pointer;
    outline: none;
    -webkit-appearance: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }
  &-btn {
    width: 10%;
    height: 100%;
    position: absolute;
    right: 0;
    top: 0;
    transition: all 1s;
    &.rotate {
      transform: rotate(180deg);
      transform-origin: center center;
    }
  }
  &-option {
    @include flex(flex-start);
    flex-direction: column;
    position: absolute;
    left: 0;
    top: 100%;
    width: 100%;
    color: #eeeeee;
    background-color: rgba(0, 0, 0, 0.8);
    margin: 0;
    padding: 0;
    list-style: none;
    z-index: 2;
  }
  &-item {
    width: 100%;
    padding: px(10) 0;
    border-bottom: 1px solid #eeeeee;
    &.empty {
      padding: px(40);
    }
    &:last-child {
      border-bottom: none;
    }
    &:active {
      background-color: rgba(255, 255, 255, 0.8);
      color: #333333;
    }
  }
}
</style>


