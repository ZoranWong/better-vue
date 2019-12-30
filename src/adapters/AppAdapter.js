import {ComponentOptions} from 'vue';
export default class AppAdapter {
    /**@type {ComponentOptions}*/
    _mountComponent = null;

    constructor(component) {
        this._mountComponent = component;
    }
}