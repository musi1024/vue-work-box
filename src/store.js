import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    popup: { test: { show: false } }
  },
  getters: {},
  mutations: {
    showPopup(state, payload) {
      if (Object.prototype.toString.call(payload.props) === '[object Object]') {
        state.popup[payload.type] = {
          ...state.popup[payload.type],
          ...payload.props
        };
      } else {
        state.popup[payload.type] = payload.props;
      }
    }
  },
  actions: {}
});

store.getters = { ...store.getters, ...store.state.popup };

function showPopup(type, props) {
  store.commit('showPopup', { type, props });
}
const popup = {
  install() {
    Object.defineProperty(Vue.prototype, '$popup', {
      get: function get() {
        return showPopup;
      }
    });
  }
};
Vue.use(popup);

export default store;
