import {ComponentOptions} from 'vue';
import Application from '../Application';
import Route from '../routes/Route';
import Vue from 'vue';

export default class AppAdapter {
    /**@type {ComponentOptions}*/
    _mountComponent = null;
    /**@type {Application}*/
    _app = null;
    /**@type {Route}*/
    _route = null;
    /**@type {Vue}*/
    _page = null;

    constructor (component, application, route) {
        this._mountComponent = component;
        this._app = application;
        this._route = route;
    }

    isCurrentPage (route) {
        return this._route.current['name'] === route;
    }

    $mount (id = null) {
        this._page.$mount(id);
    }
}
