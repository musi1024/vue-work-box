import Vue from 'vue';
import Vuex from 'vuex';
import modal from './modules/modal';
import storagePlugin from './plugins/storagePlugin';

Vue.use(Vuex);

const state = {
  text: ''
};

const mutations = {
  setText(state, payload) {
    state.text = payload;
  }
};

const store = new Vuex.Store({
  state,
  mutations,
  modules: {
    modal
  },
  plugins: [storagePlugin]
});

export default store;
