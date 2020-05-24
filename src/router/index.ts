import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    component: Login,
    name: 'Login'
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router


// const router = new VueRouter({
//   mode: 'history',
//   relative: true,
//   scrollBehavior(to, from, savedPosition) {
//     if (savedPosition) {
//       return savedPosition
//     } else {
//       return { x: 0, y: 0 }
//     }
//   }
// });

// const loginCheck = (to) => {
//   const loggedIn = to.matched.some(record => record.meta.isPublic) || Store.state.auth.email != null;
//   return loggedIn;
// }

// const routes = [
//   {
//     path: '/',
//     component: Tasks,
//     name: 'Tasks'
//   },
//   {
//     path: '/login',
//     component: Login,
//     name: 'Login'
//   },
// ];

// router.beforeEach((to, from, next) => {
//   if (!loginCheck(to, from, next)) {
//     next({ path: '/login' });
//   } else {
//     next();
//   }
// });

// export default new VueRouter({ routes });