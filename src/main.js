// better
import Application from "./Application";
import ModelServiceProvider from "./providers/ModelServiceProvider";
import HttpServiceProvider from "./providers/HttpServiceProvider";
import ServiceProvider from "./providers/ServiceProvider";
import Service from './services/Service';
import Model from './models/Model';
import Response from './responses/Response';
import FormRequest from './requests/FormRequest';
import Route from './routes/Route';
import Middleware from './middlewares/Middleware';
import ExceptionHandler from './exceptions/ExceptionHandler';
import Command from './commands/Command';
import Transformer from './transformers/Transformer';
import VueAppAdapter from "./adapters/VueAppAdapter";
import WXFlyioAdapter from './adapters/WXFlyioAdapter';
import AxiosAdapter from './adapters/AxiosAdapter';
import AppServiceProvider from "./providers/AppServiceProvider";
import ValidatorServiceProvider from "./providers/ValidatorServiceProvider";

const application = new Application();
application.registerProvider(ModelServiceProvider);
application.registerProvider(HttpServiceProvider);
application.registerProvider(AppServiceProvider);
application.registerProvider(ValidatorServiceProvider);

let command = async (name, ...params) => {
    return await application.command(name, ...params);
}
export {
    ServiceProvider,
    Service,
    Model,
    FormRequest,
    Response,
    Route,
    Middleware,
    ExceptionHandler,
    Command,
    Transformer,
    AxiosAdapter,
    WXFlyioAdapter,
    command
};
application.setAdapter(VueAppAdapter);

export default application;
