import _ from 'underscore';

export default class Route {
    route = [];
    parent = null;
    current = null;
    tag = null;
    static routeMap = {};
    constructor () {
    }

    static addRoute (route, component = [], name = null) {
        if (_.isArray(component) || _.isObject(component)) {
            route = _.extend(component, {
                path: route
            });
        } else if (_.isString(component)) {
            route = {
                path: route,
                component: component
            };
            if (name) {
                route['name'] = name;
            }
        }
        let self = new Route();
        self.tag = route['name'];
        route['parent'] = self.parent;
        Route.routeMap[route['name']] = route;
        self.route.push(route);
    }

    static group (route, callback) {
        let children = new Route();
        let self = new Route();
        children.parent = self;
        let group = callback;
        if (!callback instanceof Function) {
            callback = group['uses'];
        }
        let $route = {
            path: route
        };
        this.current = $route;
        if (typeof group['name'] !== 'undefined') {
            $route['name'] = group['name'];
        }
        if (typeof group['component'] !== 'undefined') {
            $route['component'] = group['component'];
        }
        if (typeof group['tag'] !== 'undefined') {
            $route['tag'] = group['tag'];
        }
        self.tag = $route['tag'];
        Route.routeMap[$route['name']] = $route;
        self.route.push($route);
        callback(children);
        let list = children.getRoute();
        $route['children'] = list;
    }

    getRoute () {
        return this.route;
    }
}
