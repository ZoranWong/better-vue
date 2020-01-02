import Request from '../requests/FormRequest';
import Application from '../Application';
import Store from 'vuex';

export default class Model {
    namespaced = true;
    modelName = '';
    state = {};
    getters = {};
    actions = {};
    mutations = {};
    /**@type {Request}*/
    _request = null;
    /**@type {Store}*/
    _store = null;
    /**@type {Application}*/
    static _app = null;

    constructor (app) {
        Model._app = app;
    }

    // 回调函数可以直接使用this指向注册model实例，回调函数接受两个参数一个payload结构体，一个model层的state
    // 对应vuex中的actions与mutations
    addEventListener (type, callback) {
        this.actions[type] = ({commit}, payload) => {
            commit(type, payload);
        };

        this.mutations[type] = (state, payload) => {
            // 回调函数可以直接使用this指向注册model实例，回调函数接受两个参数一个payload结构体，一个model层的state
            callback.call(this, payload, state);
        }
    }

    dispatch (key, value) {
        let payload = {};
        payload[key] = value;
        Model._app.$store.dispatch(`${this.modelName}/${key}`, payload);
    }

    isChildProperty (key) {
        if (key === 'state' || key === 'actions' || key === 'mutations' || key === 'getters'
            || key === 'dispatch' || key === 'isChildProperty' || key === 'getValue'
            || key === 'modelName' || key === 'namespaced' || key === '_request' || key === '_store') {
            return true;
        } else {
            return false;
        }
    }

    getValue (key) {
        return Model._app.$store.getters[`${this.modelName}/${key}`];
    }

    storeData () {
        return {
            namespaced: this.namespaced,
            state: this.state,
            getters: this.getters,
            actions: this.actions,
            mutations: this.mutations
        }
    }
}
