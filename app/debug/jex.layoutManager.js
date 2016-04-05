(function(jex, $){
    $.widget('jex.layoutManager',{
        options:{
            subscribe: function(){ jex.log('the subscribe option on jex.layoutManager has not been set'); },
            badge: null,
            notification: null
        },

        _create: function(){
            jex.setupWidgetInvocationMethods(this, this.options, ['badge','notification']);

            this.options.subscribe(jex.events.jobRequester.receivedResponse, this._updateNotifications, this);
        },
        _updateNotifications: function(updatedJobs){
            this._notification('showUpdatedJobs', updatedJobs);
            this._badge('updateBadge', updatedJobs);
        },
        destroy: function(){
            $.Widget.prototype.destroy.call(this);
        }

    });
})(this.jex = this.jex || {}, jQuery)
