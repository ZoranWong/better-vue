import Service from "./Service";
import Pipeline from "../pipe/Pipeline";

export default class HttpService extends Service {
    _httpClient = null;
    _headers = {};
    _host = null;
    _withCredentials = false;
    _middlewarePipeline = null;

    constructor (application, client, host) {
        super(application);
        this._httpClient = client;
        this._host = host;
        this._middlewarePipeline = new Pipeline(application);
    }

    _middleware (...middleware) {
        this._middlewarePipeline.through(middleware);
    }

    headers (options) {
        this._headers = options;
    }

    header (name, value) {
        this._headers[name] = value;
    }

    async request (request) {
        this._middleware(request.middlewares);
        let result = this._middlewarePipeline.thenReturn();
        if (result) {
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
        } else {
        }

    }
}
