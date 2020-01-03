import ServiceProvider from "./ServiceProvider";
import HttpService from "../services/HttpService";

export default class HttpServiceProvider extends ServiceProvider {
    register () {
        this._app.register('$httpClient', ()=> new HttpService(this._app, this._app._httpAdapterClass, this._app._apiGateway))
    }
    boot () {
        this._app.$httpClient.setValidator(this._app.$validator);
    }
}
