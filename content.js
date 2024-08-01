chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "getLabelAndValue") {
      // 发送页面的 HTML 内容给 popup.js
      const data = getLabelAnValue();
      console.log(data);
      sendResponse({processedData: data});
    }
});

function getLabelAnValue(){
  // 获取当前页面的所有属性值和属性名
  // 选择具有特定类名的元素
  const infobox = document.querySelector('.infobox');
  // 获取infobox的tbody子元素
  const tbodyChildren = infobox.querySelector('tbody');
  // 获取tbody下的第一个tr元素
  var Tr = tbodyChildren.querySelector('tr');
  // 获取关键词
  const name_ = document.querySelector(".mw-page-title-main").textContent;
  const valueLabelsBox = [];
  valueLabelsBox.push([name_,'keyword_'])
  var toprow = "";
  while(Tr){
    const th = Tr.querySelector('th');
    const td = Tr.querySelector('td');
    var parentClassName;

    if (th != null) {
      parentClassName = th.parentElement.className;
      //console.log(th + '\n' + td);
      var label = RemakeValue(th.textContent);
      var value = "";
      if(td != null)value = RemakeValue(td.textContent);
      // 如果是头元素
      if(parentClassName == 'mergedtoprow'){
        toprow = label;
        valueLabelsBox.push([value,'*' + label]);
      }
      else if (label[0] == '•'|| label[0] == '-')valueLabelsBox.push([value,label]);
      else valueLabelsBox.push([value,label]);
      //console.log(toprow);
    }
    Tr = Tr.nextElementSibling;
  }
  return valueLabelsBox;
}
function RemakeValue(inputString) {
  // 去除value中的无效字符
  //console.log(inputString);
  const withoutComments = inputString.replace(/\/\*[\s\S]*?\*\//g, '');
  const withoutCSSRules = withoutComments.replace(/[^{]*\{[^}]+\}/g, '');
  
  return withoutCSSRules.replace(/\s+/g, "").replace(/\[[^\]]*\]/g, '');
}
