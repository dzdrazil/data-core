var assert = require('assert');
var Core = require('./dist/data-core');

function TestModel(data) {
    Core.BaseModel.call(this, data);
}

TestModel.prototype = new Core.BaseModel();

TestModel.prototype.propA = '';

TestModel.prototype.propB = -1;

function TestCollection(data) {
    Core.BaseCollection.call(this, data);
}

TestCollection.prototype = new Core.BaseCollection();

TestCollection.prototype.modelConstructor = TestModel;



/////////////////
// MODEL TESTS
////////////////

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

//////////////
// Colleciton Tests
//////////////

t = new TestCollection([
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

assert.equal(t.length, 3, 'Collection length is properly set');

// copy
var temp = t.copy();
assert.equal(temp.length, 3, 'Copy returns the full length when passed no parameters');
temp = t.copy([t.at(0), t.at(1)]);
assert.equal(temp.length, 2, 'Copy returns the only the given subset of models');
temp.at(0).propA = 'updated';
assert.equal(t.at(0).propA, 'updated', 'Copies only copy the array, but share the same model references');
// add
t.add({id: 3});
assert.equal(t.length, 4, 'Add adds a new model');
assert.equal(temp.length, 2, 'Copies of collections do not share the same underlying array');

// addMany - tested by the constructor

// at
assert.equal(t.at(3).id, 3, 'at returns the value at the given index');
// get
assert.equal(t.get(20).id, 20, 'get returns a model by the given id value');

// indexOf
assert.equal(t.indexOf(20), 2, 'returns index of the given model');

// getPage
temp = t.getPage(1, 2);
assert.equal(temp.length, 2, 'getPage returns the length given by the second parameter');
temp = t.getPage(1, 5);
assert.equal(temp.length, 4, 'getPage returns up to the requested length');
temp = t.getPage(2, 2);
assert.equal(temp[0].id, 20, 'models are offeset by the first parameter, 1 indexed');

// remove
temp = t.copy();
temp.remove(20);
assert.equal(temp.length, 3, 'remove can remove elements by id');
temp.remove(temp.at(2));
assert.equal(temp.length, 2, 'remove can remove a model by reference');

// empty
temp = t.copy();
temp.empty();
assert.equal(temp.length, 0, 'empty removes all models');

// each
var ids = [];
t.each(function(m) {
    ids.push(m.id);
});
assert.equal(ids.length, 4, 'each iterates over every model');
assert.equal(ids[0], 0, 'each iteration is passed a model');

// map
ids = t.map(function(m) {
    return m.id;
});
assert.equal(ids.length, 4, 'map iterates over every model');
assert.equal(ids[0], 0, 'map iteration is passed a model');

// filter
var filtered = t.filter(function(m) {
    return m.id > 0;
});
assert.equal(filtered.length, 3, 'filter returns models that pass the test')

// reduce
var count = t.reduce(function(m, runningSum) {
    return runningSum + 1;
}, 0);
assert.equal(count, 4, 'reduce converts the colleciton to a single value');

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
assert.equal(t.at(0).id, 20, 'sort works like standard array sort');

// toArray
temp = t.toArray();
assert(Array.isArray(temp), 'toArray returns an array of the models');

/// fin
console.log('fin');
