(function(jex) {
  jex.data = {
    /**
     * _data stores the data used by datastore's get and set methods
     * @private
     */
    _data: {},
    _getData: function() {
      return localStorage["jobQueue"] ? JSON.parse(localStorage["jobQueue"]) : {};
    },
    _setData: function(_data) {
      localStorage.setItem("jobQueue", JSON.stringify(_data));
    },

    /**
     * Gets data from the datastore
     *
     * @param {string} token  An identifier for retrieving associated data
     */
    get: function(token) {
      return jex.data._getData()[token];
    },

    /**
     * Persists data in the datastore
     *
     * @param {string} token    An identifier for the stored data
     * @param {mixed} payload   A blob of data
     */
    set: function(token, payload) {
      var data = jex.data._getData();
      data[token] = payload;
      jex.data._setData(data);
    },

    /**
     * Removes an item from the data store
     *
     * @param {string} token    An identifier for the stored data
     */
    clear: function(token) {
      var data = jex.data._getData();
      data[token] = undefined;
      jex.data._setData(data);
    },

    /**
     * Clears all data from the data store
     */
    clearAll: function() {
      var data = jex.data._getData();
      data = {};
      jex.data._setData(data);
    }
  };

  var timeOut = 6 * 1000;

  jex.jobManager = {
    jobNames: [],
    _fetch: function() {
      setInterval(function() {
        jex.jobManager.jobNames = localStorage["jobNames"] ? JSON.parse(localStorage["jobNames"]) : [];
        if (jex.jobManager.jobNames == undefined || jex.jobManager.jobNames.length == 0) {
          jex.pubsub.publish(jex.events.updateBadgeText, {
            text: "",
            backgroundColor: jex.getColor("")
          });
        }

        $.each(jex.jobManager.jobNames, function(index, name) {
          if (!jex.data.get(name)) {
            jex.jobManager.jobNames.pop();
          } else {
            jex.jobManager._getJobStatus(name);
          }
        });
      }, timeOut);
    },

    initialize: function() {
      jex.pubsub.subscribe(jex.events.addJobToQueue, jex.jobManager.monitorJob, this);
      jex.jobManager._fetch();
    },

    monitorJob: function(jobUrl) {
      var jobName = jex.getJobNameFromUrl(jobUrl),
        requestUrl = jex.getJobUrl(jobName);

      if (!jex.data.get(jobName)) {
        jex.jobManager.jobNames.push(jobName);
      }

      jex.data.set(jobName, {
        jobName: jobName,
        jobUrl: requestUrl,
        number: '',
        result: null,
        notified: false
      });

      localStorage.setItem("jobNames", JSON.stringify(jex.jobManager.jobNames));
    },

    _getJobStatus: function(jobName) {
      var jobUrl = jex.getJobUrl(jobName);

      $.getJSON(jobUrl, function(response) {
        if (!response.result) return false; //in-progress

        try {
          var currentJobName = jex.getJobNameFromBuildUrl(response.url, response.number),
            job = jex.data.get(currentJobName);

          if (response.fullDisplayName.indexOf(job.jobName) >= 0 && job.result != response.result) {
            jex.pubsub.publish(jex.events.updateJob, response);
          }

          jex.data.set(currentJobName, {
            jobName: currentJobName,
            jobUrl: job.jobUrl,
            number: response.number,
            result: response.result,
            notified: true
          });
        } catch (err) {
          jex.log(err.message);
        }
      });
    }
  }
})(this.jex = this.jex || {});
