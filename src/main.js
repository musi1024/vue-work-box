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

/* 动态创建组件 */
import alert from './plugins/alert';
Vue.use(alert);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
