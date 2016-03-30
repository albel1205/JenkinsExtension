(function(jex){
    jex.BUILD_NUMBER = "lastBuild";
    jex.API_SUFFIX = "api/json";
    jex.JENKINS_URL = "https://ci.orientsoftware.net";
    jex.UNSTABLE = "UNSTABLE";
    jex.FAILURE = "FAILURE";
    jex.ABORTED = "ABORTED";
    
    jex.getJobNameFromUrl = function(url) {
        var result = "";

        var urlParts = url.split("/");
        while (result == "") {
            result = urlParts.pop();
        }

        return result;
    };

    jex.getJobNameFromBuildUrl = function(url, number){
      var numberIndex = url.indexOf(number);
      var jobUrl = url.substring(0, numberIndex);
      return jex.getJobNameFromUrl(jobUrl);
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
            console.log(args);
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
        } else if(result == null) {//in-progress

        }
        return color;
    };

    jex.getIconUrl = function(result) {
        var icon = "img/success.png";
        if (result == jex.UNSTABLE) {
            icon = "img/unstable.png";
        } else if (result == jex.FAILURE) {
            icon = "img/failure.png";
        } else if (result == jex.ABORTED) {
            icon = "img/aborted.png";
        } else if(result == null) {//in-progress

        }
        return icon;
    };

    jex.sendMessageToBackground = function(eventName, data){
        chrome.runtime.sendMessage({
            eventName: eventName,
            data: data
        });
    };

    if (!Array.prototype.remove) {
        Array.prototype.removeItem = function (item) {
            var i = this.indexOf(item);
            return i > -1 ? this.slice(i, 1) : [];
        };
    };
})(this.jex = this.jex || {});
