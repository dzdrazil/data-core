(function(NAMESPACE) {
    'use strict';



    function BaseModel(data) {
        var key;
        if (data) {
            for (key in data) {
                if (data.hasOwnProperty(key)) {
                    this[key] = data[key];
                }
            }
        }
    }

    BaseModel.prototype = {
        id: 0,

        destroy: function() {
            var key;

            for (key in this) {
                if (this.hasOwnProperty(key)) {
                    delete this[key];
                }
            }
        }
    };

    NAMESPACE.BaseModel = BaseModel;
})(NAMESPACE);

