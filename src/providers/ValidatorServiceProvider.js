import ServiceProvider from './ServiceProvider';
import Validator from "../validators/Validator";
export default class ValidatorServiceProvider extends ServiceProvider{
    register () {
        this._app.register('$validator', new Validator(this._app));
    }
}
