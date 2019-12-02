<template>
  <section class="base-select" @click="toggleOption">
    <input
      type="text"
      class="base-select-input"
      ref="input"
      v-model="value"
      :placeholder="placeholder"
      readonly="readonly"
      autocomplete="off"
      @focus="blur()"
    />
    <div class="base-select-btn" :class="{ rotate: showOption }">^</div>
    <ul class="base-select-option" v-show="showOption">
      <li class="base-select-item empty" v-show="!selectOption.length">
        Empty
      </li>
      <li
        class="base-select-item"
        v-for="item in selectOption"
        :key="item.index"
        @click="select(item.value)"
      >
        {{ item.label }}
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: 'BaseSelect',
  model: {
    prop: 'value',
    event: 'select'
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
      this.$emit('select', item);
    },
    closeOption(e) {
      if (!this.$el.contains(e.target)) {
        this.showOption = false;
      }
    },
    blur() {
      this.$refs.input.blur();
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
    height: 50%;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    margin: auto 0;
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
