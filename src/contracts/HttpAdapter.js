import FormRequest from '../requests/FormRequest';
import {AxiosInstance, AxiosProxyConfig, AxiosResponse, AxiosRequestConfig} from 'axios';

export default class HttpAdapter {
    /**@type {AxiosProxyConfig}*/
    _config = {};
    /**@type {AxiosInstance}*/
    _client = null;

    constructor (config) {
        this._config = config;
    }

    /**@type {FormRequest}*/
    send (request) {
        return new Promise((resolve, reject) => {
            if (this._client) {
                /**@type {AxiosRequestConfig}*/
                let axiosRequest = {};
                axiosRequest.headers = request._headers;
                axiosRequest.method = request._method;
                axiosRequest.url = request._url;
                if (axiosRequest.method === 'get') {
                    axiosRequest.params = request._data;
                } else {
                    axiosRequest.data = request._data;
                }
                /**@type {AxiosResponse} response*/
                this._client.request(axiosRequest).then((response) => {
                    resolve(new request._response(response));
                }, (reason) => {
                    reject(reason);
                });
            } else {
                reject(false);
            }
        })
    }
}
