import Command from "./NodeCommand";

export default class CreateRequestCommand extends Command{
    template (className, parent, method) {
        let importStr = parent ? `import * as Request from '${parent}'` : "import {FormRequest as Request} from 'better-vue";
        return `${importStr}
export default class ${className} extends Request {
    constructor(){
        super({}, ${className}.${method});
    }
}
        `;
    }
}
