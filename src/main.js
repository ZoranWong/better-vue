// better
import Application from "./Application";
import ModelServiceProvider from "./providers/ModelServiceProvider";
import HttpServiceProvider from "./providers/HttpServiceProvider";
const application = new Application();
application.registerProvider(ModelServiceProvider);
application.registerProvider(HttpServiceProvider);
export default application;
