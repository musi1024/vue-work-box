import 'normalize.css';
import './style/animation.css';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import eventBus from './utils/eventBus';
import utils from './utils/index';

Vue.use(eventBus);
Vue.use(utils);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
