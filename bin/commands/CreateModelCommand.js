import Command from "./NodeCommand";

export default class CreateModelCommand extends Command{
    _options = {
        dir: {
            desc: '',
            default: ''
        }
    };
}