import 'normalize.css';
import './style/animation.css';
import './style/common.css';

import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

if (process.env.VUE_APP_VCONSOLE === 'true') {
  if (!/localhost/.test(window.location.origin)) {
    const VConsole = require('vconsole');
    new VConsole();
  }
}

/* 自定义指令 */
import longPress from '../directive/longPress/longPress';
import loading from '../directive/loading/loading';
Vue.directive('longPress', longPress);
Vue.directive('loading', loading);

/* 动态创建全局组件 */
import create from './plugins/create';
Vue.use(create);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
