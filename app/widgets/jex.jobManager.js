(function(jex){
    jex.data = {
        /**
        * _data stores the data used by datastore's get and set methods
        * @private
        */
        _data: {},
        _getData: function(){
            return localStorage["jobQueue"] ? JSON.parse(localStorage["jobQueue"]) : {};
        },
        _setData: function(_data){
            localStorage.setItem("jobQueue", JSON.stringify(_data));
        },

        /**
        * Gets data from the datastore
        *
        * @param {string} token  An identifier for retrieving associated data
        */
        get: function (token) {
            return this._getData()[token];
        },

        /**
        * Persists data in the datastore
        *
        * @param {string} token    An identifier for the stored data
        * @param {mixed} payload   A blob of data
        */
        set: function (token, payload) {
            var data = this._getData();
            data[token] = payload;
            this._setData(data);
        },

        /**
        * Removes an item from the data store
        *
        * @param {string} token    An identifier for the stored data
        */
        clear: function (token) {
            var data = this._getData();
            data[token] = undefined;
            this._setData(data);
        },

        /**
        * Clears all data from the data store
        */
        clearAll: function () {
            var data = this._getData();
            data = {};
            this._setData(data);
        }
    };

    var currentJobName,
        timeOut = 6 * 1000;

    jex.jobManager = {
        jobNames: [],
        _fetch: function(){
            setInterval(function () {
                if (this.jobNames == undefined || this.jobNames.length == 0) {
                    jex.pubsub.publish(jex.events.updateBadgeText, {
                        text: "",
                        backgroundColor:getColor("")
                    });
                }

                $.each(jobNames, function (index, name) {
                    this._getJobStatus(name);
                });
            }, timeOut);
        },
        initialize: function(){
            jex.data.clearAll();
            jex.pubsub.subscribe(jex.events.addJobToQueue, this.monitorJob, this);

            this._fetch();
        },

        monitorJob: function(jobUrl){
            var jobName = jex.getJobNameFromUrl(url),
                requestUrl = jex.getJobUrl(jobName);

            if(!jex.data.get(jobName)){
                jobNames.push(jobName);
            }

            jex.data.set(jobName, {
                jobName: jobName,
                jobUrl: requestUrl
            })
        },

        _getJobStatus: function(jobName){
            var jobUrl = jex.getJobUrl(jobName);
            currentJobName = jobName;
            $.getJSON(jobUrl, function (response) {
                jex.pubsub.publish(jex.events.updateJob, response);

                try {
                    var job = jex.data.get(currentJobName);
                    jex.data.set(currentJobName, {
                        jobName: currentJobName,
                        jobUrl: job.jobUrl,
                        notified: true
                    })
                }catch(e){
                    jex.log(err.message);
                }
            });
        }
    }
})(this.jex = this.jex || {});
