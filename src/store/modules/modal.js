import isObj from '@/utils/Object/isObj';

const state = {
  modal1: { show: false, type: null }
};

let getters = {};
Object.keys(state).map(i => {
  getters[i] = state => {
    return state[i];
  };
});

const mutations = {
  show(state, payload) {
    if (!state[payload.type]) throw Error(`${payload.type} is not exist`);
    state[payload.type] = isObj(payload.props)
      ? {
          ...state[payload.type],
          ...payload.props
        }
      : (state[payload.type] = payload.props);
  }
};

const actions = {};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
