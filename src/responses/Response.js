export default class Response {
    _status = null;
    _body = null;

    constructor (status, body) {
        this._body = body;
        this._status = status;
        this._parse();
    }

    _parse () {
    }

    get status () {
        return this._status;
    }

    get body () {
        return this._body;
    }
}
