export default class Response {
    _status = null;
    _body = null;
    constructor (status, body) {
        this._body = body;
        this._status = status;
    }
}
