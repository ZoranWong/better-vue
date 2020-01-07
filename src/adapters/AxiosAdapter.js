import HttpAdapter from "../contracts/HttpAdapter";
import axios from 'axios'
export default class AxiosAdapter extends HttpAdapter {
    constructor (config) {
        super(config);
        this._client = axios.create(this._config);
    }

    request (request) {
        /**@type {AxiosRequestConfig}*/
        let axiosRequest = {};
        axiosRequest.baseURL = this.config['host'];
        axiosRequest.headers = request.headers;
        axiosRequest.method = request.method.toLowerCase();
        axiosRequest.url = request.uri;
        axiosRequest.params = request.query;
        axiosRequest.data = request.data;
        return axiosRequest;
    }
}
