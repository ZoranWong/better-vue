import Command from "./NodeCommand";

export default class CreateMiddlewareCommand extends Command {
    template (className) {
        return `export default{
}
        `;
    }
}
