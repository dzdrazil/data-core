'use strict';

var assert = require('assert');

module.exports = function(Core) {
    function TestModel(data) {
        Core.BaseModel.call(this, data);
    }

    TestModel.prototype = new Core.BaseModel();

    TestModel.prototype.propA = '';

    TestModel.prototype.propB = -1;

    var t = new TestModel({
        id: 10,
        propA: 'test',
        propB: 100
    });

    assert.equal(t.id, 10, 'Model ID sets');
    assert.equal(t.propA, 'test', 'Model prop sets');
    assert.equal(t.propB, 100, 'Model prop sets');

    t.destroy();

    assert.ok(!t.hasOwnProperty('id'), 'ID removed on destroy');
    assert.ok(!t.hasOwnProperty('propA'), 'propA removed on destroy');
    assert.ok(!t.hasOwnProperty('propB'), 'propB removed on destroy');
}

