import HttpAdapter from "../contracts/HttpAdapter";
import Axios from 'uni-app-axios';
import {isArray, each} from 'underscore';

export default class AxiosAdapter extends HttpAdapter {
    constructor(config) {
        super(config);
        let axios = Axios();
        this._config['url'] = this._config['host'];
        this._client = axios.create(this._config);
    }

    request(request) {
        /**@type {AxiosRequestConfig}*/
        let axiosRequest = {};
        // axiosRequest.baseURL = this.config['host'];
        axiosRequest.headers = request.headers;
        axiosRequest.method = request.method.toLowerCase();
        axiosRequest.url = request.uri;
        axiosRequest.params = request.query;
        axiosRequest.data = request.data;
        return this._client(axiosRequest);
    }

    response(responseClass, response) {
        return new responseClass(response.statusCode, this.headers(response.header), response.data);
    }
}
