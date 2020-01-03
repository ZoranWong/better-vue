export default class Validator {
    _app = null;
    _message = null;
    _validateMethods = {};
    constructor (app) {
        this._app = app;
    }

    validate (data, rules, messages) {
        for (let key in rules) {
            let length = rules[key].length;
            for (let i = 0; i < length; i++) {
                let [method, param]= rules[key][i].split(':');
                let params = param.split(',');
                if(typeof this._validateMethods[method] !== 'undefined' && !this._validateMethods[method].apply(this, params)){
                    this._message = messages[key][method];
                    return false;
                }
            }
        }
        return true;
    }

    message () {
        return this._message;
    }
}
