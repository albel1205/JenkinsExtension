(function (jex, $) {
    jex.jobQueue = {
        _getQueue: function(){
            return localStorage["jobQueue"] ? JSON.parse(localStorage["jobQueue"]) : [];
        },
        _setQueue: function(arr){
            localStorage.setItem("jobQueue", JSON.stringify(arr));
        },
        _removeJob: function(number){
            var arr = [];
            $.each(this._getQueue(), function (index, job) {
                if (job.lastBuild != number) {
                    arr.push(job);
                }
            });
            this._setQueue(arr);
        },
        _addJob: function (job) {
            var arr = this._getQueue();
            arr.push(job);
            this._setQueue(arr);
        },
        _updateJob: function (updatedJob) {
            var arr = [];
            $.each(this._getQueue(), function (index, job) {
                if (job.lastBuild != updatedJob.lastBuild) {
                    arr.push(job);
                }
                else {
                    arr.push(updatedJob);
                }
            });
            this._setQueue(arr);
        },
        _getJob: function(number){
            $.each(this._getQueue(), function (index, job) {
                if (job.lastBuild = number) {
                    return job;
                }
            });
        },
        addJob: function(job){
            this._addJob(job);
        },
        getJob: function (jobNumber) {
            return this._getJob(jobNumber);
        },
        getAll: function () {
            return this._getQueue();
        },
        updateJob: function (job) {
            this._updateJob(job);
        },
        removeJob: function (jobNumber) {
            this._removeJob(jobNumber);
        },
        clearAll: function () {
            this._setQueue([]);
        }
    };
})(this.jex = this.jex || {}, jQuery);