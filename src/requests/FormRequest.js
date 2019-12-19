import _ from 'underscore';

export default class FormRequest {
    _data = {};
    _method = null;
    _url = null;

    constructor (data) {
    }

    rules () {
        return {};
    }

    messages () {
        return {};
    }
}
