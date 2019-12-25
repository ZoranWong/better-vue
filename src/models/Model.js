export default class Model {
    state = {};
    getters = {};
    actions = {};
    mutations = {};

    constructor () {
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

    isChildProperty (key) {
        if (key !== 'state' && key !== 'actions' && key !== 'mutations' && key !== 'getters') {
            return true;
        }else{
            return false;
        }
    }
}
