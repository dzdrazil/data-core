'use strict';

var BaseCollection = require('../../dist/data-core').BaseCollection;
var PostModel = require('../models/PostModel');

function PostCollection(data) {
    BaseCollection.call(this, data);
}

PostCollection.prototype = new BaseCollection();

PostCollection.prototype.constructor = PostCollection;

PostCollection.prototype.modelConstructor = PostModel;

module.exports = PostCollection;
