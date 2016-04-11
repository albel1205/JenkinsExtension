(function(jex){
    jex.events = {
        menuContext:{
            clicked: 'menuContext/clicked'
        },
        jobRequester:{
            receivedResponse: 'jobRequester/receivedResponse',
            queriedAllJobs: 'jobRequester/queriedAllJobs',
            updateJobCount: 'jobRequester/updateJobCount'
        }
    }
})(this.jex = this.jex || {});
