import Command from "./NodeCommand";

export default class CreateMiddlewareCommand extends Command{
    template (className) {
        return `import {Middleware} from 'better-vue';
export default class ${className} extends Middleware {
}
        `;
    }
}
