'use strict';

require('babel/register')({
    stage: 0
});

var Core = require('./src/data-core');

require('./tests/BaseModel')(Core);
require('./tests/CollectionInterface')(Core, Core.BaseCollection);
require('./tests/CollectionInterface')(Core, Core.BaseTableCollection);

/// fin
console.log('fin');
