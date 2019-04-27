import 'normalize.css';
import './style/animation.css';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import eventBus from './utils/eventBus';
Vue.use(eventBus);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
