import type { Router, LocationQueryRaw } from 'vue-router';
import NProgress from 'nprogress'; // progress bar

import { useUserStore } from '@/store';
import { isLogon } from '@/utils/auth';

export default function setupUserLogonInfoGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    NProgress.start();
    const userStore = useUserStore();
    if (isLogon()) {
      if (userStore.group !== 0) {
        next();
      } else {
        next({
          name: 'logon',
          query: {
            redirect: to.name,
            ...to.query,
          } as LocationQueryRaw,
        });
      }
      NProgress.done();
    } else {
      if (to.name === 'logon') {
        next();
        NProgress.done();
        return;
      }
      next({
        name: 'logon',
        query: {
          redirect: to.name,
          ...to.query,
        } as LocationQueryRaw,
      });
      NProgress.done();
    }
  });
}
