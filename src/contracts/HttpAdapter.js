import FormRequest from '../requests/FormRequest';
import {AxiosInstance, AxiosProxyConfig, AxiosResponse, AxiosRequestConfig} from 'axios';
import {Fly, FlyRequestConfig} from 'flyio';
import {each, isArray} from "underscore";

export default class HttpAdapter {
    /**@type {AxiosProxyConfig}*/
    _config = {};
    /**@type {AxiosInstance|Fly}*/
    _client = null;

    constructor (config) {
        this._config = config;
    }

    response(responseClass, response){

    }
    headers(headers) {
        let header = {};
        each(headers, (value, key) => {
            header[key] = isArray(value) ? value[0] : value;
        });
        return header;
    }
    /**@type {FormRequest}*/
    send (request, responseClass) {
        return new Promise((resolve, reject) => {
            if (this._client) {
                /**@type {AxiosResponse} response*/
                this.request(request).then((response) => {
                    console.log(response, '==============');
                    let res = this.response(responseClass, response);
                    resolve(request.response(res));
                }, (reason) => {
                    console.log('----------- reason ------', reason);
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
