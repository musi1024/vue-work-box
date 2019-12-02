import Vue from 'vue';
import Vuex from 'vuex';
import popup from './modules/popup';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    popup
  }
});

export default store;
