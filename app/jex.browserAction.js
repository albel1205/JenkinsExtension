(function(jex){
    jex.browserAction = {
        initialize: function(){
            jex.pubsub.subscribe('set-badge', jex.browserAction.setBadge, this);
        },
        setBadge: function(text, backgroundColor){
            chrome.browserAction.setBadgeText({ text: String(text) });
            chrome.browserAction.setBadgeBackgroundColor({ color: backgroundColor });
        }
    };
})(this.jex = this.jex || {});
