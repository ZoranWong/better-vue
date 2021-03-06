import HttpAdapter from "../contracts/HttpAdapter";
import Fly from 'flyio/dist/npm/wx';
import {FlyRequestConfig} from 'flyio';

export default class WXFlyioAdapter extends HttpAdapter {
    /**
    * @param {FlyRequestConfig} config
    * */
    constructor (config) {
        super(config);
        this._client = new Fly;
    }

    request (request) {
        /**@type {FlyRequestConfig} flyRequest*/
        let flyRequest = {};
        flyRequest.baseURL = this.config['host'];
        flyRequest.headers = request.headers;
        flyRequest.method = request.method;
        flyRequest.url = request.uri;
        flyRequest.params = request.query;
        flyRequest.body = request.data;
        return this._client.request(flyRequest);
    }

    response(responseClass, response) {
        return new responseClass(response.status, this.headers(response.headers), response.data);
    }
}
