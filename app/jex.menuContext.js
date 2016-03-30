(function(jex){
    jex.menuContext = {
        initialize: function(){
            chrome.contextMenus.create({
                "id": "addJobToQueue",
                "title": "Subcribe Jenkins Job",
                "contexts": ["link"]
            });

            chrome.contextMenus.onClicked.addListener(function (info, tab) {
                if (info.menuItemId == "addJobToQueue") {
                    var linkUrl = info.linkUrl || "",
                        jobName = jex.getJobNameFromUrl(linkUrl),
                        requestUrl = jex.getJobUrl(jobName);

                    jex.pubsub.publish("save-to-storage", {
                        jobName: jobName,
                        jobUrl: requestUrl
                    });
                }
            });
        }
    };
})(this.jex = this.jex || {});
