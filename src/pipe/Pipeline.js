import _ from 'underscore';
import {isClass} from "../utils/helpers";

export default class Pipeline {
    _container = null;
    _passable = null;
    _pipes = [];
    _method = 'handle';

    constructor (container) {
        this._container = container;
    }

    send (passable) {
        this._passable = passable;
        return this;
    }

    through (...pipes) {
        this._pipes = _.isArray(pipes) ? pipes : Array.from(arguments);
        return this;
    }

    via (method) {
        this._method = method;
        return this;
    }

    async then (destination) {
        let pipes = this._pipes.reverse();
        let pipeline = pipes.reduce(this._carry(), this._prepareDestination(destination));
        let result = _.isFunction(pipeline) ? await pipeline(this._passable) : await pipeline.then(f => f(this._passable));
        return result;
    }

    async thenReturn () {
        return await this.then((passable) => {
            return passable;
        });
    }

    _prepareDestination (destination) {
        return async (passable) => {
            return await destination(passable);
        }
    }

    _carry () {
        return async (stack, pipe) => {
            return async (passable) => {
                if (_.isFunction(pipe) && !isClass(pipe)) {
                    return await pipe(passable, stack);
                } else if (_.isString(pipe)) {
                    pipe = this._container[pipe];
                } else if(isClass(pipe)){
                    pipe = new pipe();
                }
                let result = typeof pipe[this._method] !== 'undefined' ? await pipe[this._method].apply(pipe, [passable, stack]) : null;
                return result;
            }
        }
    }
}
