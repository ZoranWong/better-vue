import FormRequest from '../requests/FormRequest';
import {AxiosInstance, AxiosProxyConfig, AxiosResponse, AxiosRequestConfig} from 'axios';
import {Fly} from 'flyio';

export default class HttpAdapter {
    /**@type {AxiosProxyConfig}*/
    _config = {};
    /**@type {AxiosInstance|Fly}*/
    _client = null;

    constructor (config) {
        this._config = config;
    }

    /**@type {FormRequest}*/
    send (request) {
    }
}
