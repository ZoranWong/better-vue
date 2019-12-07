import Service from "./Service";

export default class HttpService extends Service {
    _httpClient = null;
    _headers = {};
    _host = null;
    _withCredentials = false;

    constructor (application, client, host) {
        super(application);
        this._httpClient = client;
        this._host = host;
    }
    headers (options) {
        this._headers = options;
    }
    header (name, value) {
        this._headers[name] = value;
    }
    async request (request) {
        this._httpClient.request({
            url: request.url,
            baseUrl: this._host,
            method: request.method,
            data: request.data,
            headers: this._headers,
            params: request.params,
            transformRequest: [function (data) {
                return data;
            }],
            transformResponse: [function (data) {
                return data;
            }],
            responseType: request.responseType, // 默认的
            xsrfCookieName: 'XSRF-TOKEN', // default
            xsrfHeaderName: 'X-XSRF-TOKEN', // 默认的
            withCredentials: this._withCredentials, // 默认的
        });
    }
}
