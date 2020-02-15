import HttpAdapter from "../contracts/HttpAdapter";
import Axios from 'uni-app-axios';
import {extend} from 'underscore';

export default class AxiosAdapter extends HttpAdapter {
    constructor(config) {
        super(config);
        let axios = Axios();
        this._client = axios;
    }

    request(request) {
        let axiosRequest = {};
        // axiosRequest.baseURL = this.config['host'];
        axiosRequest.header = request.headers;
        let method = request.method.toLowerCase();
        axiosRequest.url = request.uri;
        axiosRequest.params = request.query;
        axiosRequest.data = request.data;
        let api = this._client.create({
            url: this._config['host'],
            dataType: 'json',//默认的返回类型
            responseType: 'text',
            method: method,
            header: extend(request.headers, {
                'content-type': "application/json"
            })
        });
        console.log(api);
        return api(request.uri, extend(request.query, request.data));
    }

    response(responseClass, response) {
        return new responseClass(response.statusCode, this.headers(response.header), response.data);
    }
}
