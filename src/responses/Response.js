export default class Response {
    _status = null;
    _body = null;
    _headers = null;

    constructor (status, headers, body) {
        this._body = body;
        this._status = status;
        this._headers = headers;
    }

    _parse () {
		console.log('_parse in super class ');
    }

    get status () {
        return this._status;
    }

    get body () {
        return this._body;
    }

    get headers(){
        return this._headers;
    }
}
