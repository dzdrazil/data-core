'use strict';

var assert = require('assert');

module.exports = function(Core, CollectionClass) {
    // Collection class name, used for identifying erroring class in messages
    var collectionName = CollectionClass.toString().match(/function ([^\(]+)/)[1]

    function _generateMessage(msg) {
        return collectionName + ': ' + msg;
    }

    // Typed Model
    function TestModel(data) {
        Core.BaseModel.call(this, data);
    }

    TestModel.prototype = new Core.BaseModel();

    TestModel.prototype.propA = '';

    TestModel.prototype.propB = -1;

    // Test Collection
    function TestCollection(data) {
        CollectionClass.call(this, data);
    }

    TestCollection.prototype = new CollectionClass();

    TestCollection.prototype.modelConstructor = TestModel;

    var t = new TestCollection([
        {
            id: 0,
            propA: '0',
            propB: 0
        },
        {
            id: 1,
            propA: '1',
            propB: 1
        },
        {
            id: 20,
            propA: '2',
            propB: 2
        },
    ]);

    // Collection Tests
    assert.equal(t.length, 3, _generateMessage('Collection length is properly set'));

    // copy
    var temp = t.copy();
    assert.equal(temp.length, 3, _generateMessage('Copy returns the full length when passed no parameters'));
    temp = t.copy([t.at(0), t.at(1)]);
    assert.equal(temp.length, 2, _generateMessage('Copy returns the only the given subset of models'));
    temp.at(0).propA = 'updated';
    assert.equal(t.at(0).propA, 'updated', _generateMessage('Copies only copy the array, but share the same model references'));
    // add
    t.add({id: 3});
    assert.equal(t.length, 4, _generateMessage('Add adds a new model'));
    assert.equal(temp.length, 2, _generateMessage('Copies of collections do not share the same underlying array'));

    // addMany - tested by the constructor

    // at
    assert.equal(t.at(3).id, 3, _generateMessage('at returns the value at the given index'));
    // get
    assert.equal(t.get(20).id, 20, _generateMessage('get returns a model by the given id value'));

    // indexOf
    assert.equal(t.indexOf(20), 2, _generateMessage('returns index of the given model'));

    // getPage
    temp = t.getPage(1, 2);
    assert.equal(temp.length, 2, _generateMessage('getPage returns the length given by the second parameter'));
    temp = t.getPage(1, 5);
    assert.equal(temp.length, 4, _generateMessage('getPage returns up to the requested length'));
    temp = t.getPage(2, 2);
    assert.equal(temp[0].id, 20, _generateMessage('models are offeset by the first parameter, 1 indexed'));

    // remove
    temp = t.copy();
    temp.remove(20);
    assert.equal(temp.length, 3, _generateMessage('remove can remove elements by id'));
    temp.remove(temp.at(2));
    assert.equal(temp.length, 2, _generateMessage('remove can remove a model by reference'));

    // empty
    temp = t.copy();
    temp.empty();
    assert.equal(temp.length, 0, _generateMessage('empty removes all models'));

    // each
    var ids = [];
    t.forEach(function(m) {
        ids.push(m.id);
    });
    assert.equal(ids.length, 4, _generateMessage('each iterates over every model'));
    assert.equal(ids[0], 0, _generateMessage('each iteration is passed a model'));

    // map
    ids = t.map(function(m) {
        return m.id;
    });
    assert.equal(ids.length, 4, _generateMessage('map iterates over every model'));
    assert.equal(ids[0], 0, _generateMessage('map iteration is passed a model'));

    // filter
    var filtered = t.filter(function(m) {
        return m.id > 0;
    });
    assert.equal(filtered.length, 3, _generateMessage('filter returns models that pass the test'));

    // reduce
    var count = t.reduce(function(m, runningSum) {
        return runningSum + 1;
    }, 0);
    assert.equal(count, 4, _generateMessage('reduce converts the colleciton to a single value'));

    // sort
    // sort by id, descending order
    t.sort(function(a, b) {
        if (a.id < b.id){
           return 1;
        }
        if (a.id > b.id) {
           return -1;
        }
        // a must be equal to b
        return 0;
    });
    assert.equal(t.at(0).id, 20, _generateMessage('sort works like standard array sort'));

    // toArray
    temp = t.toArray();
    assert(Array.isArray(temp), _generateMessage('toArray returns an array of the models'));
}
