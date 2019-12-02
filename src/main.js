import 'normalize.css';

import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import 'core-js/features/object/assign';
import 'core-js/features/string/includes';

import './rpf/vue/vconsole';

import create from './plugins/create';
Vue.use(create);

import vPreventRepeat from './rpf/vue/directives/v-prevent-repeat';
Vue.use(vPreventRepeat);

import preventScroll from './rpf/un/preventScroll';
preventScroll();

import fixWeChatForm from './rpf/un/fixWeChatForm';
fixWeChatForm();

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
