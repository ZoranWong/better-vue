import HttpAdapter from "../contracts/HttpAdapter";
import Fly from 'flyio/dist/npm/wx';
import {FlyRequestConfig} from 'flyio';

export default class WXFlyioAdapter extends HttpAdapter {
    /**
    * @param {FlyRequestConfig} config
    * */
    constructor (config) {
        super(config);
        this._client = Fly;
        this._client.config = config;
    }
}
