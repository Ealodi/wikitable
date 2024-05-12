// background.js

// 监听来自 content script 的消息
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.action === "injectD3") {
        // 注入 D3.js 到页面中
        chrome.tabs.executeScript(sender.tab.id, {file: "d3.v5.min.js"});
    }
});