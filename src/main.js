import 'normalize.css';
import './style/animation.css';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import eventBus from './utils/eventBus';
Vue.use(eventBus);

Vue.config.productionTip = false;
const wechat = new window.Wechat('wx8d4dcbcc3d3f1cb9');
Vue.prototype.$wechat = wechat;
// 初始化wechat
wechat.config();
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
