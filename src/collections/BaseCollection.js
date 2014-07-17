(function(NAMESPACE) {
    'use strict';

    function BaseCollection(dataArray) {
        this._models = [];

        if (dataArray) {
            this.addMany(dataArray);
        }
    }

    BaseCollection.prototype = {
        constructor: BaseCollection,

        modelConstructor: NAMESPACE.BaseModel,

        _models: null,

        get length() {
            return this._models.length;
        },

        copy: function(dataOrUndefined) {
            if (dataOrUndefined) {
                return new this.constructor(dataOrUndefined);
            } else {
                return new this.constructor(this._models);
            }
        },

        add: function(data) {
            var model;

            if (data instanceof this.modelConstructor) {
                model = data;
            } else {
                model = new this.modelConstructor(data);
            }

            this._models.push(model);
        },

        addMany: function(arrData) {
            var i = 0;
            var len = arrData.length;
            for(; i < len; i++) {
                this.add(arrData[i]);
            }
        },

        at: function(index) {
            return this._models[index];
        },

        get: function(id) {
            var i = 0;
            var len = this.length;

            for (; i < len; i++) {
                if (this._models[i].id === id) {
                    return this._models[i];
                }
            }

            return null;
        },

        indexOf: function(id) {
            var i = 0;
            var len = this.length;

            for (; i < len; i++) {
                if (this._models[i].id === id) {
                    return i;
                }
            }

            return -1;
        },

        getPage: function(page, pageLength) {
            var startIndex = (page - 1) * pageLength;
            return this._models.slice(startIndex, startIndex + pageLength);
        },

        remove: function(idOrModel) {
            var index;
            if (idOrModel instanceof this.modelConstructor) {
                index = this.indexOf(idOrModel.id);
            } else {
                index = this.indexOf(idOrModel);
            }

            this._models.splice(index, 1);
        },

        empty: function() {
            this._models.length = 0;
        },

        each: function(iterationFunction) {
            var i = 0;
            var len = this.length;

            for (; i < len; i++) {
                iterationFunction(this._models[i]);
            }
        },

        map: function(iterationFunction) {
            var results = [];
            var i = 0;
            var len = this.length;

            for (; i < len; i++) {
                results.push(iterationFunction(this._models[i]));
            }

            return results;
        },

        filter: function(iterationFunction) {
            var results = [];
            var i = 0;
            var len = this.length;
            var model;

            for (; i < len; i++) {
                model = this._models[i];
                if (iterationFunction(model)) {
                    results.push(model);
                }
            }

            return results;
        },

        reduce: function(iterationFunction, runningSum) {
            var i = 0;
            var len = this.length;

            for (; i < len; i++) {
                runningSum = iterationFunction(this._models[i], runningSum);
            }

            return runningSum;
        },

        sort: function(iterationFunction) {
            this._models.sort(iterationFunction);
        },

        toArray: function() {
            return this._models.slice(0, this.length - 1);
        },

        destroy: function() {
            this.empty();

            var key;

            for (key in this) {
                if (this.hasOwnProperty(key)) {
                    delete this[key];
                }
            }
        }
    };

    NAMESPACE.BaseCollection = BaseCollection;
})(DataCore);
