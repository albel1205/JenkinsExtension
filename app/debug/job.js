function Job(name, url, status){
    this.name = name;
    this.url = url;
    this.status = status;
    this.lastBuild = '';

    this.setLastBuild = function(number){
        this.lastBuild = number;
    }

    this.fullDisplayName = function(){
        var numberPart = this.lastBuild == '' ? '' : ' #' + this.lastBuild;
        return this.name + numberPart;
    }

    this.isEqual = function(job){
        return JSON.stringify(this) === JSON.stringify(job);
    }
}
