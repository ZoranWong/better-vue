import Command from "./NodeCommand";

export default class CreateMiddlewareCommand extends Command {
    async handle (dir, className) {
        this.mkdir(dir);
        this.mkFile(`${dir}/${className}.js`, this.template(className));
        return this._args;
    }

    template (className) {
        return `export default{
}
        `;
    }

    config () {

    }
}
