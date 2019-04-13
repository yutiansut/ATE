import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: resolve => require(["@/views/Index"], resolve),
      redirect: '/index',
      children: [{
        path: 'tabIndex',
        name: 'tabIndex',
        component: resolve => require(["@/views/tabIndex/Index"], resolve),
        children: [{
          path: 'index',
          name: 'index',
          alias: '/index',
          meta: {
            title: "首页"
          },
          component: resolve => require(["@/views/tabIndex/views/Index"], resolve),
        }, {
          path: 'quotation',
          name: 'quotation',
          alias: '/quotation',
          meta: {
            title: "行情"
          },
          component: resolve => require(["@/views/tabIndex/views/Quotation"], resolve),
        }, {
          path: 'b2b_b2c',
          name: 'b2b_b2c',
          alias: '/b2b_b2c',
          meta: {
            title: "B2B/B2C"
          },
          component: resolve => require(["@/views/tabIndex/views/B2B_B2C"], resolve),
        }, {
          path: 'user',
          name: 'user',
          alias: '/user',
          meta: {
            title: "我的"
          },
          component: resolve => require(["@/views/tabIndex/views/User"], resolve),
        },]
      }]
    }
  ]
});

export default router;