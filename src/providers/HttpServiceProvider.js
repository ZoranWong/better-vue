import ServiceProvider from "./ServiceProvider";
import HttpService from "../services/HttpService";

export default class HttpServiceProvider extends ServiceProvider {
    register () {
        this._app.register('$httpClient', ()=> new HttpService(this.app, this.app.httpAdapterClass, this.app.config('app.apiGateway')))
    }
    boot () {
        this._app.$httpClient.setValidator(this._app.$validator);
    }
}
