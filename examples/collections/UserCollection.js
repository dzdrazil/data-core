'use strict';

var BaseCollection = require('../../dist/data-core').BaseCollection;
var UserModel = require('../models/UserModel');

function UserCollection(data) {
    BaseCollection.call(this, data);
}

UserCollection.prototype = new BaseCollection();

UserCollection.prototype.constructor = UserCollection;

UserCollection.prototype.modelConstructor = UserModel;

module.exports = UserCollection;
