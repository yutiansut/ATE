import Vue from 'vue';
import store from '@/store';
import Router from 'vue-router';
import Axios from 'axios';
import Config from './config';
import { Toast } from 'vant';
const baseURL = Config.baseURL + '/api';
const headers = {
    "Content-Type": "application/json"
};

// request拦截器--参数处理
Axios.interceptors.request.use(config => {
    let token = store.state.token || localStorage.token;
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
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
                if (params.tips) Toast.success(data.data.msg);
                resolve(data.data.data);
            } else {
                Toast.fail(data.data.msg)

                if (this.data.data.code == 208) {
                    Router.push({ path: '/login', query: { isBack: true } })
                }
                reject(data.data);
            }
        }, err => {
            Toast.fail("服务器旅行去了！")
            reject(err);
        });
    })
}