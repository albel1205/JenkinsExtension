(function(jex){
    $('body').menuContext({
        publish: jex.pubsub.publish,
        checkJobNameExisted: jex.jobManager.isJobNameExisted,
        addJob: jex.jobManager.addJob
    });

    $('body').jobRequester({
        subcribe: jex.pubsub.subscribe,
        publish: jex.pubsub.publish,
        jobManager: jex.jobManager
    });
})(this.jex = this.jex || {});
