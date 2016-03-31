(function(jex){
    jex.dataStore = {
        /**
        * _data stores the data used by datastore's get and set methods
        * @private
        */
        _data: {},

        /**
        * Gets data from the datastore
        *
        * @param {string} token  An identifier for retrieving associated data
        */
        get: function (token) {
            return this._data[token];
        },

        /**
        * Persists data in the datastore
        *
        * @param {string} token    An identifier for the stored data
        * @param {mixed} payload   A blob of data
        */
        set: function (token, payload) {
            // Store the data
            this._data[token] = payload;
        },

        /**
        * Removes an item from the data store
        *
        * @param {string} token    An identifier for the stored data
        */
        clear: function (token) {
            this._data[token] = undefined;
        },

        /**
        * Clears all data from the data store
        */
        clearAll: function () {
            this._data = {};
        }
    };
})(this.jex = this.jex || {});
