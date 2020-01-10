import {each} from 'underscore';
import Route from "./Route";

export default class Router {
    /**@type {Route} current*/
    _current = null;
    /**@type {Object.<string, Object.<string, any>>} _routes*/
    _routes = {};

    /**
     * @param {[Object.<string, any>]} routes
     * */
    constructor (routes = []) {
        each(routes, (route) => {
            this.addRoute(route);
        });
    }

    /**
     * @param {Object.<string, any>} route
     * */
    addRoute (route) {
        this._routes[route['name']] = route;
    }

    find (name) {
        let route = this._routes[name];
        return route;
    }

    get currentRoute () {
        return this._current;
    }

    set currentRoute (route) {
        this._current = route;
        return route;
    }
}
