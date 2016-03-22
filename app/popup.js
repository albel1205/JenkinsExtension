var data = {
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

var getIconUrl = function(result) {
    var icon = "img/success.png";
    if (result == 'UNSTABLE') {
        icon = "img/unstable.png";
    } else if (result == 'FAILURE') {
        icon = "img/failure.png";
    } else if (result == 'ABORTED') {
        icon = "img/aborted.png";
    } else if(result == null) {//in-progress

    }
    return icon;
}

// Run our kitten generation script as soon as the document's DOM is ready.
document.addEventListener('DOMContentLoaded', function() {
    var jobNames = localStorage["jobNames"] ? JSON.parse(localStorage["jobNames"]) : [];
    var jobs = localStorage["jobQueue"] ? JSON.parse(localStorage["jobQueue"]) : {};

    console.log(jobNames);
    console.log(jobs);

    if(!jobNames || !jobs) return false;

    $.each(jobNames, function(index, name){
        var job = data.get(name);

        $('#jobTemplate').tmpl({
            dangerClass: job.result == 'FAILURE' ? 'alert-danger' : '',
            iconImg: getIconUrl(job.result),
            fullDisplayName: job.jobName+ ' #' +job.number
        }).appendTo('#jobListGroup');
    });
});
