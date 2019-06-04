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
      <span v-show="!selectOption.length">还未有选项</span>
      <li v-for="item in selectOption" :key="item.index" @click="select(item.value)">{{item.label}}</li>
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
  margin: 0 auto;
  &-input {
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
    @include lt(0, 48);
    width: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    color: #eeeeee;
    margin: 0;
    padding: 0;
    list-style: none;
    z-index: 2;
  }
}
</style>


