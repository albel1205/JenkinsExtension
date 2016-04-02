(function(jex, $){
    $.widget('jex.menuContext', {
        options:{
            publish: function(){ jex.log('the publish on jex.menuContext has not been set'); },
            checkJobNameExisted: function(jobName){ jex.log('the checkJobNameExisted on jex.menuContext has not been set') },
            addJob: function(job){ jex.log('the addJob on jex.menuContext has not been set') }
        },
        _create: function(){
            var that = this;

            chrome.contextMenus.create({
                'id': 'addJobToQueue',
                'title': 'Subcribe Jenkins Job',
                'contexts': ['link']
            });

            chrome.contextMenus.onClicked.addListener(function (info, tab) {
                if (info.menuItemId == 'addJobToQueue') {
                    var jobUrl = info.linkUrl || '';
                    that._monitorJob(jobUrl);
                }
            });
        },
        _monitorJob: function(jobUrl){
            var jobName = jex.getJobNameFromUrl(jobUrl),
                requestUrl = jex.getJobUrl(jobName);

            if(!this.options.checkJobNameExisted(jobName)){
                

                var job = new Job(jobName, requestUrl);
                this.options.addJob(job);
            }
        },
        destroy: function(){
            $.Widget.prototype.destroy.call(this);
        }
    });
})(this.jex = this.jex || {}, jQuery);
