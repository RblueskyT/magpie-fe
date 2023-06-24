import 'vue-router';

declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth: boolean; // Whether logon is required to access the current page (every route must declare)
    ignoreCache?: boolean; // if set true, the page will not be cached
  }
}
