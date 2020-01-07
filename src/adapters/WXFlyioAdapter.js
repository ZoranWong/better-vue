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
        // this._client.config = config;
        console.log(this._client);
    }

    request (request) {
        /**@type {FlyRequestConfig} flyRequest*/
        let flyRequest = {};
        flyRequest.baseURL = this.config['host'];
        flyRequest.headers = request.headers;
        flyRequest.method = request.method;
        flyRequest.url = request.uri;
        // flyRequest.params = request.query;
        flyRequest.body = request.data;
        console.log(flyRequest);
        return flyRequest;
    }
}
