import Command from "./NodeCommand";

export default class CreateModelCommand extends Command{
    template (className, parent) {
        let importStr = (parent !== 'Model' && parent !== 'Collection') ?
            `import * as Model from '${parent}'` : `import {${parent}} from 'better-vue`;
        let pClass = (parent !== 'Model' && parent !== 'Collection') ? 'Model' : parent;
        return `${importStr}
export default class ${className} extends ${pClass} {
}
        `;
    }
}
