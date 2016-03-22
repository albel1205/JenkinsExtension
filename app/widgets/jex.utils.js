(function (jex, $) {
    function buildFunction(widget, options) {
        var context = options[widget],
            fn;

        if (!context) {
            jex.log('Attempted to create a helper for ' + widget + ' but the widget was not found in the options.');
            return;
        }

        fn = context[widget];
        return function () {
            var result = fn.apply(context, arguments);
            return result;
        };
    }

    // The preferred means of invoking public methods on a widget stored in options
    // results in the awkward syntax: this.options.widget.widget('methodToInvoke')
    // Here we setup a set of helper methods to make the meaning of the code more
    // clear in general. Additionally, all of the complexity of invoking the widget
    // methods is located here, so there is less chance of errors at the site
    // where we consume this generated api.
    // The new syntax is: this._widget('methodToInvoke')
    jex.setupWidgetInvocationMethods = function (host, options, widgetNames) {
        var i,
            widgetName;

        for (i = widgetNames.length - 1; i >= 0; i -= 1) {
            widgetName = widgetNames[i];
            host["_" + widgetName] = buildFunction(widgetName, options);
        }
    };

    jex.getJobNameFromUrl = function(url) {
        var result = "";

        var urlParts = url.split("/");
        while (result == "") {
            result = urlParts.pop();
        }

        return result;
    };

    jex.buildQueryJobUrl = function (url) {
        var jobName = this.getJobNameFromUrl(url);
        return jex.JENKINS_URL + "/job/" + jobName + "/" + jex.BUILD_NUMBER + "/" + jex.API_SUFFIX;
    };

    jex.getJobUrl = function(jobName){
        return jex.JENKINS_URL + "/job/" + jobName + "/" + jex.BUILD_NUMBER + "/" + jex.API_SUFFIX;
    };

    jex.log = function (args) {
        if (typeof console !== 'undefined' && typeof console.log !== 'undefined') {
            jex.log(args);
        }
    };

    jex.getColor = function(result) {
        var color = [0, 0, 255, 200];
        if (result == jex.UNSTABLE) {
            color = [255, 255, 0, 200];
        } else if (result == jex.FAILURE) {
            color = [255, 0, 0, 200];
        } else if (result == jex.ABORTED) {
            color = [200, 200, 200, 200];
        }
        return color;
    }

    jex.getIconUrl = function(result) {
        var icon = "img/success.png";
        if (result == jex.UNSTABLE) {
            icon = "img/unstable.png";
        } else if (result == jex.FAILURE) {
            icon = "img/failure.png";
        } else if (result == jex.ABORTED) {
            icon = "img/aborted.png";
        }
        return icon;
    }

    if (!Array.prototype.remove) {
        Array.prototype.removeItem = function (item) {
            var i = this.indexOf(item);
            return i > -1 ? this.slice(i, 1) : [];
        };
    }

})(this.jex = this.jex || {}, jQuery);
