import HttpAdapter from "../contracts/HttpAdapter";
import axios from 'axios'
export default class AxiosAdapter extends HttpAdapter {
    constructor (config) {
        super(config);
        this._client = axios.create(this._config);
    }
    send (request) {
        return new Promise((resolve, reject) => {
            if (this._client) {
                /**@type {AxiosRequestConfig}*/
                let axiosRequest = {};
                axiosRequest.headers = request._headers;
                axiosRequest.method = request._method;
                axiosRequest.url = request._url;
                axiosRequest.params = request._query;
                axiosRequest.data = request._data;
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
