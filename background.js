
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "getleftValue") {
        chrome.storage.sync.get(['leftValue'], function(result) {
            // 将结果发送回 content script
            chrome.tabs.sendMessage(sender.tab.id, {action: "leftValue", data: result});
        });
    }else if (request.action === "getrightValue"){
        chrome.storage.sync.get(['rightValue'], function(result) {
            // 将结果发送回 content script
            chrome.tabs.sendMessage(sender.tab.id, {action: "rightValue", data: result});
        });
    }
});