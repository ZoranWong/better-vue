import FormRequest from '../requests/FormRequest';
import {AxiosInstance, AxiosProxyConfig, AxiosResponse, AxiosRequestConfig} from 'axios';
import {Fly, FlyRequestConfig} from 'flyio';

export default class HttpAdapter {
    /**@type {AxiosProxyConfig}*/
    _config = {};
    /**@type {AxiosInstance|Fly}*/
    _client = null;

    constructor (config) {
        this._config = config;
    }

    /**@type {FormRequest}*/
    send (request, responser) {
        return new Promise((resolve, reject) => {
            if (this._client) {
                /**@type {AxiosRequestConfig|FlyRequestConfig}*/
                let requestConfig =  this.request(request);
                /**@type {AxiosResponse} response*/
                this._client.request(requestConfig).then((response) => {
                    let res = new responser(response.status, response.data);
                    resolve(request.response(res));
                }, (reason) => {
                    reject(reason);
                });
            } else {
                reject(false);
            }
        });
    }

    request (request) {
        return {};
    }

    get config () {
        return this._config;
    }
}
