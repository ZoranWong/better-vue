import ServiceProvider from "./ServiceProvider";
import Vuex from 'vuex'
import Vue from 'vue';

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
    }
}
