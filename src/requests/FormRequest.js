export default class FormRequest {
    _data = {};
    _method = null;
    _url = null;
    _headers = {};
    /**@type {Function}*/
    _response = null;
    constructor (data) {
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

    headers (headers = null) {
        if (headers) {
            this._headers = headers;
        }
        return this._headers;
    }
}
