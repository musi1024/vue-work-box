import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home.vue'),
      children: [
        {
          path: '/button',
          name: 'button',
          component: () => import('@/views/Button.vue')
        },
        {
          path: '/popup',
          name: 'popup',
          component: () => import('@/views/Popup.vue')
        },
        {
          path: '/alert',
          name: 'alert',
          component: () => import('@/views/Alert.vue')
        },
        {
          path: '/collapse',
          name: 'collapse',
          component: () => import('@/views/Collapse.vue')
        },
        {
          path: '/marquee',
          name: 'marquee',
          component: () => import('@/views/Marquee.vue')
        }
      ]
    }
  ]
});
