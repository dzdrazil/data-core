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
            this.modelConstructor = _BaseModel2['default'];
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
define('data-core/BaseTableCollection', [
    'exports',
    'module',
    'data-core/BaseModel',
    'data-core/BaseCollection'
], function (exports, module, _BaseModel, _BaseCollection2) {
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
    var _get = function get(_x, _x2, _x3) {
        var _again = true;
        _function:
            while (_again) {
                var object = _x, property = _x2, receiver = _x3;
                desc = parent = getter = undefined;
                _again = false;
                var desc = Object.getOwnPropertyDescriptor(object, property);
                if (desc === undefined) {
                    var parent = Object.getPrototypeOf(object);
                    if (parent === null) {
                        return undefined;
                    } else {
                        _x = parent;
                        _x2 = property;
                        _x3 = receiver;
                        _again = true;
                        continue _function;
                    }
                } else if ('value' in desc) {
                    return desc.value;
                } else {
                    var getter = desc.get;
                    if (getter === undefined) {
                        return undefined;
                    }
                    return getter.call(receiver);
                }
            }
    };
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { 'default': obj };
    }
    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError('Cannot call a class as a function');
        }
    }
    function _inherits(subClass, superClass) {
        if (typeof superClass !== 'function' && superClass !== null) {
            throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
        }
        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass)
            subClass.__proto__ = superClass;
    }
    var _BaseModel2 = _interopRequireDefault(_BaseModel);
    var _BaseCollection3 = _interopRequireDefault(_BaseCollection2);
    var BaseTableCollection = function (_BaseCollection) {
        function BaseTableCollection() {
            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }
            _classCallCheck(this, BaseTableCollection);
            _get(Object.getPrototypeOf(BaseTableCollection.prototype), 'constructor', this).apply(this, args);
            this._models = {};
            this._modelIds = [];
            this.modelConstructor = _BaseModel2['default'];
        }
        _inherits(BaseTableCollection, _BaseCollection);
        _createClass(BaseTableCollection, [
            {
                key: 'length',
                get: function () {
                    return this._modelIds.length;
                }
            },
            {
                key: 'copy',
                value: function copy(data) {
                    if (data) {
                        return new this.constructor(data);
                    } else {
                        return new this.constructor(this.toArray());
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
                    this._models[model.id] = model;
                    this._modelIds.push(model.id);
                }
            },
            {
                key: 'at',
                value: function at(index) {
                    return this._modelIds[index];
                }
            },
            {
                key: 'get',
                value: function get(id) {
                    return this._models[id];
                }
            },
            {
                key: 'indexOf',
                value: function indexOf(id) {
                    var i = 0;
                    var len = this.length;
                    for (; i < len; i++) {
                        if (this._modelIds[i] === id) {
                            return i;
                        }
                    }
                    return -1;
                }
            },
            {
                key: 'getPage',
                value: function getPage(page, pageLength) {
                    var _this = this;
                    var startIndex = (page - 1) * pageLength;
                    var modelIds = this._modelIds.slice(startIndex, startIndex + pageLength);
                    return modelIds.map(function (id) {
                        return _this._models[id];
                    });
                }
            },
            {
                key: 'remove',
                value: function remove(idOrModel) {
                    var index = undefined;
                    if (idOrModel instanceof this.modelConstructor) {
                        index = this.indexOf(idOrModel.id);
                        delete this._models[idOrModel.id];
                    } else {
                        index = this.indexOf(idOrModel);
                        delete this._modles[idOrModel];
                    }
                    this._modelIds.splice(index, 1);
                }
            },
            {
                key: 'empty',
                value: function empty() {
                    this._modelIds.length = 0;
                    this._models = {};
                }
            },
            {
                key: 'forEach',
                value: function forEach(iterationFunction) {
                    var i = 0;
                    var len = this.length;
                    for (; i < len; i++) {
                        iterationFunction(this._models[this._modelIds[i]], i, this);
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
                        results.push(iterationFunction(this._models[this._modelIds[i]], i, this));
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
                        model = this._models[this._modelIds[i]];
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
                        runningSum = iterationFunction(this._models[this._modelIds[i]], runningSum);
                    }
                    return runningSum;
                }
            },
            {
                key: 'sort',
                value: function sort(iterationFunction) {
                    var _this2 = this;
                    this._modelIds.sort(function (aId, bId) {
                        return iterationFunction.call(null, _this2._models[aId], _this2._models[bId]);
                    });
                }
            },
            {
                key: 'toArray',
                value: function toArray() {
                    var _this3 = this;
                    return this._modelIds.map(function (id) {
                        return _this3._models[id];
                    });
                }
            }
        ]);
        return BaseTableCollection;
    }(_BaseCollection3['default']);
    module.exports = BaseTableCollection;
});
define('data-core', [
    'exports',
    'module',
    'data-core/BaseModel',
    'data-core/BaseCollection',
    'data-core/BaseTableCollection'
], function (exports, module, _dataCoreBaseModel, _dataCoreBaseCollection, _dataCoreBaseTableCollection) {
    'use strict';
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { 'default': obj };
    }
    var _BaseModel = _interopRequireDefault(_dataCoreBaseModel);
    var _BaseCollection = _interopRequireDefault(_dataCoreBaseCollection);
    var _BaseTableCollection = _interopRequireDefault(_dataCoreBaseTableCollection);
    module.exports = {
        BaseModel: _BaseModel['default'],
        BaseCollection: _BaseCollection['default'],
        BaseTableCollection: _BaseTableCollection['default']
    };
});