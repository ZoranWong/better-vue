import AppAdapter from "../contracts/AppAdapter";
import {ComponentOptions} from 'vue';
import Vue from 'vue';
import {Store} from 'vuex';
import {extend} from 'underscore';
import Route from '../routes/Route';
import Application from '../Application';
import Vuex from "vuex";
Vue.use(Vuex);
export default class VueAppAdapter extends AppAdapter {
    /**@type {Vue}*/
    _page = null;

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
     * @param {Route} route
     * @param {function(component){}} vue
     * @param {Application} application
     * @param {string|null} id
     * */
    constructor (component, store, route, vue, application, id = null) {
        super(component, application, route);
        this.mixin(application._instances);
        this.mixin({methods: application._mixinMethods});
        this._created = this._mountComponent.created;
        this._mounted = this._mountComponent.mounted;
        this._beforeMount = this._mountComponent.beforeMount;
        this._beforeCreate = this._mountComponent.beforeCreate;
        this._updated = this._mountComponent.updated;
        this._beforeUpdate = this._mountComponent.beforeUpdate;
        this._beforeDestroy = this._mountComponent.beforeDestroy;
        this._destroyed = this._mountComponent.destroyed;
        this._mountComponent = this.rebuildComponent();
        store = new Store(store);
        Vue.prototype.$store = application.$store = store;
        this._page = vue({
            ...this.rebuildComponent(store)
        });
        if (id) {
            this._page.$mount(id);
        } else {
            this._page.$mount();
        }

        this._page['$adapter'] = this;
        extend(this._page, application._instances);
    }

    rebuildComponent (store) {
        let adapter = this;
        return extend(this._mountComponent, {
            store,
            beforeCreate () {
                console.log('xxx ============');
                adapter.beforeCreate();
            },
            created () {
                console.log('-----------', this);
                adapter.created(this);
            },
            beforeMount () {
                adapter.beforeMount(this);
            },
            mounted () {
                console.log('xxx', this);
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
        this._beforeMount && this._beforeMount.call(vue);
    }

    mounted (vue) {
        this._mounted && this._mounted.call(vue);
    }

    beforeCreate () {
        this._beforeCreate && this._beforeCreate.call();
    }

    created (vue) {
        this._page = vue;
        this._created && this._created.call(vue);
    }

    beforeUpdate (vue) {
        this._beforeUpdate && this._beforeUpdate.call(vue);
    }

    updated (vue) {
        this._updated && this._updated.call(vue);
    }

    beforeDestroy (vue) {
        this._beforeDestroy && this.beforeDestroy.call(vue)
    }

    destroyed (vue) {
        this._destroyed && this._destroyed.call(vue);
    }

    mixin (mixins) {
        extend(Vue.prototype, mixins);
    }
}
