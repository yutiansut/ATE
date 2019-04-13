import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// 手淘
import 'lib-flexible'


// 全局组件-Header
import Header from "@/components/common/Header";
Vue.component('Header', Header);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
