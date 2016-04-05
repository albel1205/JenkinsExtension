(function(jex, $){
    $.widget('jex.badge',{
        options:{
            backgroundColor: [220, 20, 60, 0]
        },
        _create: function(){

        },
        updateBadge: function(updatedJobs){
            var jobs = $.makeArray(updatedJobs);

            var numberOfNotification = String(jobs.length);
            if(numberOfNotification == 0){
                chrome.browserAction.setBadgeText({text: ''});//clear badge
            }
            else{
                chrome.browserAction.setBadgeText({text: numberOfNotification});
                chrome.browserAction.setBadgeBackgroundColor({color: this.options.backgroundColor});
            }
        },
        destroy: function(){
            $.Widget.prototype.destroy.call(this);
        }

    });
})(this.jex = this.jex || {}, jQuery)
