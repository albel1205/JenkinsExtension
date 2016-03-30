(function(jex){
    jex.notification = {
        initialize: function(){
            jex.pubsub.subscribe('show-notification', jex.notification.notify, this);
        },
        notify: function(title, message, iconUrl){
            var option = {
                type: 'basic',
                title: title,
                message: message,
                iconUrl: iconUrl
            };
            chrome.notifications.create("", option, function (id) { /* Do nothing */ });
        }
    };
})(this.jex = this.jex || {});
