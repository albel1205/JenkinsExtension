(function(jex){
    jex.menuContext = {
        _isJobExisted: function(jobName){

        },
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

                    if(!this._isJobExisted(jobName)){
                        var dataStore = jex.dataStore,
                            jobNames = dataStore.get('jobNames');
                            jobs = dataStore.get('jobs');

                        jobNames.push(jobName);
                        jobs.push({
                            jobName: jobName,
                            jobUrl: requestUrl
                        });

                        dataStore.set('jobNames', jobNames);
                        dataStore.set('jobs', jobs);
                    }
                }
            });
        }
    };
})(this.jex = this.jex || {});
