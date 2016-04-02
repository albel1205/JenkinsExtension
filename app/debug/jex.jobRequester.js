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

            that.subcribe(jex.events.jobRequester.receivedResponse, that._receiveResponse, this);

            setInterval(function(){
                var jobs = this.jobManager.getAllJobs();
                $.each(jobs, function(index, item){
                    if(!item) return true;//continue

                    var jobUrl = jex.getJobUrl(item.name);
                    $.getJSON(jobUrl, function(response) {
                        var job = new Job(response.name, response.url, response.result);
                        that.publish(jex.events.jobRequester.receivedResponse, job);
                    });
                });
            }, timeout);
        },
        _receiveResponse: function(job){
            _updateTemporaryJobs(job);

            var allJobs = this.jobManager.getAllJobs(),
                allTempJobs = jex.dataStore.get('tempUpdatedJobs');

            if(allJobs.length == allTempJobs.length){
                var updatedJobs = this._filterUpdatedJobs(allTempJobs);
                that.publish(jex.events.jobRequester.queriedAllJobs, updatedJobs);
            }
        },
        _filterUpdatedJobs: function(jobs){
            var result = [];
            $.each(jobs, function(index, item){
                var isUpdated = this.options.jobManager.isJobUpdated(item);
                if(isUpdated) result.push(item);
            });

            return result;
        },
        _updateTemporaryJobs: function(job){
            var tempJobs = jex.dataStore.get('tempUpdatedJobs');
            if(!tempJobs) tempJobs = [];
            tempJobs.push(job);
            jex.dataStore.set('tempUpdatedJobs', tempJobs);
        }
        destroy: function(){
            $.Widget.prototype.destroy.call(this);
        }
    });
})(this.jex = this.jex || {}, jQuery);
