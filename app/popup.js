 function getIconUrl(result) {
    var icon = "img/success.png";
    if (result == "UNSTABLE") {
        icon = "img/unstable.png";
    } else if (result == "FAILURE") {
        icon = "img/failure.png";
    } else if (result == "ABORTED") {
        icon = "img/aborted.png";
    } else if(result == null) {//in-progress

    }
    return icon;
};

document.addEventListener('DOMContentLoaded', function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, { "eventName": "loadPopupData" });
        console.log("sent message to content script");
    });

    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
        console.log("received message from content script");
        if(request.eventName == "loadPopupDataResult"){
            var jobNames = request.data.jobNames,
                jobs=request.data.jobs;

            console.log(jobNames);
            console.log(jobs);

            if(!jobNames || !jobs) return false;

            $.each(jobNames, function(index, name){
                var job = jobs[name];

                $('#jobTemplate').tmpl({
                    dangerClass: job.result == 'FAILURE' ? 'alert-danger' : '',
                    iconImg: getIconUrl(job.result),
                    fullDisplayName: job.jobName+ ' #' +job.number
                }).appendTo('#jobListGroup');
            });
        }
    });
});
