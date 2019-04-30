<template>
  <div class="base-select">
    <div id="base-select">{{selectTarget}}</div>
    <base-button class="base-select-btn" @CLICK="toggleOption" :class="{rotate: showOption}"></base-button>
    <ul v-show="showOption">
      <li v-for="item in selectOption.arr" :key="item.index" @click="select(item)">{{item.context}}</li>
    </ul>
  </div>
</template>

<script>
import BaseButton from '../components/BaseButton';
export default {
  name: 'BaseSelect',
  components: {
    'base-button': BaseButton
  },
  props: {
    selectOption: Object
  },
  data() {
    return {
      showOption: false,
      selectTarget: this.selectOption.arr[this.selectOption.default].context
    };
  },
  methods: {
    toggleOption() {
      this.showOption = !this.showOption;
    },
    select(item) {
      this.selectTarget = item.context;
      this.$emit('SELECT', this.selectTarget);
    }
  }
};
</script>

<style lang="scss" scoped>
.base-select {
}
</style>


