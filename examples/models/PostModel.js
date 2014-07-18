'use strict';

var BaseModel = require('../../dist/data-core').BaseModel;

function PostModel(data) {
    BaseModel.call(this, data);
}

PostModel.prototype = new BaseModel();

PostModel.prototype.constructor = PostModel;

PostModel.prototype.id = 0;

PostModel.prototype.text = '';

PostModel.prototype.createdDate = null;

module.exports = PostModel;
