import Vue from 'vue';
import Vuex from 'vuex';
import popup from './modules/popup';
import setShowPopup from '@/plugins/popup';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    popup
  }
});

setShowPopup(Vue, store);

export default store;
