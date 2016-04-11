function buildPopupModels(jobs){
    var result = [];
    $.each(jobs, function(index, job){
        result.push({
            dangerClass: job.status == 'FAILURE' ? 'alert-danger' : '',
            iconImg: getIconUrl(job.status),
            fullDisplayName: job.fullDisplayName()
        })
    });

    return result;
}

function getIconUrl(result) {
    var icon = "img/success.png";
    if (result == "UNSTABLE") {
        icon = "img/unstable.png";
    } else if (result == "FAILURE") {
        icon = "img/failed.png";
    } else if (result == "ABORTED") {
        icon = "img/aborted.png";
    } else if(result == null) {//in-progress

    }
    return icon;
}

function getAllJobs(){
    var data = (localStorage["dataStore"] ? JSON.parse(localStorage["dataStore"]) : {}),
        jobs = data['jobs'];

    var result =[];
    $.each(jobs, function(index, item){
        if(item){
            var job = new Job(item.name, item.url, item.status);
            result.push(job);
        }
    });

    return result;
}

function Job(name, url, status, lastBuild){
    this.name = name;
    this.url = url;
    this.status = status;
    this.lastBuild = lastBuild;

    this.setLastBuild = function(number){
        this.lastBuild = number;
    }

    this.fullDisplayName = function(){
        var numberPart = this.lastBuild == undefined ? '' : ' #' + this.lastBuild;
        return this.name + numberPart;
    }

    this.isEqual = function(job){
        return JSON.stringify(this) === JSON.stringify(job);
    }
}

window.onload = function() {
    var jobs = getAllJobs();

    var popupModels = buildPopupModels(jobs);
    var message = {
            command:'render',
            context: { jobs: popupModels }
        };
    var iframe = document.getElementById('theFrame');
    iframe.contentWindow.postMessage(message, '*');
};

window.addEventListener('message', function(event) {
    if (event.data.html) {
      console.log(event.data.html);
      $('#jobListGroup').append(event.data.html);
    }
});
