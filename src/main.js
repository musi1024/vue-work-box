import 'normalize.css';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'core-js/features/object/assign';
import 'core-js/features/string/includes';
import '@/rpf/vue/vconsole';
import preventScroll from '@/rpf/un/preventScroll';
import popup from '@/plugins/popup';
import alert from '@/plugins/alert';

preventScroll();
Vue.use(popup);
Vue.use(alert);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
