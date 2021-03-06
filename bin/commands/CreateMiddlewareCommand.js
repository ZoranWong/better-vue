import Command from "./NodeCommand";

export default class CreateMiddlewareCommand extends Command{
    template (className, parent) {
        let importStr = parent ? `import * as Middleware from '${parent}'` : "import {Middleware} from 'better-vue";
        return `${importStr}
export default class ${className} extends Middleware {
}
        `;
    }
}
