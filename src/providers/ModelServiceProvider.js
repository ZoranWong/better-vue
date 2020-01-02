import ServiceProvider from "./ServiceProvider";
import Vue from 'vue';
import Vuex from 'vuex';

export default class ModelServiceProvider extends ServiceProvider {
    register () {
        let model = {};
        let app = this._app;
        this._app.register('$model', new Proxy(model, {
            get (target, p) {
                if (typeof target[p] === 'undefined') {
                    app.registerModel(p, app._config['models'][p]);
                }
                return target[p];
            }
        }));
        let store = {
            modules: {
            }
        };
        this._app.register('$modules', store);
    }
}
