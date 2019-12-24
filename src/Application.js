import _ from 'underscore';

/**
 * 应用容器类型
 * */
export default class Application {
    _instances = {};
    _serviceProviders = [];
    _config = {};
    _exceptionHandlers = {};
    _env = {};
    _route = null;
    _multiplePage = false;
    _registeredGlobal = true;
    _current = null;
    _mountComponent = null;
    static _commandContainer = {};
    static _modelContainer = {};
    static _globalProviderRegistered = {};
    static _instanceContainer = {};
    static _pageContainer = {};

    constructor() {
    }

    needMock() {
        return this._config['app']['mock'];
    }

    registerCommand(name, command) {
        return Application._commandContainer[name] = command;
    }

    modelComputed(model, key) {
        if(_.isFunction(model[key])){

        }
    }


    registerModel(name, model) {
        let modelInstance = Application._modelContainer[name] = new model(this);
        modelInstance.alias = name;
        let computed = modelInstance.computed();
        if (typeof this[name] === 'undefined') {
            this.register(name, {
                dispatch(event, data) {
                    modelInstance.dispatch(event, data);
                }
            });
        }
        for (let key in computed) {
            Object.defineProperty(this[name], key, {
                readonly: true,
                enumerable: true,
                get() {
                    return '';
                    // return app['stores'][app.currentRoute].getters[name + '/' + key];
                }
            })
        }
    }

    async command(...params) {
        try {
            let command = params.shift();
            command = Application._commandContainer[command];
            command = new command(this);
            return await command.handle.apply(command, params);
        } catch (e) {
            return false;
        }
    }

    // 实例化注册对象
    _instanceRegister(instance) {
        if (_.isFunction(instance)) {
            instance = new instance(this);
        }
        return instance;
    }

    async loader (paths) {
        if (_.isString(paths)) {
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
    registerConfig(name, config) {
        this.register('config.' + name, config);
    }

    registerProvider(provider) {
        this._serviceProviders.push(new provider(this));
    }

    // 注册服务提供者
    registerServiceProviders() {
        if (!Application._globalProviderRegistered) {
            _.each(this._config['app']['providers'], async (value, key) => {
                let provider = value;
                if (_.isString(value)) {
                    provider = await this.loader(value);
                    provider = new provider(this);
                } else {
                    provider = new value(this);
                }
                this._serviceProviders[key] = provider;
                provider.register();
            });
            Application._globalProviderRegistered = true;
        }
    }

    boot() {
        _.each(this._serviceProviders, function (serviceProvider) {
            serviceProvider.boot();
        })
    }

    //注册异常函数
    registerException(name, exception) {
        this._exceptionHandlers[name] = exception;
    }

    // application扩展
    extend(dist, src, deep) {
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

    register(name, service = null) {
        let instance = null;
        if (!service && _.isFunction(name)) {
            instance = this[name] = Application._instanceContainer[name] = this._instanceRegister(name);
        } else if (name && _.isFunction(service)) {
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
        } else {
            this.extend(this._instances, tmp, keys.length - 1);
        }
        this._instances = _.extend(this._instances, Application._instanceContainer);
        _.extend(this, this._instances);
        return instance;
    }

    _addModels(models) {
    }

    run(before = null, after = null) {
        this._instances = {};
        this.registerServiceProviders();
        if (before) {
            this._registeredGlobal = false;
            before.call(this, this);
        }
        this._addModels(Application._modelContainer);
        if (this._multiplePage) {
            this._createPage(after);
        } else if (after) {
            after.call(this, this);
        }
    }

    _models() {
        return null;
    }

    _createPage(created) {
        if (this._route) {
            let wxRoute = this._config['routes'][this._route];
            let store = this['stores'][this._route] = this._models();
            this._mountComponent = _.extend({
                store: store,
                render: h => h(App),
                mounted: () => {
                }
            }, this._mountComponent);
            let mounted = this._mountComponent.mounted;
            let self = this;
            this._mountComponent.mounted = function () {
                mounted && mounted.call(this);
                self._current = this;
            }
            if (_.isFunction(created)) {
                created.call(this, this);
            }
            this._current.$mount();
            this._current['wxRoute'] = wxRoute;
            _.extend(this.currentPage, this._instances);
            _.each(this._instances, (instance) => {
                if (instance instanceof Service) {
                    instance['page'] = this._current;
                }
            });
            Application._pageContainer[wxRoute] = (this._current);
        }
        return this._current;
    }
}
