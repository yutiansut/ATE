import Vue from "vue";
import Router from "vue-router";
import Store from '@/store';

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
          path: 'c2c_b2c',
          name: 'c2c_b2c',
          alias: '/c2c_b2c',
          meta: {
            title: "C2C/B2C"
          },
          component: resolve => require(["@/views/tabIndex/views/C2C_B2C"], resolve),
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
          title: "个人中心",
          isLogin: true
        },
        component: resolve => require(["@/views/user/User"], resolve),
      }, {
        path: '/user/c2c_b2c',
        name: 'userC2c_b2c',
        meta: {
          title: "C2C_B2C资产",
          isLogin: true
        },
        component: resolve => require(["@/views/user/C2C_B2C"], resolve),
      }, {
        path: '/user/bibi',
        name: 'userbibi',
        meta: {
          title: "币币资产",
          isLogin: true
        },
        component: resolve => require(["@/views/user/BiBi"], resolve),
      }, {
        path: '/user/msgList',
        name: 'msgList',
        meta: {
          title: "留言列表",
          isLogin: true
        },
        component: resolve => require(["@/views/user/MsgList"], resolve),
      }, {
        path: '/user/msgDetails',
        name: 'msgDetails',
        meta: {
          title: "留言反馈详情",
          isLogin: true
        },
        component: resolve => require(["@/views/user/MsgDetails"], resolve),
      }, {
        path: '/user/msgInput',
        name: 'msgInput',
        meta: {
          title: "留言反馈",
          isLogin: true
        },
        component: resolve => require(["@/views/user/MsgInput"], resolve),
      }, {
        path: '/user/mailboxAuth',
        name: 'mailboxAuth',
        meta: {
          title: "邮箱认证",
          isLogin: true
        },
        component: resolve => require(["@/views/user/MailboxAuth"], resolve),
      }, {
        path: '/user/authentication',
        name: 'authentication',
        meta: {
          title: "身份认证",
          isLogin: true
        },
        component: resolve => require(["@/views/user/authentication/Index"], resolve),
      }, {
        path: '/user/authentication/idAuthOne',
        name: 'idAuthOne',
        meta: {
          title: "身份证认证",
          keepAlive: true,
          isLogin: true
        },
        component: resolve => require(["@/views/user/authentication/idAuth/StepOne"], resolve),
      }, {
        path: '/user/authentication/idAuthTwo',
        name: 'idAuthTwo',
        meta: {
          title: "身份证认证",
          keepAlive: true,
          isLogin: true
        },
        component: resolve => require(["@/views/user/authentication/idAuth/StepTwo"], resolve),
      }, {
        path: '/user/authentication/idAuthThere',
        name: 'idAuthThere',
        meta: {
          title: "身份证认证",
          keepAlive: true,
          isLogin: true
        },
        component: resolve => require(["@/views/user/authentication/idAuth/StepThere"], resolve),
      }, {
        path: '/user/authentication/idAuthFour',
        name: 'idAuthFour',
        meta: {
          title: "身份证认证",
          keepAlive: true,
          isLogin: true
        },
        component: resolve => require(["@/views/user/authentication/idAuth/StepFour"], resolve),
      }, {
        path: '/user/authentication/passportAuthOne',
        name: 'passportAuthOne',
        meta: {
          title: "护照认证",
          keepAlive: true,
          isLogin: true
        },
        component: resolve => require(["@/views/user/authentication/passportAuth/StepOne"], resolve),
      }, {
        path: '/user/authentication/passportAuthTwo',
        name: 'passportAuthTwo',
        meta: {
          title: "护照认证",
          keepAlive: true,
          isLogin: true
        },
        component: resolve => require(["@/views/user/authentication/passportAuth/StepTwo"], resolve),
      }, {
        path: '/user/authentication/passportAuthThere',
        name: 'passportAuthThere',
        meta: {
          title: "护照认证",
          keepAlive: true,
          isLogin: true
        },
        component: resolve => require(["@/views/user/authentication/passportAuth/StepThere"], resolve),
      }, {
        path: '/setting',
        name: 'setting',
        meta: {
          title: "设置"
        },
        component: resolve => require(["@/views/setting/Setting"], resolve),
      }, {
        path: '/setting/lang',
        name: 'lang',
        meta: {
          title: "语言"
        },
        component: resolve => require(["@/views/setting/Lang"], resolve),
      }, {
        path: '/setting/legalCurrency',
        name: 'legalCurrency',
        meta: {
          title: "法币"
        },
        component: resolve => require(["@/views/setting/LegalCurrency"], resolve),
      }, {
        path: '/setting/resetPwd',
        name: 'resetPwd',
        meta: {
          title: "重置登录密码"
        },
        component: resolve => require(["@/views/setting/ResetPwd"], resolve),
      }, {
        path: '/setting/resetCapitalPwd',
        name: 'resetCapitalPwd',
        meta: {
          title: "重置资金密码"
        },
        component: resolve => require(["@/views/setting/ResetCapitalPwd"], resolve),
      }, {
        path: '/setting/GesturePassword',
        name: 'gesturePassword',
        meta: {
          title: "手势密码"
        },
        component: resolve => require(["@/views/setting/GesturePassword"], resolve),
      }, {
        path: '/setting/google',
        name: 'google',
        meta: {
          title: "绑定谷歌验证器"
        },
        component: resolve => require(["@/views/setting/Google"], resolve),
      }, {
        path: '/setting/google/code',
        name: 'google',
        meta: {
          title: "谷歌验证码"
        },
        component: resolve => require(["@/views/setting/GoogleCode"], resolve),
      }, {
        path: '/tradeRecord',
        name: 'tradeRecord',
        meta: {
          title: "交易记录"
        },
        component: resolve => require(["@/views/tradeRecord/Index"], resolve),
      }, {
        path: '/advertisementRelease',
        name: 'advertisementRelease',
        meta: {
          title: "发布广告"
        },
        component: resolve => require(["@/views/advertisement/Release"], resolve),
      }]
    }
  ]
});


// 后退
Router.prototype.goBack = function () {
  this.isBack = true;
  window.history.go(-1);
};

// 后退到指定页
Router.prototype.goBackPathName = function (pathName) {
  this.isBack = true;
  router.push({ name: pathName })
};

router.beforeEach((to, from, next) => {
  let token = Store.state.token || localStorage.token;
  if (to.meta.isLogin && !token) {
    next('/login?isBack=true');
  } else {
    next();
  }
})

export default router;