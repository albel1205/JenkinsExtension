(function(jex){
    jex.jobManager = (function(){
        var DATA_JOBS = 'jobs',
            DATA_JOBNAMES = 'jobNames';

        var that = this;

        that.getJobByName = function(jobName){

        };

        that.addJob = function(job){
            addJob(job);
            addJobName(job.name);
        };

        function addJob(job){
            var jobs = jex.dataStore.get(DATA_JOBS);

            if(jobs == undefined) jobs = [];
            jobs.push(job);

            jex.dataStore.set(DATA_JOBS, jobs);
        };

        function addJobName(name){
            var jobNames = jex.dataStore.get(DATA_JOBNAMES);

            if(jobNames == undefined) jobNames = [];
            jobNames.push(name);

            jex.dataStore.set(DATA_JOBNAMES, jobNames);
        }

        that.isJobNameExisted = function(jobName){
            var jobNames = jex.dataStore.get(DATA_JOBNAMES);
            $.each(jobNames, function(index, value){
                if(value == jobName) return true;
            });

            return false;
        };

        return that;
    }());
})(this.jex = this.jex || {});
