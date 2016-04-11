(function(jex, $){
    $.widget('jex.notification',{
        options:{
            type: 'basic',
            title: 'Notification',
            icon: 'img/notification_warning.png'
        },
        _create: function(){

        },
        showUpdatedJobs: function(jobs){
            var items = $.makeArray( jobs );

            var message = '';
            $.each(items, function(index, job){
                message += job.fullDisplayName() + ' - ' + job.status;
                message += '\n';
            });
            chrome.notifications.create(
                "",
                {
                    type: this.options.type,
                    title: this.options.title,
                    message: message,
                    iconUrl: this.options.icon
                },
                function(id){ /* Do nothing */ }
            );
        },
        destroy: function(){
            $.Widget.prototype.destroy.call(this);
        }

    });
})(this.jex = this.jex || {}, jQuery)
