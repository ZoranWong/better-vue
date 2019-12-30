import Request from '../requests/FormRequest';
import Store from 'vuex';
export default class Model {
    modelName = '';
    state = {};
    getters = {};
    actions = {};
    mutations = {};
    /**@type {Request}*/
    _request = null;
    /**@type {Store}*/
    _store = null;
    constructor(request) {
        this._request = request;
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
        if (key !== 'state' && key !== 'actions' && key !== 'mutations' && key !== 'getters') {
            return true;
        } else {
            return false;
        }
    }

    get(key) {
        return this._store.getters[`${this.modelName}/${key}`];
    }
}
