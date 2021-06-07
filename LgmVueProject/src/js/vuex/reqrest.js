import Apis from "./api";
import axios from 'axios'
import {Message} from 'element-ui';

const METHOD = {
    GET: 'get',
    POST: 'post'
}
/**
 * 网络请求
 * @param method 方法
 * @param url 接口地址
 * @param params 参数
 * @param showError 是否展示错误信息
 * @returns {Promise<any>}
 */
// 错误和失败信息都在这里进行处理，界面中调用的时候只处理正确数据即可
function request(method, url, params, showError) {
    if (showError || showError == undefined){ // 是否展示错误信息
        showError = true;
    }else {
        showError = false;
    }
    return new Promise((resolve, reject) => {
        axios({
            method: method,
            url: url,
            params: params
        }).then((res) => {
            if (res.data.code == 0) { // 0 是请求成功
                resolve(res.data.data);
            } else { // 其他情况返回错误信息，根据需要处理
                reject(res.data);
                if (showError){
                    Message.error(res.data.message);
                }
            }
        }).catch(() => {
            if (showError){
                Message.error('请求失败，请稍后再试');
            }
        });
    });
}

/**
 * 图片上传
 * @param url 地址
 * @param params 参数 FormData
 * @param showError 是否展示错误
 * @returns {Promise<any>}
 */
function uploadRequest(url, params, showError) {
    if (showError || showError == undefined){
        showError = true;
    }else {
        showError = false;
    }
    let config = {
        headers: { "Content-Type": "multipart/form-data" },
    }
    return new Promise((resolve, reject) => {
        axios.post(url,params,config).then((res) => {
            if (res.data.code == 0) {
                resolve(res.data.data);
            } else {
                reject(res.data);
                if (showError){
                    Message({
                        type: 'error',
                        message: res.data.message,
                        duration: 1000
                    });
                }
            }
        }).catch(() => {
            if (showError){
                Message({
                    type: 'error',
                    message: '请求失败，请稍后再试',
                    duration: 1000
                });
            }
        });
    });
}

function get(url, params, showError) {
    return request(METHOD.GET, url, params, showError);
}

function post(url, params, showError) {
    return request(METHOD.POST, url, params, showError);
}

function upload(url, params, showError) {
    return uploadRequest(url, params, showError);
}
const API = {
    // 产品
    getProduct: (params) => post(Apis.getProduct, params),
    // 微信购买
    wxPay: (params) => post(Apis.wxPay, params),
}

function install(Vue) {
    Vue.prototype.$request = API;
}
export default install