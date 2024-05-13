// background.js

function injectD3() {
  return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      // 设置 script 元素的 src 属性为 D3.js 文件的 URL
      script.src = chrome.runtime.getURL('d3.v5.min.js');
      script.onload = resolve;
      script.onerror = reject;
      // 将 script 元素添加到页面中
      (document.head || document.documentElement).appendChild(script);
  });
}
// 注入 D3.js 并发送消息给 content script
injectD3().then(() => {
  console.log("d3 注入成功");
  const script = document.createElement('script');
  // 设置脚本的 src 属性为你想要注入的脚本的 URL
  script.src = chrome.runtime.getURL('main.js');
  // 将脚本插入到页面中的 <head> 元素中
  document.body.appendChild(script);
});