import Request from '../requests/FormRequest';
import Application from '../Application';
import Store from 'vuex';
export default class Model {
    namespace = true;
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
    constructor(app) {
        Model._app = app;
    }

    // 回调函数可以直接使用this指向注册model实例，回调函数接受两个参数一个payload结构体，一个model层的state
    // 对应vuex中的actions与mutations
    addEventListener(type, callback) {
        this.actions[type] = ({commit}, payload) => {
            commit(type, payload);
        };

        this.mutations[type] = (state, payload) => {
            // 回调函数可以直接使用this指向注册model实例，回调函数接受两个参数一个payload结构体，一个model层的state
            callback.call(this, payload, state);
        }
    }

    dispatch(key, value) {
    }

    isChildProperty(key) {
        if (key === 'state' || key === 'actions' || key === 'mutations' || key === 'getters'
            || key === 'dispatch' || key === 'isChildProperty' || key === 'getValue'
            || key === 'modelName' || key === 'namespace' || key === '_request' || key === '_store') {
            return true;
        } else {
            return false;
        }
    }

    getValue(key) {
        console.log(Model._app.$store);
        return Model._app.$store.state[this.modelName][key];
    }
}
