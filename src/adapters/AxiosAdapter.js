import HttpAdapter from "../contracts/HttpAdapter";
import axios from 'axios'
export default class AxiosAdapter extends HttpAdapter {
    constructor (config) {
        super(config);
        this._client = axios.create(this._config);
    }
}
