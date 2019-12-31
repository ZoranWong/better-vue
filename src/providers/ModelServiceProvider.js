import ServiceProvider from "./ServiceProvider";
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
export default class ModelServiceProvider extends ServiceProvider {
    register () {
        let model = {};
        let app = this._app;
        this._app.register('$model', new Proxy(model, {
            get (target, p) {
                if (typeof target[p] === 'undefined') {
                    app.registerModel(p, app._config['models'][p]);
                }
                return app._instances['$model'][p];
            }
        }));
        this._app.register('$store', new Vuex.Store({
            modules: {}
        }));
    }
}
