import {each, isArray, isString} from "underscore";
import Collection from "../models/Collection";

const toString = Function.prototype.toString

function fnBody(fn) {
    return toString.call(fn).replace(/^[^{]*{\s*/, '').replace(/\s*}[^}]*$/, '')
}

export function isClass(fn) {
    if (typeof fn !== 'function') {
        return false
    }
    if (/^class[\s{]/.test(toString.call(fn))) {
        return true
    }
    // babel.js classCallCheck() & inlined
    const body = fnBody(fn)
    return (/classCallCheck\(/.test(body) || /TypeError\("Cannot call a class as a function"\)/.test(body))
}

/**
 * @param {Collection} modelInstance
 * @return {Proxy|Collection}
 * */
export function collectionProxy(modelInstance) {
    let properties = {'pageCount': '_pageCount', 'page': '_page', 'limit': '_limit'};
    return new Proxy(modelInstance, {
        get(collection, p) {
            if (typeof p === 'number') {
                let start = collection._limit * p;
                let end = collection._limit * (p + 1) - 1;
                let list = collection.get('_list').slice(start, end);
                return new Proxy(list, {
                    get(target, p) {
                        if (typeof p === 'number') {
                            return target[p];
                        }
                    },
                    set(target, p, value) {
                        target[start + p] = value;
                        modelInstance.dispatch('_list', list);
                    }
                });
            } else if (isString(p)) {
                let property = properties[p];
                if (typeof property !== 'undefined') {
                    return collection.get(property);
                }
            }
        },
        set(collection, p, value) {
            if (typeof p === 'number') {
                let start = collection._limit * p;
                let list = collection._list;
                if (isArray(value)) {
                    each(value, (v, i) => {
                        list[start + i] = v;
                    });
                    modelInstance.dispatch('_list', list);
                }
            } else if (isString(p)) {
                let property = properties[p];
                if (typeof property !== 'undefined') {
                    modelInstance.dispatch(property, value);
                }
            }
        }
    });
}
