 function getIconUrl(result) {
    var icon = "img/success.png";
    if (result == "UNSTABLE") {
        icon = "img/unstable.png";
    } else if (result == "FAILURE") {
        icon = "img/failed.png";
    } else if (result == "ABORTED") {
        icon = "img/aborted.png";
    } else if(result == null) {//in-progress

    }
    return icon;
};

function buildPopupModels(jobNames, jobs){
    var result = [];
    $.each(jobNames, function(index, name){
        var job=jobs[name];

        result.push({
            dangerClass: job.result == 'FAILURE' ? 'alert-danger' : '',
            iconImg:getIconUrl(job.result),
            fullDisplayName: job.jobName + ' #' + job.number
        })
    });

    return result;
}

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

            var popupModels = buildPopupModels(jobNames, jobs);
            var message = {
                    command:'render',
                    context: { jobs: popupModels }
                };

            var iframe = document.getElementById('theFrame');
            iframe.contentWindow.postMessage(message, '*');
        }
    });
});

window.addEventListener('message', function(event) {
  if (event.data.html) {
      console.log(event.data.html);
      $('#jobListGroup').append(event.data.html);
  }
});
