import Model from "./Model";

export default class Collection extends Model {
    /**@type {Model}*/
    _model = null;
    /**@type {[[]]}*/
    _list = [];
    /**@type {int}*/
    _page = 0;
    /**@type {int}*/
    _limit = 10;
    _pageCount = 0;
    constructor(request, model = null, page = 1, limit = 10) {
        super(request);
        this._limit = limit;
        this._page = page;
        this._model = model;
    }
}