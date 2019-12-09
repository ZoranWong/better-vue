import _ from 'underscore';
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

    then (destination) {
        let pipeline;
    }

    thenReturn () {
        return this.then((passable) => {
            return passable;
        });
    }

    _prepareDestination (destination) {
        return (passable) => {
            return destination(passable);
        }
    }

    _carry () {
        return (stack, pipe) => {
            return (passable) => {
                if (_.isFunction(pipe)) {
                    return pipe(passable, stack);
                } else if (_.isString(pipe)) {
                    pipe = this._container[pipe];
                } else {
                    pipe = new pipe();
                }
                return pipe.hasOwnProperty(this._method) ? pipe[this._method](passable, stack) : null;
            }
        }
    }
}
