import Vue from 'vue';
import Vuex from 'vuex';
import modal from './modules/modal';
import setStoragePlugin from './plugins/storagePlugin';

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
  plugins: [
    setStoragePlugin({
      filterSet: mutation => {
        return mutation.type.split('/')[0] !== 'modal';
      },
      filterGet: key => {
        return key !== 'modal';
      }
    })
  ]
});

export default store;
