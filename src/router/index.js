import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/marquee',
      name: 'marquee',
      component: () => import('@/views/Marquee.vue')
    },
    {
      path: '/form',
      name: 'form',
      component: () => import('@/views/Form.vue')
    }
  ]
});