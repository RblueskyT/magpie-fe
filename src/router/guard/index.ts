import type { Router } from 'vue-router';
import { setRouteEmitter } from '@/utils/route-listener';
import setupUserLogonInfoGuard from './userLogonInfo';
import setupPermissionGuard from './permission';

function setupPageGuard(router: Router) {
  router.beforeEach(async (to) => {
    // emit route change
    setRouteEmitter(to);
    // change page title
    if (to.meta.title) {
      document.title = to.meta.title as any;
    } else {
      document.title = 'Magpie - A Platform for Researching APP Fraud Warnings';
    }
  });
}

export default function createRouteGuard(router: Router) {
  setupPageGuard(router);
  setupUserLogonInfoGuard(router);
  setupPermissionGuard(router);
}
