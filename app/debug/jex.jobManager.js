(function(jex){
    this.jobManager = (function(){
        var that = this;

        that.getJobByName = function(jobName){

        };

        that.addJob = function(job){
            var jobs = jex.dataStore.get('jobs');
            jobs.push(job);

            jex.dataStore.set('jobs', jobs);
        };

        return that;
    }());
})(this.jex = this.jex || {});
