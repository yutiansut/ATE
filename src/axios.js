import Vue from 'vue';
import store from '@/store';
import Router from './router';
import Axios from 'axios';
import Config from './config';
import { Toast, Dialog } from 'vant';
const baseURL = Config.baseURL + '/api';
const headers = {
    "Content-Type": "application/json"
};

// request拦截器--参数处理
Axios.interceptors.request.use(config => {
    let token = store.state.token || localStorage.token;
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
    config.headers['language'] = 1;
    if (token != null) {
        config.headers['token'] = token;
    }
    return config;
}, error => {
    // Do something with request error
    return error;
});

// request拦截器--响应处理
Axios.interceptors.response.use(response => {
    // Dialog.alert({
    //     message: "<p style='color:#333'>" + JSON.stringify(response) + "</p>"
    // })
    return response;
}, err => {
    //请求出错，根据返回状态码判断出错原因

    return err;
});


export default (params = {}) => {
    if (params.data) {
        params.data.device = "2"
        params.data = 'jsonString=' + JSON.stringify(params.data);
    }
    let httpDefault = {
        method: params.type,
        baseURL: baseURL,
        url: params.url,
        params: params.type == 'get' || params.type == 'delete' ? params.data : null,
        data: params.type == 'post' || params.type == 'put' ? params.data : null,
        timeout: 10000
    }

    return new Promise((resolve, reject) => {
        Axios(httpDefault).then(data => {
            if (data.data.code == 1) {
                if (params.tips) {
                    setTimeout(() => {
                        Toast.success(data.data.msg)
                    }, 100)
                };
                resolve(data.data.data);
            } else {
                setTimeout(() => {
                    Toast.fail(data.data.msg)
                }, 100)
                if (data.data.code == 208 || data.data.code == 224) {
                    Router.push({ path: '/login', query: { isBack: true } })
                }
                reject(data.data);
            }
        }, err => {
            setTimeout(() => {
                Toast.fail("服务器旅行去了！")
            }, 100)
            reject(err);
        });
    })
}