chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.eventName == "initContextMenu") {
        chrome.contextMenus.create({
            "id": "addJobToQueue",
            "title": "Subcribe Jenkins Job",
            "contexts": ["link"]
        });
    }
    else if (request.eventName == "updateBadgeText") {
        var number = request.number,
            color = request.color;

        chrome.browserAction.setBadgeText({ text: String(number) });
        chrome.browserAction.setBadgeBackgroundColor({ color: color });
    }
    else if (request.eventName == "notify") {
        var jobName = request.jobName,
            number = request.number,
            status = request.status,
            icon = request.icon;

        var option = {
            type: 'basic',
            title: "#" + number + " (" + status + ")",
            message: jobName,
            iconUrl: icon
        };
        chrome.notifications.create("", option, function (id) { /* Do nothing */ });
    }
});

chrome.contextMenus.onClicked.addListener(function (info, tab) {
    if (info.menuItemId == "addJobToQueue") {
        var linkUrl = info.linkUrl || "";
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            var activeTab = tabs[0];
            chrome.tabs.sendMessage(activeTab.id, { "eventName": "addJobToQueue", "jobUrl": linkUrl });
        });
    }
});

