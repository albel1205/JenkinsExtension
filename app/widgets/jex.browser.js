(function(jex){
    jex.browser = {
        initialize: function(){
            jex.pubsub.subscribe(jex.events.updateBadgeText, jex.browser.updateBage, this);
            jex.pubsub.subscribe(jex.events.updateJob, jex.browser.updateJob, this);

            jex.browser.initContextMenu();

            chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
                if (request.eventName == jex.events.addJobToQueue) {
                    jex.pubsub.publish(jex.events.addJobToQueue, request.jobUrl);
                }
                else if(request.eventName == jex.events.loadPopupData){
                    jex.pubsub.publish(jex.events.loadPopupData);
                }
            });
        },
        initContextMenu: function(){
            jex.sendMessageToBackground(jex.events.initContextMenu);
        },
        updateBage: function(data){
            jex.sendMessageToBackground(jex.events.updateBadgeText,{
                text: data.text,
                background: data.backgroundColor
            });
        },
        showNotification: function(data){
            jex.sendMessageToBackground(jex.events.notify, {
                title: data.title,
                message: data.message,
                icon: data.iconUrl
            });
        },
        updateJob: function(response){
            jex.sendMessageToBackground(jex.events.updateBadgeText,{
                text: response.number,
                background: jex.getColor(response.result)
            });

            var message = response.number + ' (' + response.result + ')';
            jex.sendMessageToBackground(jex.events.notify, {
                title: response.fullDisplayName,
                message: message,
                icon: jex.getIconUrl(response.result)
            });
        }
    };
})(this.jex = this.jex || {});
