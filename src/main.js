import 'normalize.css';
import './style/animation.css';
import './style/common.css';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import eventBus from './utils/eventBus';
Vue.use(eventBus);
import './directive/loading';
import alert from './components/Alert/createAlert';
Vue.use(alert);
import stopTouchMove from './utils/Browser/stopTouchMove';
stopTouchMove();

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
