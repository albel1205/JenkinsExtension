(function (jex, $) {
    var queue = [];

    jex.pubsub = {
        publish: function (eventName, data) {
            var context, intervalId, idx = 0;
            if (queue[eventName]) {
                intervalId = setInterval(function () {
                    if (queue[eventName][idx]) {
                        try {
                            context = queue[eventName][idx].context || this;
                            queue[eventName][idx].callback.call(context, data);
                        } catch (err) {
                            jex.log('An error occurred in one of the callbacks for the event "' + eventName + '"');
                            jex.log('the error was "' + e + '"');
                        }

                        idx += 1;
                    } else {
                        clearInterval(intervalId);
                    }
                }, 0);
            }
        },
        subscribe: function (eventName, callback, context) {
            if (!queue[eventName]) {
                queue[eventName] = [];
            }

            queue[eventName].push({
                context: context,
                callback: callback
            });
        },
        unsubscribe: function (eventName, callback, context) {
            if (queue[eventName]) {
                queue[eventName].removeItem({
                    context: context,
                    callback: callback
                });
            }
        }
    };

})(this.jex = this.jex || {}, jQuery);
