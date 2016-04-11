(function(jex, $){
    $.widget('jex.layoutManager',{
        options:{
            subscribe: function(){ jex.log('the subscribe option on jex.layoutManager has not been set'); },
            badge: null,
            notification: null
        },

        _create: function(){
            jex.setupWidgetInvocationMethods(this, this.options, ['badge','notification']);

            this.options.subscribe(jex.events.jobRequester.queriedAllJobs, this._updateNotifications, this);
            this.options.subscribe(jex.events.jobRequester.updateJobCount, this._updateJobCount, this);
        },
        _updateNotifications: function(updatedJobs){
            if(updatedJobs && updatedJobs.length == 0) return false;
            
            this._notification('showUpdatedJobs', updatedJobs);
            this._badge('updateBadge', updatedJobs);
        },
        _updateJobCount: function(jobCount){
            this._badge('updateJobCount', jobCount);
        },
        destroy: function(){
            $.Widget.prototype.destroy.call(this);
        }

    });
})(this.jex = this.jex || {}, jQuery)
