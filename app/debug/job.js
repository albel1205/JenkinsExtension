function Job(name, url){
    this.name = name;
    this.url = url;
    this.lastBuild = '';

    this.setLastBuild = function(number){
        this.lastBuild = number;
    }

    this.fullDisplayName = function(){
        var numberPart = this.lastBuild == '' ? '' : ' #' + this.lastBuild;
        return this.name + numberPart;
    }
}
