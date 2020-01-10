import ServiceProvider from "./ServiceProvider";
import Router from '../routes/Router';
export default class RouterServiceProvider extends ServiceProvider{
    register () {
        this.app.register('$$router', Router);
    }
}
