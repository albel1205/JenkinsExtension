(function(jex, $){
    $.widget('jex.layoutManager',{
        options:{
            subscribe: function(){ jex.log('the subscribe option on jex.layoutManager has not been set'); },
            badge: null,
            notification: null
        },

        _create: function(){
            jex.setupWidgetInvocationMethods(this, this.options, ['badge','notification']);
        },
        
        destroy: function(){
            $.Widget.prototype.destroy.call(this);
        }

    });
})(this.jex = this.jex || {}, jQuery)
