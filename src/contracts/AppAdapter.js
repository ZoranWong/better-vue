import {ComponentOptions} from 'vue';
import Application from '../Application';
import Route from '../routes/Route';

export default class AppAdapter {
    /**@type {ComponentOptions}*/
    _mountComponent = null;
    /**@type {Application}*/
    _app = null;
    /**@type {Route}*/
    _route = null;

    constructor (component, application, route) {
        this._mountComponent = component;
        this._app = application;
        this._route = route;
    }

    isCurrentPage (route) {
        return this._route.current['name'] === route;
    }
}
