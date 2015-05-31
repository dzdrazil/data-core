'use strict';

import BaseModel from './BaseModel';
import BaseCollection from './BaseCollection';

export default class BaseTableCollection extends BaseCollection {
    /**
     * @todo Use class properties instead of in the constructor- Babel currently transpiles
     *       them at the end of the derived constructor, but they're needed prior to the invokation
     *       of the parent constructor.
     */
    // _models = {};

    // _modelIds = [];

    modelConstructor = BaseModel;

    get length() {
        return this._modelIds.length;
    }

    constructor(data) {
        super();

        this._models = {};
        this._modelIds = [];

        if (data) {
            this.addMany(data);
        }
    }

    copy(data) {
        if (data) {
            return new this.constructor(data);
        } else {
            return new this.constructor(this.toArray());
        }
    }

    add(data) {
        let model;
        if (data instanceof this.modelConstructor) {
            model = data;
        } else {
            model = new this.modelConstructor(data);
        }

        this._models[model.id] = model;
        this._modelIds.push(model.id);
    }

    at(index) {
        return this._models[this._modelIds[index]];
    }

    get(id) {
        return this._models[id];
    }

    indexOf(id) {
        let i = 0;
        let len = this.length;

        for (; i < len; i++) {
            if (this._modelIds[i] === id) {
                return i;
            }
        }

        return -1;
    }

    getPage(page, pageLength) {
        let startIndex = (page - 1) * pageLength;
        let modelIds = this._modelIds.slice(startIndex, startIndex + pageLength);

        return modelIds.map(id => this._models[id]);
    }

    remove(idOrModel) {
        let index;
        if (idOrModel instanceof this.modelConstructor) {
            index = this.indexOf(idOrModel.id);
            delete this._models[idOrModel.id];
        } else {
            index = this.indexOf(idOrModel);
            delete this._models[idOrModel];
        }

        this._modelIds.splice(index, 1);
    }

    empty() {
        this._modelIds.length = 0;
        this._models = {};
    }

    forEach(iterationFunction) {
        let i = 0;
        let len = this.length;

        for (; i < len; i++) {
            iterationFunction(this._models[this._modelIds[i]], i, this);
        }
    }

    map(iterationFunction) {
        let results = [];
        let i = 0;
        let len = this.length;

        for (; i < len; i++) {
            results.push(iterationFunction(this._models[this._modelIds[i]], i, this));
        }

        return results;
    }

    filter(iterationFunction) {
        let results = [];
        let i = 0;
        let len = this.length;
        let model;

        for (; i < len; i++) {
            model = this._models[this._modelIds[i]];
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
            runningSum = iterationFunction(this._models[this._modelIds[i]], runningSum);
        }

        return runningSum;
    }

    sort(iterationFunction) {
        this._modelIds.sort((aId, bId) =>
            iterationFunction.call(null, this._models[aId], this._models[bId]));
    }

    toArray() {
        return this._modelIds.map(id => this._models[id]);
    }
}
