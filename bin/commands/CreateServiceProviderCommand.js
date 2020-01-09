import Command from "./NodeCommand";

export default class CreateServiceProviderCommand extends Command{
    template (className) {
        return `import {ServiceProvider} from 'better-vue';
export default class ${className} extends ServiceProvider {
}
        `;
    }
}
