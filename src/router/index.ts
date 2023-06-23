import { createRouter, createWebHistory } from 'vue-router';
import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css';

import { appRoutes } from './routes';
import { REDIRECT_MAIN, NOT_FOUND_ROUTE } from './routes/base';
import createRouteGuard from './guard';

NProgress.configure({ showSpinner: false }); // NProgress Configuration

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: 'logon',
    },
    {
      path: '/logon',
      name: 'logon',
      component: () => import('@/views/logon/index.vue'),
      meta: {
        title: 'Magpie - Log on',
        requiresAuth: false,
      },
    },
    {
      path: '/banking-services',
      name: 'banking-services',
      component: () => import('@/views/banking-services/index.vue'),
      meta: {
        title: 'Magpie - Personal Banking Services',
        requiresAuth: true,
      },
    },
    ...appRoutes,
    REDIRECT_MAIN,
    NOT_FOUND_ROUTE,
  ],
  scrollBehavior() {
    return { top: 0 };
  },
});

createRouteGuard(router);

export default router;
