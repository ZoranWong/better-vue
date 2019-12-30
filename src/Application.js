import {isArray, isFunction, isString, each, extend} from 'underscore';
import Model from './models/Model';
import Command from "./commands/Command";
import ServiceProvider from "./providers/ServiceProvider";
import {Store} from "vuex";
import Vue from 'vue';
import {VueConstructor} from 'vue'
import Collection from "./models/Collection";
import {collectionProxy} from "./utils/helpers";
import AppAdapter from './adapters/AppAdapter';
import Route from "./routes/Route"

/**
 * 应用容器类型
 * */
export default class Application {
    _instances = {};
    /**@type {Object.<string, Function>}*/
    _mixinMethods = {};
    /**@type {[ServiceProvider]}*/
    _serviceProviders = [];
    _config = {};
    _exceptionHandlers = {};
    _template = {};
    /**@type {Route}*/
    _route = null;
    _multiplePage = false;
    _registeredGlobal = true;

    /**@type {Vue}*/
    _current = null;
    /**@type {string}*/
    _currentRoute = null;
    /**@type {Function}*/
    _adapterClass = null;
    /**@type {Object.<string, Command>} _commandContainer*/
    static _commandContainer = {};
    /**@type {Object.<string, Model>} _modelContainer*/
    static _modelContainer = {};
    /**@type {Object.<string, boolean>} _globalProviderRegistered*/
    static _globalProviderRegistered = {};
    static _instanceContainer = {};
    /**@type {[AppAdapter]}*/
    static _pageContainer = [];
    /**@type {Store}*/
    _store = null;

    _apiGateway = null;

    constructor () {
    }

    needMock () {
        return this._config['app']['mock'];
    }

    setApiGateway (gateway) {
        this._apiGateway = gateway;
        return this;
    }

    /**
     * @param {string} name
     * @param {Command} command
     * @return {Command}
     * */
    registerCommand (name, command) {
        return Application._commandContainer[name] = command;
    }

    setAdapter (adapterClass) {
        this._adapterClass = adapterClass;
        return this;
    }

    /**
     *@param {Model} model
     *@param {string|any} key
     * @return
     * */
    _reConstructModel (model, key) {
        if (!isFunction(model[key]) && model.isChildProperty(key)) {
            model.state[key] = model[key];
            model.getters[key] = (state) => {
                return state[key];
            };
            model.addEventListener(key, (payload, state) => {
                state[key] = payload[key];
            });
            Object.defineProperty(model, key, {
                set (value) {
                    model.dispatch(key, value);
                },
                get () {
                    return model.get(key);
                }
            })
        }
    }


    /**
     * @param {string} name
     * @param {Model} model
     * @return {Application}
     * */
    registerModel (name, model) {
        let modelInstance = Application._modelContainer[name] = new model(this);
        if (modelInstance instanceof Collection) {
            modelInstance = collectionProxy(modelInstance);
            this.register(`$model.${name}`, modelInstance);
        } else {
            this.register(`$model.${name}`, modelInstance);
        }
        this._store.registerModule(name, modelInstance);
        each(modelInstance, (property, key) => {
            this._reConstructModel(modelInstance, key);
        });
        return this;
    }

    /**
     *@param {string} commandName
     * @param {Array} params
     * @return {Object}
     * @throws
     * */
    async command (commandName, ...params) {
        try {
            let command = Application._commandContainer[commandName];
            command = new command(this);
            return await command.handle(...params);
        } catch (e) {
            console.log(e);
            return false;
        }
    }

    // 实例化注册对象
    /**
     * @param {Object|Function} instance
     * @return {Object}
     * */
    _instanceRegister (instance) {
        if (isFunction(instance)) {
            instance = new instance(this);
        }
        return instance;
    }

    /**
     *@param {string|Array} paths
     * @return {Class|Array}
     * */
    async loader (paths) {
        if (!isArray(paths)) {
            paths = [paths];
        }
        let length = paths.length;
        let classes = {};
        for (let i = 0; i < length; i++) {
            let result = await import(paths[i]);
            let cl = (typeof result['default'] !== 'undefined' ? result['default'] : result);
            classes[cl.name] = cl;
        }
        return classes;
    }

    // 注册配置
    /**
     * @param {string} name
     * @param {Array|Object} config
     * @return {Application}
     * */
    registerConfig (name, config) {
        this.register(`config.${name}`, config);
        return this;
    }

    /**
     * @param {ServiceProvider} provider
     * @return {Application}
     * */
    registerProvider (provider) {
        this._serviceProviders.push(new provider(this));
        return this;
    }

    // 注册服务提供者
    registerServiceProviders () {
        if (!Application._globalProviderRegistered) {
            each(this._config['app']['providers'], async (value, key) => {
                let provider = value;
                if (isString(value)) {
                    provider = await this.loader(value);
                } else {
                    provider = value;
                }
                this.registerProvider(provider);
            });
            Application._globalProviderRegistered = true;
        }

        this._serviceProviders.forEach((provider) => {
            provider.register();
        });
    }

    /**
     * 系统启动（应用启动）
     * */
    boot () {
        each(this._serviceProviders, function (serviceProvider) {
            serviceProvider.boot();
        })
    }

    //注册异常函数
    /**
     * @param {string} name
     * @param {} exception
     * @return
     * */
    registerException (name, exception) {
        this._exceptionHandlers[name] = exception;
    }

    // application扩展
    /**
     * @param {Object} dist
     * @param {Object} src
     * @param {int} deep
     * */
    extend (dist, src, deep) {
        for (let key in src) {
            if (src.hasOwnProperty(key)) {
                let value = src[key];
                let end = !deep;
                if (end) {
                    dist[key] = value;
                    continue;
                } else if (!dist[key]) {
                    dist[key] = [];
                }
                this.extend(dist[key], value, deep - 1);
            }
        }
    }

    /**
     * @param {string} name
     * @param {string|Object} service
     * @return {Object}
     * */
    register (name, service = null) {
        let instance = null;
        if (!service && isFunction(name)) {
            instance = this[name] = Application._instanceContainer[name] = this._instanceRegister(name);
        } else if (name && isFunction(service)) {
            instance = this[name] = Application._instanceContainer[name] = this._instanceRegister(service);
        } else {
            instance = this[name] = Application._instanceContainer[name] = service;
        }
        let keys = name.split('.');
        let key = keys.length - 1;
        let tmp = [];
        tmp[keys[key]] = instance;
        while (key > 0) {
            key--;
            let tmp0 = [];
            tmp0[keys[key]] = tmp;
            tmp = tmp0;
        }
        if (this._registeredGlobal) {
            this.extend(Application._instanceContainer, tmp, keys.length - 1);
            extend(this._instances, Application._instanceContainer);
        } else {
            this.extend(this._instances, tmp, keys.length - 1);
        }

        extend(this, this._instances);
        return instance;
    }

    /**
     * @param {function} before
     * @param {function} after
     * */
    run (before = null, after = null) {
        this._instances = {};
        this.registerServiceProviders();
        this._registeredGlobal = false;
        before && before.call(this, this);
        after && after.call(this, this);
    }

    /**
     * @param {VueConstructor|function} create
     * @param {string|null} id
     * */
    createPage (mountComponent, create, id = null) {
        /**@type {AppAdapter}*/
        let adapter = new this._adapterClass(mountComponent, this._store, this._route, create, this, id);
        Application._pageContainer.push(adapter)
        return this;
    }

    currentPage () {
        /**@type {AppAdapter} adapter*/
        return Application._pageContainer.some((adapter) => {
            return adapter.isCurrentPage(this._currentRoute);
        })
    }

    mixins (mixins) {
        each(mixins, (m, k) => {
            this.mixin(k, m);
        });
        return this;
    }

    /**
     * @param {string} key
     * @param {Function} method
     * */
    mixin (key, method) {
        this._mixinMethods[key] = method;
        this[key] = method;
    }
}
