import {extend} from 'underscore';
import Response from '../responses/Response';

const HTTP_GET = 'GET';
const HTTP_POST = 'POST';
const HTTP_PUT = 'PUT';
const HTTP_DELETE = 'DELETE';
const HTTP_HEADER = 'HEADER';
export default class FormRequest {
    _data = {};
    _method = null;
    _uri = null;
    _headers = {};
    _query = {};
    _middlewares = [];
    /**@type {Function}*/
    _response = null;
    static GET = HTTP_GET;
    static POST = HTTP_POST;
    static PUT = HTTP_PUT;
    static DELETE = HTTP_DELETE;
    static HEADER = HTTP_HEADER;

    constructor (data) {
        if (this._method === HTTP_DELETE || this._method === HTTP_HEADER || this._method === HTTP_GET) {
            this._query = data;
        } else {
            this._data = data;
        }
    }

    rules () {
        return {};
    }

    messages () {
        return {};
    }

    header (key, value) {
        this._headers[key] = value;
        return this;
    }

    /**
     * @return {Object.<string, string>}
     * */
    headers (headers = null) {
        if (headers) {
            this._headers = headers;
        }
        return this._headers;
    }

    /**
     * @return {Object.<string, Object>}
     * */
    all () {
        return extend({}, this.data, this.query);
    }

    /**
     * @return {Object.<string, Object>}
     * */
    get query () {
        return this._method === HTTP_DELETE || this._method === HTTP_HEADER || this._method === HTTP_GET ? this._query : {};
    }

    /**
     * @return {Object.<string, Object>}
     * */
    get data () {
        return this._method === HTTP_PUT || this._method === HTTP_POST ? this._data : {};
    }

    /**
     * @return {Object.<string, string>}
     * */
    get headers () {
        return this._headers;
    }

    /**
     * @return {string}
     * */
    get uri () {
        return this._uri;
    }

    /**
     * @return {string}
     * */
    get method () {
        return this._method;
    }

    /**
     * @return {Array}
     * */
    get middlewares () {
        return this._middlewares;
    }

    set middlewares (middlewares) {
        this._middlewares = middlewares;
    }

    /**
     * @param  res
     * @return {Response}
     * */
    response (res) {
        this._response = res;
        return res;
    }
}
