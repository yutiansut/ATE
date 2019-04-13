import Vue from 'vue';
import store from '@/store';
import Router from 'vue-router';
import Axios from 'axios';
import Config from '../config/config';

const baseURL = Config.baseURL + 'api';
const headers = {
    "Content-Type": "application/json"
};

// request拦截器--参数处理
Axios.interceptors.request.use(config => {
    if (token != null) {
        config.headers['Authorization'] = 'Bearer ' + token;
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


export default (url, params = {}, method = "post") => {
    let httpDefault = {
        method: method,
        baseURL: baseURL,
        url: url,
        params: method == 'get' || method == 'delete' ? params : null,
        data: method == 'post' || method == 'put' ? params : null,
        timeout: 10000
    }

    return new Promise((resolve, reject) => {
        Axios(httpDefault).then(data => {
            if (!data.response) {
                resolve(data.data);
            } else {
                reject(data);
            }
        }, reject);
    })
}