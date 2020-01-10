import {isString} from 'underscore';

export default class Query {
    _queryString = null;
    _params = {};

    constructor (query = null) {
        if (query) {
            if (isString(query)) {
                this._queryString = queryString;
                this._parse();
            } else {
                this._params = query;
                this._convertQueryStr();
            }
        }
    }

    set queryString (str) {
        this._queryString = str;
        this._parse();
        return str;
    }

    set params (params) {
        this.params = params;
        this._convertQueryStr();
        return params;
    }

    _parse () {
    }

    _convertQueryStr () {
    }

    get queryString () {
        return this._queryString;
    }

    get params(){
        return this._params;
    }
}
