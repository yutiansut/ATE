import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// 手淘
import 'lib-flexible';

// 多语言
import i18n from './lang/index';

import { Dialog } from 'vant';

Vue.use(Dialog);



// 全局组件-Header
import Header from "@/components/common/Header";
Vue.component('Header', Header);

Vue.config.productionTip = false;

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount("#app");
