import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
  popup: {
    test: { show: false, type: null },
    test2: { show: false, type: null }
  }
};

const getters = {};
Object.keys(state.popup).map(i => {
  getters[i] = state => {
    return state.popup[i];
  };
});

const mutations = {
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
};

const store = new Vuex.Store({
  state,
  getters,
  mutations
});

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
