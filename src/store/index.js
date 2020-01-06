import Vue from 'vue';
import Vuex from 'vuex';
import modal from './modules/modal';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    modal
  }
});

export default store;
