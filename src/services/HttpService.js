import Service from "./Service";
import Pipeline from "../pipe/Pipeline";
import {isClass} from "../utils/helpers";
import Response from '../responses/Response';
import HttpAdapter from '../contracts/HttpAdapter';
export default class HttpService extends Service {
    /**@type {HttpAdapter} _httpAdapter*/
    _httpClient = null;
    _headers = {};
    _host = null;
    _withCredentials = false;
    /**@type {Pipeline} _middlewarePipeline*/
    _middlewarePipeline = null;
    _config = {
        xsrfCookieName: 'XSRF-TOKEN', // default
        xsrfHeaderName: 'X-XSRF-TOKEN', // 默认的
    };
    /**@type {Function} _httpAdapter*/
    _httpAdapter = null;
    _requestTransformers = [];
    _responseTransformers = [];
    _validator = null;
    _exception = null;

    constructor (application, adapter, host = null) {
        super(application);
        this._httpAdapter = adapter;
        this._host = host;
        this._middlewarePipeline = new Pipeline(application);
        this._config['host'] = host;
        this._config['transformRequest'] = this._requestTransformers;
        this._config['transformResponse'] = this._responseTransformers;
        this._config['withCredentials'] = this._withCredentials;
    }

    httpAdapter (adapter) {
        this._httpAdapter = adapter;
    }

    set host (value) {
        this._host = value;
        this._config['host'] = value;
        return value;
    }

    config (config) {
        this._config = config;
    }

    _middleware (...middleware) {
        this._middlewarePipeline.through(...middleware);
    }

    headers (options) {
        this._headers = options;
    }

    header (name, value) {
        this._headers[name] = value;
    }

    setValidator (validator) {
        this._validator = validator;
        return this;
    }

    _validate (request) {
        let rules = request.rules();
        let messages = request.messages();
        let data = request.all();
        let result = this._validator.validate(data, rules, messages);
        if (!result) {
            this._throw(this._validator.message());
        }
        return request;
    }

    _throw (message) {
        this._exception.throw(message);
    }

    async send (request, responser = Response) {
        this._middleware.apply(this, request._middlewares);
        if (!this._httpClient && this._httpAdapter) {
            console.log('--------------- 22222 -----------', isClass(this._httpAdapter), this._httpAdapter);
            this._httpClient = new this._httpAdapter(this._config);
        }

        return await this._middlewarePipeline.send((() => {
            request = this._validate(request);
            return request;
        })()).then(async (request) => {
            if (this._httpClient) {
                // console.log('------- http client --------', this._httpClient);
                try {
                    let result = await this._httpClient.send(request, responser);

                    return result;
                }catch (e) {
                    console.log('==================', e);
                    return false;
                }

            }
            return null;
        });
    }
}
