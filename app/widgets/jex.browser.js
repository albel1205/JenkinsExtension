(function(jex){
    function sendMessageToBackground(eventName, data){
        chrome.runtime.sendMessage({
            eventName: eventName,
            data: data
        });
    }
    jex.browser = {
        initialize: function(){
            jex.pubsub.subscribe(jex.events.updateBadgeText, this.updateBage, this);
            jex.pubsub.subscribe(jex.events.notify, this.showNotification, this);
            jex.pubsub.subscribe(jex.events.updateJob, this.updateJob, this);

            this.initContextMenu();
            chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
                if (request.eventName == jex.events.addJobToQueue) {
                    jex.pubsub.publish(jex.events.addJobToQueue, request.jobUrl);
                }
            });
        },
        initContextMenu: function(){
            sendMessageToBackground(jex.events.initContextMenu);
        },
        updateBage: function(data){
            sendMessageToBackground(jex.events.updateBadgeText,{
                text: data.text,
                background: data.backgroundColor
            });
        },
        showNotification: function(data){
            sendMessageToBackground(jex.events.notify, {
                title: data.title,
                message: data.message,
                icon: data.iconUrl
            });
        },
        updateJob: function(response){
            sendMessageToBackground(jex.events.updateBadgeText,{
                text: response.number,
                background: jex.getColor(response.result)
            });

            var message = response.number + ' (' + response.result + ')';
            sendMessageToBackground(jex.events.notify, {
                title: response.fullDisplayName,
                message: message,
                icon: jex.getIconUrl(response.result)
            });
        }
    };
})(this.jex = this.jex || {});
