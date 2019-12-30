import ServiceProvider from "./ServiceProvider";
import HttpService from "../services/HttpService";
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios);
export default class HttpServiceProvider extends ServiceProvider {
    register () {
        this._app.register('$httpClient', ()=> new HttpService(this._app, Vue.axois, this._app._apiGateway))
    }
}
