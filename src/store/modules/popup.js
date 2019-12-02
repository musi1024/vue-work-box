const state = {
  test: { show: false, type: null },
  test2: { show: false, type: null }
};

let getters = {};
Object.keys(state).map(i => {
  getters[i] = state => {
    return state[i];
  };
});

const mutations = {
  show(state, payload) {
    if (Object.prototype.toString.call(payload.props) === '[object Object]') {
      state[payload.type] = {
        ...state[payload.type],
        ...payload.props
      };
    } else {
      state[payload.type] = payload.props;
    }
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations
};
