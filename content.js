// content.js
// 创建容器元素
const container = document.createElement("div");
container.classList.add("VisContainer");

const containerTop = document.createElement("div");
containerTop.classList.add("topContainer");

const containerMid = document.createElement("div");
containerMid.classList.add("midContainer");

const containerBot = document.createElement("div");
containerBot.classList.add("botContainer");

container.appendChild(containerTop);
container.appendChild(containerMid);
container.appendChild(containerBot);
// 关闭
const closeButton = document.createElement("button");
closeButton.textContent = "关闭";
closeButton.addEventListener("click", () => {
  container.style.display = "none";
});

containerMid.appendChild(closeButton);

// 创建三个子元素作为三块
const block1 = document.createElement("div");
block1.textContent = ""; // 给子元素添加内容
block1.classList.add("leftBlock");
block1.style.flex = "1"; // 子元素自动填充剩余空button

const block2 = document.createElement("div");
block2.textContent = ""; // 给子元素添加内容
block2.style.flex = "1"; // 子元素自动填充剩余空间

const block3 = document.createElement("div");
block3.classList.add("rightBlock");
block3.textContent = ""; // 给子元素添加内容
block3.style.flex = "1"; // 子元素自动填充剩余空间

// 将三个子元素添加到 header 元素中
containerTop.appendChild(block1);
containerTop.appendChild(block2);
containerTop.appendChild(block3);

// 将容器添加到页面中
document.body.appendChild(container);

// 显示
const button = document.createElement("button");
button.classList.add("startButton");
button.textContent = "显示";

// 创建 SVG 图标
const svgIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
svgIcon.setAttribute("viewBox", "0 0 1024 1024");
svgIcon.setAttribute("width", "20");
svgIcon.setAttribute("height", "20");
svgIcon.style.marginRight = "5px"; // 调整图标与按钮文本之间的间距
// 创建 SVG 路径
const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
path.setAttribute("d", "M213.333 308.513c-23.564 0-42.666-19.103-42.666-42.667s19.102-42.667 42.666-42.667h597.334c23.564 0 42.666 19.103 42.666 42.667s-19.102 42.667-42.666 42.667H213.333z m0 262.564c-23.564 0-42.666-19.103-42.666-42.667s19.102-42.666 42.666-42.666h597.334c23.564 0 42.666 19.102 42.666 42.666 0 23.564-19.102 42.667-42.666 42.667H213.333z m0 262.564c-23.564 0-42.666-19.102-42.666-42.667 0-23.564 19.102-42.666 42.666-42.666h597.334c23.564 0 42.666 19.102 42.666 42.666 0 23.565-19.102 42.667-42.666 42.667H213.333z");
path.setAttribute("fill", "#2c2c2c");
// 将路径添加到 SVG 图标中
svgIcon.appendChild(path);
// 将 SVG 图标添加到按钮中
button.appendChild(svgIcon);
// 将按钮添加到文档主体中
document.body.appendChild(button);

// 添加按钮 左
const detectButton = document.createElement("button");
detectButton.textContent = "添加到左侧";
containerMid.appendChild(detectButton);

// 添加按钮 右
const detectButtonRight = document.createElement("button");
detectButtonRight.textContent = "添加到右侧";
containerMid.appendChild(detectButtonRight);


var lastLeftValue = '';
var lastRightValue = '';
// 清空列表
const clearButton = document.createElement("button");
clearButton.textContent = "清空";
containerMid.appendChild(clearButton);

clearButton.addEventListener("click", () => {
  chrome.storage.sync.clear();
  clearTableLag();
  lastLeftValue = '';
  lastRightValue = '';
});
// 当按钮被点击时，显示或隐藏容器
button.addEventListener("click", () => {
  if (container.style.display === "none") {
    container.style.display = "block";
  } else {
    container.style.display = "none";
  }
});

// 当按钮被点击时，显示或隐藏容器
button.addEventListener("click", () => {
  if (container.style.display === "none") {
    container.style.display = "block";
  } else {
    container.style.display = "none";
  }
});

const table = document.createElement('table');
table.classList.add("DataTable");
//table.style.borderCollapse = 'collapse';
containerBot.appendChild(table);


// 从存储中获取数据
chrome.storage.sync.get(['leftValue'], function(result) {
  // 如果存储中有数据，将其应用于页面
  if(result.leftValue)lastLeftValue = result.leftValue;
  const mergedata = mergeArrays(lastLeftValue,lastRightValue);
  writeData(mergedata);
  updateTitle(mergedata);
});
chrome.storage.sync.get(['rightValue'], function(result) {
  if(result.rightValue)lastRightValue = result.rightValue;
  const mergedata = mergeArrays(lastLeftValue,lastRightValue);
  writeData(mergedata);
  updateTitle(mergedata);
});


// 按下添加按钮 左
detectButton.addEventListener("click",() => {
  lastLeftValue = getLabelAnValue();
  chrome.storage.sync.set({ 'leftValue': lastLeftValue }, function() {
    console.log('leftData is saved.');
    console.log(lastLeftValue);
  });
  
  const mergedata = mergeArrays(lastLeftValue,lastRightValue);
  console.log("mergedata:");
  console.log(mergedata);
  writeData(mergedata);
  updateTitle(mergedata);
});
// 按下添加按钮 右
detectButtonRight.addEventListener("click",() => {
  lastRightValue = getLabelAnValue();
  //console.log(lbAnValues);
  chrome.storage.sync.set({ 'rightValue': lastRightValue }, function() {
    console.log('rightData is saved.');
    console.log(lastRightValue);
  });
  const mergedata = mergeArrays(lastLeftValue,lastRightValue);
  console.log("mergedata:");
  console.log(mergedata);
  writeData(mergedata);
  updateTitle(mergedata);
});

function RemakeValue(inputString) {
  // 去除value中的无效字符
  //console.log(inputString);
  const withoutComments = inputString.replace(/\/\*[\s\S]*?\*\//g, '');
  const withoutCSSRules = withoutComments.replace(/[^{]*\{[^}]+\}/g, '');
  
  return withoutCSSRules;
}
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

    if (th != null && td != null) {
      //console.log(th + '\n' + td);

      var label = RemakeValue(th.textContent);
      const value = RemakeValue(td.textContent);
      // 如果是头元素
      if(th.className == 'mergedtoprow')toprow = label;
      else if (label[0] == '•' || label[1] == '•')valueLabelsBox.push([value,toprow + label]);
      else valueLabelsBox.push([value,label]);
    }
    Tr = Tr.nextElementSibling;
  }
  //console.log(valueLabelsBox);
  return valueLabelsBox;
}
function clearTableLag(){
  // 清空已有的表格内容
  // 获取表格的 tbody 元素
  const tbody = table.querySelector('tbody');
  // 如果存在 tbody 元素
  if (tbody) {
    // 清空 tbody 中的所有子元素（即表格行）
    tbody.innerHTML = '';
  }
  block1.textContent = "";
  block2.textContent = "";
}
function writeData(infoBoxContent){
  // 将数据写入表格展示
  clearTableLag();
  // 排序
  //infoBoxContent.sort(sortByNonEmptyValues);
  infoBoxContent.forEach(item => {
      var row = table.insertRow();
      item.forEach(function(cellData,index) {
          var cell = row.insertCell();
          // 创建一个包含内容的容器div
          var div = document.createElement("div");
          div.textContent = cellData;
          
          if(index == 0 || index == 2){
            var intdata = extractNumbersFromString(cellData);
            var intdata2 = extractNumbersFromString(item[2-index]);
            if(intdata == '')intdata = cellData;
            var widthBL;
            if(intdata != '' && intdata2 != '')widthBL = intdata / (intdata + intdata2) * 100;
            else widthBL = '100%';
            // 设置容器的圆角样式
            div.style.width = widthBL + '%';
            div.style.color = "white";
            div.style.backgroundColor = 'steelblue';
            //div.style.border = '1px solid #ddd'; // 设置单元格边框
            //div.style.padding = '5px'; // 设置单元格内边距
            //div.style.wordWrap = 'break-word';
            div.style.borderRadius = "5px"; // 设置圆角半径为5px
            //div.style.padding = "5px"; // 可选：添加内边距以改善样式
          }else{
            div.style.width = '100%';
            div.style.color = "black";
            //div.style.boxShadow = "5px 0px 10px rgba(0, 0, 0, 0.5), -5px 0px 10px rgba(0, 0, 0, 0.5)";
            div.style.borderLeft = "1px solid rgba(0, 0, 0, 0.5)"; // 左侧边框
            div.style.borderRight = "1px solid rgba(0, 0, 0, 0.5)"; // 右侧边框
          }
          //div.style.minHeight = '40px';
          
          // 清空单元格内容
          cell.textContent = "";
          // 将容器插入到单元格中
          cell.appendChild(div);

          //cell.textContent = cellData;
          //cell.style.color = "black";
          //cell.style.border = '1px solid #ddd'; // 设置单元格边框
          //cell.style.padding = '5px'; // 设置单元格内边距
          // cell.style.textOverflow = 'ellipsis';
          // cell.style.overflow = 'hidden';
          cell.style.wordWrap = 'break-word';
          cell.style.minWidth = "80px";
          cell.style.maxWidth = "80px";
      });
  });
}
function updateTitle(mergedata){
  // 更新标题
  block1.textContent = mergedata[0][0];
  block3.textContent = mergedata[0][2];
}
function mergeArrays(array1, array2) {
  // 创建一个映射表，将第二个数组的名称映射到其对应的值
  if (array1 == '' && array2 == '')return null;
  if(array1 == ''){
    const mergedArray = array2.map(([value, name]) => {
      return ['', name, value];
    });
    return mergedArray;
  }
  if (array2 == ''){
    const mergedArray = array1.map(([value, name]) => {
      return [value ,name, ''];
    });
    return mergedArray;
  } 
  const mergedArray = [];
  // 遍历第一个数组，合并数据
  array1.forEach(([value, name]) => {
    // 如果值不为null
    if(value != null && name != null){
      for(var i = 0;i < array2.length;i++){
        //console.log(array2[i][1] + '\n' + name + '\n' + getSimilarity(name,array2[i][1]));
        if(!array2[i][1] || !array2[i][0])continue;
        else if(getSimilarity(name,array2[i][1]) >= 80){
          //array2.splice(i,1);
          mergedArray.push([value, name, array2[i][0]]);
        }
      }
    }
  });
  //console.log(mergedArray);
  // // 如果第二个数组中存在但在第一个数组中不存在的名称
  // array2.forEach(([value, name]) => {

  //   if (!mergedArray.some(item => item[1] === name)) {
  //     // 在第一个数组的末尾添加一个新的二级数组
  //     mergedArray.push(['', name, value]);
  //   }
  // });

  return mergedArray;
}
// 字符串相似度比较
function getSimilarity(str1,str2) {
  if (str1 == null || str2 == null)return 0;
  let sameNum = 0
  //寻找相同字符
  for (let i = 0; i < str1.length; i++) {
      for(let j =0;j<str2.length;j++){
          if(str1[i]===str2[j]){
              sameNum ++ 
              break
          }
      }
  }
  // console.log(str1,str2);
  // console.log("相似度",(sameNum/str1.length) * 100);
  //判断2个字符串哪个长度比较长
  let length = str1.length > str2.length ? str1.length : str2.length
  return (sameNum/length) * 100 || 0
}
function fillPageTitle() {
  // 196--214 g添加查询页面中的 span.mw-page-title-main 元素功能
  const pageTitleElement = document.querySelector("span.mw-page-title");
  if (pageTitleElement) {
    const pageTitle = pageTitleElement.textContent;
    // 将页面标题填充到表格中
    const tbody = table.querySelector('tbody');
    if (tbody) {
      // 清空 tbody 中的所有子元素（即表格行）
      tbody.innerHTML = '';
      // 创建新行并添加页面标题
      const row = table.insertRow();
      const cell = row.insertCell();
      cell.textContent = "Page Title:";
      cell.style.fontWeight = "bold";
      const titleCell = row.insertCell();
      titleCell.textContent = pageTitle;
    }
  }
}
function extractNumbersFromString(inputText) {
  // 正则表达式匹配数字
  const regex = /(?:^|\D)(\d+)(?![^\(]*\))(?![^\[]*\])(?![^\{]*\})(?:$|\D)/g;

  // 匹配到的数字数组
  const numbers = [];
  
  // 在输入文本中匹配数字
  let match;
  while ((match = regex.exec(inputText)) !== null) {
      numbers.push(match[1]);
  }

  // 如果找到数字并且不是日期、编码或两个数字，则返回找到的数字
  if (numbers.length === 1 && inputText.split(',').length <= 2) {
      return "Numbers found: " + numbers.join(", ");
  } else {
      // 否则返回空字符串
      return "";
  }
}
// 关闭按钮的点击事件处理程序
closeButton.addEventListener("click", () => {
  // 隐藏容器
  container.style.visibility = "hidden";
});
//显示按钮的点击事件处理程序
button.addEventListener("click", () => {
  // 将容器的样式设置为显示
  container.style.visibility = "visible";
});
