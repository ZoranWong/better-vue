export default class Middleware {
    constructor () {
    }

    async handle (request, next) {
        return await next(request);
    }
}
