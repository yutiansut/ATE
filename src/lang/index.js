// 多语言
import Vue from 'vue';
import VueI18n from 'vue-i18n';
import Store from '@/store';

import { getCookie } from '@/global';

Vue.use(VueI18n);

const messages = {
    'zh-CN': require('./zh-CN'),
    'zh-HK': require('./zh-HK'),
    'en-US': require('./en-US'),
}

// 如果有设置的则用自己设置的否则用浏览器的
let myLang = localStorage.lang || getCookie('PLAY_LANG', 'zh-CN');

Store.commit('setLang', myLang);



// 动态设置
// this.$store.commit("setLang", "en-US");
// this.$i18n.locale = "zh-CN";
export default new VueI18n({
    locale: Store.state.lang,
    messages
})