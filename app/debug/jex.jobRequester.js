(function(jex, $){
    $.widget('jex.jobRequester', {
        options:{
            subcribe: function(){ jex.log('the subcribe on jex.jobRequester has not been set'); },
            publish: function(){ jex.log('the publish on jex.jobRequester has not been set'); },
            jobManager: null,
            sleepTime: 6 * 1000
        },
        _create: function(){
            var timeout = this.options.sleepTime,
                that = this;

            that.options.subcribe(jex.events.jobRequester.receivedResponse, that._receiveResponse, this);

            setInterval(function(){
                var jobs = that.options.jobManager.getAllJobs();
                $.each(jobs, function(index, item){
                    if(!item) return true;//continue

                    var jobUrl = jex.getJobUrl(item.name);
                    $.getJSON(jobUrl, function(response) {
                        var name = jex.getNameFromFullname(response.fullDisplayName);
                        var job = new Job(name, response.url, response.result);
                        that.options.publish(jex.events.jobRequester.receivedResponse, job);
                    });
                });
            }, timeout);
        },
        _receiveResponse: function(job){
            this._updateTemporaryJobs(job);

            var allJobs = this.options.jobManager.getAllJobs(),
                allTempJobs = this._temporaryStorage;

            if(allJobs.length == allTempJobs.length){
                var updatedJobs = this._filterUpdatedJobs(allTempJobs);
                this._temporaryStorage = [];
                that.options.publish(jex.events.jobRequester.queriedAllJobs, updatedJobs);
            }
        },
        _filterUpdatedJobs: function(jobs){
            var result = [], that = this;
            $.each(jobs, function(index, item){
                var isUpdated = that.options.jobManager.isJobUpdated(item);
                if(isUpdated) result.push(item);
            });

            return result;
        },
        _updateTemporaryJobs: function(job){
            if(!this._temporaryStorage) this._temporaryStorage = [];
            this._temporaryStorage.push(job);
        },
        _temporaryStorage: [],
        destroy: function(){
            $.Widget.prototype.destroy.call(this);
        }
    });
})(this.jex = this.jex || {}, jQuery);
