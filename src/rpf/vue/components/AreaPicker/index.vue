<template>
  <div>
    <select :value="value[0]" @change="_change(0, $event)">
      <option :value="null">（省）</option>
      <option v-for="item in provinceData" :value="item.name" :key="item.name">
        {{ item.name }}
      </option>
    </select>
    <select v-if="level > 1" :value="value[1]" @change="_change(1, $event)">
      <option :value="null">（市）</option>
      <option v-for="item in cityData" :value="item.name" :key="item.name">
        {{ item.name }}
      </option>
    </select>
    <select v-if="level > 2" :value="value[2]" @change="_change(2, $event)">
      <option :value="null">（区）</option>
      <option v-for="item in regionData" :value="item.name" :key="item.name">
        {{ item.name }}
      </option>
    </select>
  </div>
</template>
<script>
import rawData from './data.js';
const dataIndexes = rawData.indexes.split(',');

function decode(name) {
  if (typeof name !== 'string') {
    return name;
  }
  return name
    .replace(/S/g, '省')
    .replace(/s/g, '市')
    .replace(/z/g, '州')
    .replace(/q/g, '区')
    .replace(/x/g, '县');
}

function parseName(name) {
  if (name === '-1') {
    return null;
  }
  return name;
}

function tryIndexes(name) {
  return dataIndexes[name] || name;
}

function processName(name) {
  return decode(tryIndexes(parseName(name)));
}

const data = rawData.data.split('\n').map(line => {
  const [name, parent] = line.split(',');
  return {
    name: processName(name),
    parent: processName(parent)
  };
});

const provinceData = data.filter(item => {
  return !item.parent;
});

export default {
  name: 'AreaPicker',
  props: {
    value: {
      type: Array,
      default: () => []
    },
    level: {
      type: Number,
      default: 3,
      validator: value => [1, 2, 3].indexOf(value) !== -1
    }
  },
  computed: {
    provinceData() {
      return provinceData;
    },
    cityData() {
      return data.filter(item => item.parent === this.value[0]);
    },
    regionData() {
      return data.filter(item => item.parent === this.value[1]);
    }
  },
  methods: {
    _change(i, e) {
      const tVal = e.target.value;
      const [province, city] = this.value;
      const nextValue = [
        [tVal, '', ''],
        [province, tVal, ''],
        [province, city, tVal]
      ];
      this.$emit('input', nextValue[i]);
    }
  }
};
</script>
