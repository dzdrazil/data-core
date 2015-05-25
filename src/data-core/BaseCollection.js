'use strict';

import BaseModel from './BaseModel';

export default class BaseCollection {
    _models = [];

    _modelConstructor = BaseModel;

    constructor(data) {
        if (data) {
            this.addMany(data);
        }
    }

    get length() {
        return this._models.length;
    }

    copy(data) {
        if (data) {
            return new this.constructor(data);
        } else {
            return new this.constructor(this._models);
        }
    }

    add(data) {
        let model;

        if (data instanceof this.modelConstructor) {
            model = data;
        } else {
            model = new this.modelConstructor(data);
        }

        this._models.push(model);
    }

    addMany(arrData) {
        let i = 0;
        let len = arrData.length;
        for(; i < len; i++) {
            this.add(arrData[i]);
        }
    }

    at(index) {
        return this._models[index];
    }

    get(id) {
        let i = 0;
        let len = this.length;

        for (; i < len; i++) {
            if (this._models[i].id === id) {
                return this._models[i];
            }
        }

        return null;
    }

    indexOf(id) {
        let i = 0;
        let len = this.length;

        for (; i < len; i++) {
            if (this._models[i].id === id) {
                return i;
            }
        }

        return -1;
    }

    getPage(page, pageLength) {
        let startIndex = (page - 1) * pageLength;
        return this._models.slice(startIndex, startIndex + pageLength);
    }

    remove(idOrModel) {
        let index;
        if (idOrModel instanceof this.modelConstructor) {
            index = this.indexOf(idOrModel.id);
        } else {
            index = this.indexOf(idOrModel);
        }

        this._models.splice(index, 1);
    }

    empty() {
        this._models.length = 0;
    }

    forEach(iterationFunction) {
        let i = 0;
        let len = this.length;

        for (; i < len; i++) {
            iterationFunction(this._models[i]);
        }
    }

    map(iterationFunction) {
        let results = [];
        let i = 0;
        let len = this.length;

        for (; i < len; i++) {
            results.push(iterationFunction(this._models[i]));
        }

        return results;
    }

    filter(iterationFunction) {
        let results = [];
        let i = 0;
        let len = this.length;
        let model;

        for (; i < len; i++) {
            model = this._models[i];
            if (iterationFunction(model)) {
                results.push(model);
            }
        }

        return results;
    }

    reduce(iterationFunction, runningSum) {
        let i = 0;
        let len = this.length;

        for (; i < len; i++) {
            runningSum = iterationFunction(this._models[i], runningSum);
        }

        return runningSum;
    }

    sort(iterationFunction) {
        this._models.sort(iterationFunction);
    }

    toArray() {
        return this._models.slice();
    }

    destroy() {
        this.empty();

        let key;

        for (key in this) {
            if (this.hasOwnProperty(key)) {
                delete this[key];
            }
        }
    }
}
