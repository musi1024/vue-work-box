import 'normalize.css';
import './style/animation.css';
import './style/common.css';

import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

/* event bus 全局事件监听 */
import eventBus from './plugins/eventBus';
Vue.use(eventBus);

/* 动态创建组件 */
import alert from './plugins/alert';
Vue.use(alert);

/* 禁止 touchmove */
import preventScroll from './utils/Browser/preventScroll';
preventScroll();

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
