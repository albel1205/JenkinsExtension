(function(jex){
    jex.events = {
        menuContext:{
            clicked: 'menuContext/clicked'
        },
        jobRequester:{
            receivedResponse: 'jobRequester/receivedResponse',
            queriedAllJobs: 'jobRequester/queriedAllJobs'
        }
    }
})(this.jex = this.jex || {});
