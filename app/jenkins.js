(function(jex){
    $('body').menuContext({
        publish: jex.pubsub.publish,
        checkJobNameExisted: jex.jobManager.isJobNameExisted,
        addJob: jex.jobManager.addJob
    });
})(this.jex = this.jex || {});
