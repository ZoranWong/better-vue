import Command from "./NodeCommand";

export default class CreateModelCommand extends Command{
    template (className) {
        return `import {Model} from 'better-vue';
export default class ${className} extends Model {
}
        `;
    }
}
