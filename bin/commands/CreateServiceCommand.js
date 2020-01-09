import Command from "./NodeCommand";

export default class CreateServiceCommand extends Command {
    constructor (application) {
        super(application);
    }

    /**
     * @param {string} dir
     * @param {string} className
     * */
    async handle (dir, className) {
        this.mkdir(dir);
        this.mkFile(`${dir}/${className}.js`, this.template(className));
        return this._args;
    }

    template (className, parent) {
        let importStr = parent ? `import * as Service from '${parent}'` : "import {Service} from 'better-vue";
        return `${importStr}
export default class ${className} extends Service {
}
        `;
    }
}
