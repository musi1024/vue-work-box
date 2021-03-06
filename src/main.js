import 'normalize.css';
import '@/style/global.scss';
import '@/style/animation.scss';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'core-js/features/object/assign';
import 'core-js/features/string/includes';
import '@/rpf/vue/vconsole';
import preventScroll from '@/rpf/un/preventScroll';

preventScroll();

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
