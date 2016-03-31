(function(jex, $){
    this.jobNameManager = (function(){
        var that = this;

        that.isJobNameExisted = function(jobName){
            var jobNames = jex.dataStore.get('jobNames');
            $.each(jobNames, function(index, value){
                if(value == jobName) return true;
            });

            return false;
        };

        return that;
    }());
})(this.jex = this.jex || {}, jQuery);
