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
        path: '/login',
        name: 'login',
        meta: {
          title: "登录"
        },
        component: resolve => require(["@/views/login/Login"], resolve),
      }, {
        path: '/register',
        name: 'register',
        meta: {
          title: "注册",
          keepAlive: true
        },
        component: resolve => require(["@/views/register/Register"], resolve),
      }, {
        path: '/forgetPassword',
        name: 'forgetPassword',
        meta: {
          title: "忘记密码",
          keepAlive: true
        },
        component: resolve => require(["@/views/forgetPassword/ForgetPassword"], resolve),
      }, {
        path: '/telAreaCode',
        name: 'telAreaCode',
        meta: {
          title: "选择国家地区"
        },
        component: resolve => require(["@/views/telAreaCode/TelAreaCode"], resolve),
      }, {
        path: '/tabIndex',
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
          path: 'biBiTransaction',
          name: 'biBiTransaction',
          alias: '/biBiTransaction',
          meta: {
            title: "币币交易"
          },
          component: resolve => require(["@/views/tabIndex/views/BiBiTransaction"], resolve),
        },]
      }, {
        path: '/user',
        name: 'user',
        meta: {
          title: "我的"
        },
        component: resolve => require(["@/views/user/User"], resolve),
      },]
    }
  ]
});


// 后退
Router.prototype.goBack = function () {
  this.isBack = true;
  window.history.go(-1);
}

// 后退到指定页
Router.prototype.goBackPathName = function (pathName) {
  this.isBack = true;
  router.push({ name: pathName })
}

export default router;