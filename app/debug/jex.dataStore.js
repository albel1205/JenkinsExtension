(function(jex){
    jex.dataStore = {
        _getData: function() {
          return localStorage["dataStore"] ? JSON.parse(localStorage["dataStore"]) : {};
        },
        _setData: function(_data) {
          localStorage.setItem("dataStore", JSON.stringify(_data));
        },

        /**
         * Gets data from the datastore
         *
         * @param {string} token  An identifier for retrieving associated data
         */
        get: function(token) {
          return this._getData()[token];
        },

        /**
         * Persists data in the datastore
         *
         * @param {string} token    An identifier for the stored data
         * @param {mixed} payload   A blob of data
         */
        set: function(token, payload) {
          var data = this._getData();
          data[token] = payload;
          this._setData(data);
        },

        /**
         * Removes an item from the data store
         *
         * @param {string} token    An identifier for the stored data
         */
        clear: function(token) {
          var data = this._getData();
          data[token] = undefined;
          this._setData(data);
        },

        /**
         * Clears all data from the data store
         */
        clearAll: function() {
          var data = this._getData();
          data = {};
          this._setData(data);
        }
    };
})(this.jex = this.jex || {});
