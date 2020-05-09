import AppAdapter from "../contracts/AppAdapter";
import {ComponentOptions} from 'vue';
import Vue from 'vue';
import {Store} from 'vuex';
import {extend,isArray} from 'underscore';
import Router from '../routes/Router';
import Application from '../Application';
import Vuex from "vuex";
Vue.use(Vuex);
export default class VueAppAdapter extends AppAdapter {


    /**@type {Function}*/
    _mounted = null;
    /**@type {Function}*/
    _created = null;
    /**@type {Function}*/
    _updated = null;
    /**@type {Function}*/
    _destroyed = null;
    /**@type {Function}*/
    _beforeCreate = null;
    /**@type {Function}*/
    _beforeUpdate = null;
    /**@type {Function}*/
    _beforeMount = null;
    /**@type {Function}*/
    _beforeDestroy = null;


    /**
     * @param {ComponentOptions} component
     * @param {Store} store
     * @param {Router} route
     * @param {function(component){}} vue
     * @param {Application} application
     * */
    constructor (component, store, route, vue, application) {
        super(component, application, route);
        this.mixin(application._instances);
        this.mixin(application._mixinMethods);
        this._created = this._mountComponent.created;
        this._mounted = this._mountComponent.mounted;
        this._beforeMount = this._mountComponent.beforeMount;
        this._beforeCreate = this._mountComponent.beforeCreate;
        this._updated = this._mountComponent.updated;
        this._beforeUpdate = this._mountComponent.beforeUpdate;
        this._beforeDestroy = this._mountComponent.beforeDestroy;
        this._destroyed = this._mountComponent.destroyed;
        this._mountComponent = this.rebuildComponent(store);
        store = new Store(store);
        Vue.prototype.$store = application.$store = store;
        this._page = vue({
            ...this._mountComponent
        });
        this._page['$adapter'] = this;
        extend(this._page, application._instances);
    }

    rebuildComponent (store) {
        let adapter = this;
        return extend({store, ...this._mountComponent}, {
            beforeCreate () {
                adapter.beforeCreate();
            },
            created () {
                adapter.created(this);
            },
            beforeMount () {
                adapter.beforeMount(this);
            },
            mounted () {
                adapter.mounted(this);
            },
            beforeUpdate () {
                adapter.beforeUpdate(this);
            },
            updated () {
                adapter.updated(this);
            },
            beforeDestroy () {
                adapter.beforeDestroy(this);
            },
            destroyed () {
                adapter.destroyed(this);
            }
        });
    }

    beforeMount (vue) {
		if(!isArray(this._beforeMount)) {
			this._beforeMount = [this._beforeMount];
		}
		this._beforeMount.forEach((callback) => {
			callback && callback.call(this._page)
		})
    }

    mounted (vue) {
		if(!isArray(this._mounted)) {
			this._mounted = [this._mounted];
		}
		this._mounted.forEach((callback) => {
			callback && callback.call(this._page)
		})
    }

    beforeCreate () {
        if(!isArray(this._beforeCreate)) {
			this._beforeCreate = [this._beforeCreate];
		}
		this._beforeCreate.forEach((callback) => {
			callback && callback.call(this._page)
		})
    }

    created (vue) {
        this._page = vue;
		if(!isArray(this._created)) {
			this._created = [this._created];
		}
		this._created.forEach((callback) => {
			callback && callback.call(this._page)
		})
    }

    beforeUpdate (vue) {
		if(!isArray(this._beforeUpdate)) {
			this._beforeUpdate = [this._beforeUpdate];
		}
		this._beforeUpdate.forEach((callback) => {
			callback && callback.call(this._page)
		})
    }

    updated (vue) {
		if(!isArray(this._updated)) {
			this._updated = [this._updated];
		}
		this._updated.forEach((callback) => {
			callback && callback.call(this._page)
		})
    }

    beforeDestroy (vue) {
		if(!isArray(this._beforeDestroy)) {
			this._beforeDestroy = [this._beforeDestroy];
		}
		this._beforeDestroy.forEach((callback) => {
			callback && callback.call(this._page)
		})
    }

    destroyed (vue) {
		if(!isArray(this._destroyed)) {
			this._destroyed = [this._destroyed];
		}
		this._destroyed.forEach((callback) => {
			callback && callback.call(this._page)
		})
    }

    mixin (mixins) {
        extend(Vue.prototype, mixins);
    }
}
