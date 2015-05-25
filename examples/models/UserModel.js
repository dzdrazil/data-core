'use strict';

var BaseModel = require('../../dist/data-core').BaseModel;

var PostCollection = require('../collections/PostCollection');

function UserModel(data) {
    BaseModel.call(this, data);

    this.postCollection = new PostCollection(data.posts);
}

UserModel.prototype = new BaseModel();

UserModel.prototype.constructor = UserModel;

UserModel.prototype.username = '';

UserModel.prototype.postCollection = null;

module.exports = UserModel;
