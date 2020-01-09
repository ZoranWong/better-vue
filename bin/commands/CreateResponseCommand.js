import Command from "./NodeCommand";

export default class CreateResponseCommand extends Command{
    template (className, parent) {
        let importStr = parent ? `import * as Response from '${parent}'` : "import {Response} from 'better-vue";
        return `${importStr}
export default class ${className} extends Response {
    constructor(status, headers, body) {
		super(status, headers, body);
		this._parse();
	}
	_parse() {
	}
}
        `;
    }
}
