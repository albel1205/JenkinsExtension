(function(jex){
    jex.popup = {
        initialize: function(){
            jex.pubsub.subscribe(jex.events.loadPopupData, jex.popup.loadPopupData, this);
        },
        loadPopupData: function(){
            jex.sendMessageToBackground(jex.events.loadPopupDataResult,{
                jobNames: localStorage["jobNames"] ? JSON.parse(localStorage["jobNames"]) : [],
                jobs: localStorage["jobQueue"] ? JSON.parse(localStorage["jobQueue"]) : {}
            });
        }
    };
})(this.jex = this.jex || {});
