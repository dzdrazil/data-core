define('data-core/BaseModel', [
    'exports',
    'module'
], function (exports, module) {
    'use strict';
    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ('value' in descriptor)
                    descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }
        return function (Constructor, protoProps, staticProps) {
            if (protoProps)
                defineProperties(Constructor.prototype, protoProps);
            if (staticProps)
                defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();
    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError('Cannot call a class as a function');
        }
    }
    var BaseModel = function () {
        function BaseModel(data) {
            _classCallCheck(this, BaseModel);
            for (var key in data) {
                if (data.hasOwnProperty(key)) {
                    this[key] = data[key];
                }
            }
        }
        _createClass(BaseModel, [{
                key: 'destroy',
                value: function destroy() {
                    for (var key in this) {
                        if (this.hasOwnProperty(key)) {
                            delete this[key];
                        }
                    }
                }
            }]);
        return BaseModel;
    }();
    module.exports = BaseModel;
});
define('data-core/BaseCollection', [
    'exports',
    'module',
    'data-core/BaseModel'
], function (exports, module, _BaseModel) {
    'use strict';
    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ('value' in descriptor)
                    descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }
        return function (Constructor, protoProps, staticProps) {
            if (protoProps)
                defineProperties(Constructor.prototype, protoProps);
            if (staticProps)
                defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { 'default': obj };
    }
    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError('Cannot call a class as a function');
        }
    }
    var _BaseModel2 = _interopRequireDefault(_BaseModel);
    var BaseCollection = function () {
        function BaseCollection(data) {
            _classCallCheck(this, BaseCollection);
            this._models = [];
            this._modelConstructor = _BaseModel2['default'];
            if (data) {
                this.addMany(data);
            }
        }
        _createClass(BaseCollection, [
            {
                key: 'length',
                get: function () {
                    return this._models.length;
                }
            },
            {
                key: 'copy',
                value: function copy(data) {
                    if (data) {
                        return new this.constructor(data);
                    } else {
                        return new this.constructor(this._models);
                    }
                }
            },
            {
                key: 'add',
                value: function add(data) {
                    var model = undefined;
                    if (data instanceof this.modelConstructor) {
                        model = data;
                    } else {
                        model = new this.modelConstructor(data);
                    }
                    this._models.push(model);
                }
            },
            {
                key: 'addMany',
                value: function addMany(arrData) {
                    var i = 0;
                    var len = arrData.length;
                    for (; i < len; i++) {
                        this.add(arrData[i]);
                    }
                }
            },
            {
                key: 'at',
                value: function at(index) {
                    return this._models[index];
                }
            },
            {
                key: 'get',
                value: function get(id) {
                    var i = 0;
                    var len = this.length;
                    for (; i < len; i++) {
                        if (this._models[i].id === id) {
                            return this._models[i];
                        }
                    }
                    return null;
                }
            },
            {
                key: 'indexOf',
                value: function indexOf(id) {
                    var i = 0;
                    var len = this.length;
                    for (; i < len; i++) {
                        if (this._models[i].id === id) {
                            return i;
                        }
                    }
                    return -1;
                }
            },
            {
                key: 'getPage',
                value: function getPage(page, pageLength) {
                    var startIndex = (page - 1) * pageLength;
                    return this._models.slice(startIndex, startIndex + pageLength);
                }
            },
            {
                key: 'remove',
                value: function remove(idOrModel) {
                    var index = undefined;
                    if (idOrModel instanceof this.modelConstructor) {
                        index = this.indexOf(idOrModel.id);
                    } else {
                        index = this.indexOf(idOrModel);
                    }
                    this._models.splice(index, 1);
                }
            },
            {
                key: 'empty',
                value: function empty() {
                    this._models.length = 0;
                }
            },
            {
                key: 'forEach',
                value: function forEach(iterationFunction) {
                    var i = 0;
                    var len = this.length;
                    for (; i < len; i++) {
                        iterationFunction(this._models[i]);
                    }
                }
            },
            {
                key: 'map',
                value: function map(iterationFunction) {
                    var results = [];
                    var i = 0;
                    var len = this.length;
                    for (; i < len; i++) {
                        results.push(iterationFunction(this._models[i]));
                    }
                    return results;
                }
            },
            {
                key: 'filter',
                value: function filter(iterationFunction) {
                    var results = [];
                    var i = 0;
                    var len = this.length;
                    var model = undefined;
                    for (; i < len; i++) {
                        model = this._models[i];
                        if (iterationFunction(model)) {
                            results.push(model);
                        }
                    }
                    return results;
                }
            },
            {
                key: 'reduce',
                value: function reduce(iterationFunction, runningSum) {
                    var i = 0;
                    var len = this.length;
                    for (; i < len; i++) {
                        runningSum = iterationFunction(this._models[i], runningSum);
                    }
                    return runningSum;
                }
            },
            {
                key: 'sort',
                value: function sort(iterationFunction) {
                    this._models.sort(iterationFunction);
                }
            },
            {
                key: 'toArray',
                value: function toArray() {
                    return this._models.slice();
                }
            },
            {
                key: 'destroy',
                value: function destroy() {
                    this.empty();
                    var key = undefined;
                    for (key in this) {
                        if (this.hasOwnProperty(key)) {
                            delete this[key];
                        }
                    }
                }
            }
        ]);
        return BaseCollection;
    }();
    module.exports = BaseCollection;
});
define('data-core', [
    'exports',
    'module',
    'data-core/BaseModel',
    'data-core/BaseCollection'
], function (exports, module, _dataCoreBaseModel, _dataCoreBaseCollection) {
    'use strict';
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { 'default': obj };
    }
    var _BaseModel = _interopRequireDefault(_dataCoreBaseModel);
    var _BaseCollection = _interopRequireDefault(_dataCoreBaseCollection);
    module.exports = {
        BaseModel: _BaseModel['default'],
        BaseCollection: _BaseCollection['default']
    };
});