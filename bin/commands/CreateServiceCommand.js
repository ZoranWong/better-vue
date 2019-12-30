import Command from "./NodeCommand";
export default class CreateServiceCommand extends Command {
    constructor(application){
        super(application);
    }
    /**
     * @param {string} dir
     * @param {string} className
     * */
    async handle(dir, className) {
        this.mkdir(dir);

        return this._args;
    }
}