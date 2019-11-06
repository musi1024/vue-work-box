import 'normalize.css';
import './style/animation.css';

import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import 'core-js/fn/object/assign';
import 'core-js/fn/string/includes';

if (process.env.VUE_APP_VCONSOLE !== 'false') {
  if (!/localhost/.test(window.location.origin)) {
    const VConsole = require('vconsole');
    new VConsole();
  }
}

/* 动态创建全局组件 */
import create from './plugins/create';
Vue.use(create);

import preventScroll from './rpf/un/preventScroll';
preventScroll();

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
