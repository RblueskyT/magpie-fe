import type { Router } from 'vue-router';
import setupUserLogonInfoGuard from './userLogonInfo';

function setupPageGuard(router: Router) {
  router.beforeEach(async (to) => {
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
}
