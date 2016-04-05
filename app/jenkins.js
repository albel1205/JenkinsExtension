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

    var notification = $('body').notification();
    var badge = $('body').badge();
    $('body').layoutManager({
        subscribe: jex.pubsub.subscribe,
        badge: badge,
        notification: notification
    });
})(this.jex = this.jex || {});
