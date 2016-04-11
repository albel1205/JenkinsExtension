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
    
    chrome.browserAction.onClicked.addListener(function() {
        var jobs = getAllJobs();

        var popupModels = buildPopupModels(jobs);
        var message = {
                command:'render',
                context: { jobs: popupModels }
            };
        var iframe = document.getElementById('theFrame');
        iframe.contentWindow.postMessage(message, '*');
    });
})(this.jex = this.jex || {});
