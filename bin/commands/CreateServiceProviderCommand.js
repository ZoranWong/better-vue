import Command from "./NodeCommand";

export default class CreateServiceProviderCommand extends Command{
    template (className, parent) {
        let importStr = parent ? `import * as ServiceProvider from '${parent}'` : "import {ServiceProvider} from 'better-vue";
        return `${importStr}
export default class ${className} extends ServiceProvider {
}
        `;
    }
}
