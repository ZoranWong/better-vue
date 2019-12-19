export default class HttpAdapter {
    _config = {};
    _client = null;
    constructor (config) {
        this._config = config;
    }

    send (request) {
        return new Promise((resolve, reject) => {
            if(this._client)
                resolve(true);
            else
                reject(false);
        })
    }
}
