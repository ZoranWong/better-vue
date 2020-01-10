import {Query} from "miniprogram-api-typings/types/wx/lib.wx.cloud";

export default class Route {
    name = null;
    path = null;
    query = null;
    params = null;

    constructor (name, path) {
        this.name = name;
        this.path = path;
    }
}
