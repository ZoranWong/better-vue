import Service from "./Service";
import Pipeline from "../pipe/Pipeline";
import {isClass} from "../utils/helpers";

export default class HttpService extends Service {
    _httpClient = null;
    _headers = {};
    _host = null;
    _withCredentials = false;
    _middlewarePipeline = null;
    _config = {
        xsrfCookieName: 'XSRF-TOKEN', // default
        xsrfHeaderName: 'X-XSRF-TOKEN', // 默认的
    };
    _httpAdapter = null;
    _requestTransformers = [];
    _responseTransformers = [];
    _validator = null;
    _exception = null;

    constructor (application, adapter, host) {
        super(application);
        this._httpAdapter = adapter;
        this._host = host;
        this._middlewarePipeline = new Pipeline(application);
        this._config['host'] = this.host;
        this._config['transformRequest'] = this._requestTransformers;
        this._config['transformResponse'] = this._responseTransformers;
        this._config['withCredentials'] = this._withCredentials;
        this._httpClient = new adapter(this._config);
    }

    httpAdapter (adapter) {
        this._httpAdapter = adapter;
    }

    config (config) {
        this._config = config;
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

    _validate (request) {
        let rules = request.rules;
        let messages = request.messages();
        let result = this._validator.validate(request.all(), rules(), messages());
        if (!result) {
            this._throw(this._validator.message());
        }
        return request;
    }

    _throw (message) {
        this._exception.throw(message);
    }

    async send (request, response) {
        this._middleware(request.middlewares);
        if (!this._httpClient && this._httpAdapter) {
            if (isClass(this._httpAdapter)) {
                this._httpClient = new this._httpAdapter(this._config);
            } else {
                this._httpClient = this._httpAdapter(this._config);
            }
        }
        return await this._middlewarePipeline.send((() => {
            request = this._validate(request);
            return request;
        })()).then(async (request) => {
            if(this._httpClient) {
                return await this._httpClient.send(request);
            }
            return null;
        });
    }
}
