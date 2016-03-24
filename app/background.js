chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.eventName == "initContextMenu") {
        chrome.contextMenus.create({
            "id": "addJobToQueue",
            "title": "Subcribe Jenkins Job",
            "contexts": ["link"]
        });
    }
    else if(request.eventName == "loadPopupDataResult"){

    }
    else if (request.eventName == "updateBadgeText") {
        if(request.data){
          var number = request.data.text,
              color = request.data.background;

          chrome.browserAction.setBadgeText({ text: String(number) });
          chrome.browserAction.setBadgeBackgroundColor({ color: color });
        }
    }
    else if (request.eventName == "notify") {
        if(request.data){
          var option = {
              type: 'basic',
              title: request.data.title,
              message: request.data.message,
              iconUrl: request.data.icon
          };
          chrome.notifications.create("", option, function (id) { /* Do nothing */ });
        }
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
