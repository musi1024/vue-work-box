<template>
  <div
    class="base-switch"
    :class="{'base-switch-on' : self_checked}"
    :style="switchStyle"
    :value="value"
    @click="toggle"
  ></div>
</template>

<script>
export default {
  name: 'baseSwitch',
  props: {
    value: {
      type: Boolean
    },
    activeColor: {
      type: String,
      default: '#13ce66'
    },
    inactiveColor: {
      type: String,
      default: '#ff4949'
    },
    width: {
      type: String,
      default: '120'
    }
  },
  data() {
    return {
      self_checked: this.value
    };
  },
  computed: {
    switchStyle() {
      return {
        backgroundColor: this.value ? this.activeColor : this.inactiveColor,
        width: Number.parseInt(this.width / 7.5) + 'vw',
        height: Number.parseInt(this.width / 7.5) / 2 + 'vw'
      };
    }
  },
  watch: {
    self_checked(val) {
      this.$emit('input', val);
    }
  },
  methods: {
    toggle() {
      this.self_checked = !this.self_checked;
      this.$emit('toggle');
    }
  }
};
</script>

<style lang='scss'>
.base-switch {
  position: relative;
  display: inline-block;
  border-radius: 20px;
  transition: all 0.1s;
}
.base-switch:after {
  content: '';
  box-sizing: border-box;
  position: absolute;
  top: 10%;
  left: 5%;
  width: 40%;
  height: 80%;
  border-radius: 100%;
  background-color: white;
  transition: transform 0.35s ease;
}
.base-switch-on:after {
  transform: translateX(125%);
}
</style>
