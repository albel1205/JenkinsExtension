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

        that.isJobUpdated = function(job){
            var jobs = jex.dataStore.get(DATA_JOBS);

            var isUpdated = false;
            $.each(jobs, function(index, item){
                if(item.name == job.name){
                    isUpdated = !item.status || (item.status && item.status != job.status);
                    return false;//break $.each
                }
            });

            return isUpdated;
        };

        that.getAllJobs = function(){
            var jobs = jex.dataStore.get(DATA_JOBS);

            var result =[];
            $.each(jobs, function(index, item){
                if(item){
                    var job = new Job(item.name, item.url, item.status);
                    result.push(job);
                }
            });

            return result;
        }
        
        that.updateJobStatus = function(tempJobs){
            var jobs = jex.dataStore.get(DATA_JOBS);

            var result =[];
            $.each(jobs, function(index, item){
                $.each(tempJobs, function(tempIndex, tempItem){
                   if(tempItem.name == item.name){
                       item.status = tempItem.status;
                       return false;//break;
                   } 
                });
            });
            
            jex.dataStore.set(DATA_JOBS, jobs);
        }

        return that;
    }());
})(this.jex = this.jex || {});
