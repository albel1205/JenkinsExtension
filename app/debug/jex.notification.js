(function(jex, $){
    $.widget('jex.notification',{
        options:{
            type: 'basic'
        },

        _create: function(){

        },
        showUpdatedJobs: function(jobs){

        },
        destroy: function(){
            $.Widget.prototype.destroy.call(this);
        }

    });
})(this.jex = this.jex || {}, jQuery)
