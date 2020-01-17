/* EventBus.js */
import Vue from 'vue';

export default function VueBus() {
  const bus = new Vue();

  Object.defineProperties(bus, {
    on: {
      get: function get() {
        return this.$on;
      }
    },
    once: {
      get: function get() {
        return this.$once;
      }
    },
    off: {
      get: function get() {
        return this.$off;
      }
    },
    emit: {
      get: function get() {
        return this.$emit;
      }
    }
  });

  Vue.bus = bus;

  Object.defineProperty(Vue.prototype, '$bus', {
    get: function get() {
      return bus;
    }
  });
}
