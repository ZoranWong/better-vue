import Query from "./Query";
export default class Route {
    name = null;
    path = null;
    /**@type {Query} */
    query = null;
    params = null;

    constructor (name, path) {
        this.name = name;
        this.path = path;
    }
}
