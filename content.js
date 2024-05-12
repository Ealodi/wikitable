
// content.js
// import * as d3 from './d3.v5.min.js';

// chrome.runtime.sendMessage({action: "injectD3"});
const script = document.createElement('script');
// 设置 script 元素的 src 属性为 D3.js 文件的 URL
script.src = chrome.runtime.getURL('d3.v5.min.js');
// 将 script 元素添加到页面中
(document.head || document.documentElement).appendChild(script);
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


// //关闭（老版本）
// const closeButton = document.createElement("button");
// closeButton.textContent = "CLOSE";
// closeButton.addEventListener("click", () => {
//   container.style.display = "none";
// });

// containerMid.appendChild(closeButton);

// 关闭（2.0版本）display--none
const closeButton = document.createElement("button");
closeButton.classList.add("closeButton");
// 设置按钮文本内容为 × 表示关闭
closeButton.innerHTML = `
  <svg t="1715251940085" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="40" height="40" stroke="none">
    <path d="M872.802928 755.99406 872.864326 755.99406 872.864326 755.624646Z" fill="#272536"></path>
    <path d="M927.846568 511.997953c0-229.315756-186.567139-415.839917-415.838893-415.839917-229.329059 0-415.85322 186.524161-415.85322 415.839917 0 229.300406 186.524161 415.84094 415.85322 415.84094C741.278405 927.838893 927.846568 741.29836 927.846568 511.997953M512.007675 868.171955c-196.375529 0-356.172979-159.827125-356.172979-356.174002 0-196.374506 159.797449-356.157629 356.172979-356.157629 196.34483 0 356.144326 159.783123 356.144326 356.157629C868.152001 708.34483 708.352505 868.171955 512.007675 868.171955" fill="#272536"></path>
    <path d="M682.378947 642.227993 553.797453 513.264806 682.261267 386.229528c11.661597-11.514241 11.749602-30.332842 0.234337-41.995463-11.514241-11.676947-30.362518-11.765975-42.026162-0.222057L511.888971 471.195665 385.223107 344.130711c-11.602246-11.603269-30.393217-11.661597-42.025139-0.059352-11.603269 11.618619-11.603269 30.407544-0.059352 42.011836l126.518508 126.887922L342.137823 639.104863c-11.662621 11.543917-11.780301 30.305213-0.23536 41.96988 5.830799 5.89015 13.429871 8.833179 21.086248 8.833179 7.53972 0 15.136745-2.8847 20.910239-8.569166l127.695311-126.311801L640.293433 684.195827c5.802146 5.8001 13.428847 8.717546 21.056572 8.717546 7.599072 0 15.165398-2.917446 20.968567-8.659217C693.922864 672.681586 693.950494 653.889591 682.378947 642.227993" fill="#272536"></path>
  </svg>
`;

// 将按钮添加到容器中
container.appendChild(closeButton);

// 将容器添加到页面中
document.body.appendChild(container);
closeButton.addEventListener("click", () => {
  container.style.display = "none";
});
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

// 显示
const button = document.createElement("button");
button.classList.add("startButton");
button.textContent = "显示";

// 创建 SVG 图标(显示按钮)
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








// //左右版本1.0
// // 添加按钮 左
// const detectButton = document.createElement("button");
// detectButton.textContent = "添加到左侧";
// containerMid.appendChild(detectButton);


// // 添加按钮 右
// const detectButtonRight = document.createElement("button");
// detectButtonRight.textContent = "添加到右侧";
// containerMid.appendChild(detectButtonRight);
// 创建按钮容器
const buttonContainer = document.createElement("div");
buttonContainer.classList.add("buttonContainer");
container.appendChild(buttonContainer);

const buttonSize = "40px"; // 按钮的宽度和高度

//添加的左按钮
const detectButton = document.createElement("button");
detectButton.classList.add("leftAddButton");
// detectButton.textContent = "添加到左侧";
// 创建 SVG 图标
const svgIcon1 = document.createElementNS("http://www.w3.org/2000/svg", "svg");
svgIcon1.setAttribute("viewBox", "0 0 24 24"); // 设置视图框
svgIcon1.setAttribute("width", "100%"); // 设置宽度为按钮的一半
svgIcon1.setAttribute("height", "100%"); // 设置高度为按钮的一半

// 创建 SVG 路径
const path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
path1.setAttribute("d", "M7 11h10m-5-5v10"); // 设置路径为加号

// 设置路径的样式
path1.setAttribute("stroke", "#02D2C5"); // 设置填充颜色为黑色
path1.setAttribute("stroke-width", "2"); // 设置路径线条的宽度
// 将路径添加到 SVG 图标中
svgIcon1.appendChild(path1);
path1.style.transform = "scale(2) translate(-25%, -23%)";
// 将 SVG 图标添加到按钮中
detectButton.appendChild(svgIcon1);
buttonContainer.appendChild(detectButton);


//右边的按钮：
const detectButtonRight = document.createElement("button");
detectButtonRight.classList.add("rightAddButton");
const svgIcon2 = document.createElementNS("http://www.w3.org/2000/svg", "svg");
svgIcon2.setAttribute("viewBox", "0 0 24 24"); // 设置视图框
svgIcon2.setAttribute("width", "100%"); // 设置宽度为按钮的一半
svgIcon2.setAttribute("height", "100%"); // 设置高度为按钮的一半
const path2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
path2.setAttribute("d", "M7 11h10m-5-5v10"); // 设置路径为加号
path2.setAttribute("stroke", "#40B1F1"); // 设置填充颜色为黑色
path2.setAttribute("stroke-width", "2"); // 设置路径线条的宽度
// 将路径添加到 SVG 图标中
svgIcon2.appendChild(path2);
path2.style.transform = "scale(2) translate(-25%, -23%)";
// 将 SVG 图标添加到按钮中
detectButtonRight.appendChild(svgIcon2);
buttonContainer.appendChild(detectButtonRight);

var lastLeftValue = '';
var lastRightValue = '';
// 清空列表1.0
const clearButton = document.createElement("button");
clearButton.classList.add("clearButton");
// clearButton.textContent = "clean";
const svgIcon3 = document.createElementNS("http://www.w3.org/2000/svg", "svg");
svgIcon3.setAttribute("viewBox", "0 0 1024 1024");
svgIcon3.setAttribute("width", "20px");
svgIcon3.setAttribute("height", "20px");
const path3 = document.createElementNS("http://www.w3.org/2000/svg", "path");
path3.setAttribute("d", "M687.6 96.4H336.4v91.2h351.1V96.4zM636.7 398v405.5h-73.9V398h73.9z m-175.5 0v405.5h-73.9V398h73.9z m332.1-119.2H230.7l27.9 648.8h506.7l28-648.8zM696.8 5.1c40.4 0 73.3 35.6 73.9 79.8v102.7h147.8c20.2 0 36.6 17.8 37 39.9v41.2c0 5.5-4 10-9 10.1h-70.1L848 941.6c-1.8 42.9-33.7 76.6-72.6 77.3H249.8c-39 0-71.3-33.4-73.7-76l-0.1-1.3-28.5-662.7H77.7c-5 0-9.1-4.4-9.2-9.8v-40.9c0-22.2 16.2-40.2 36.3-40.5h148.4V86.2c0-44.3 32.5-80.4 72.7-81.1h370.9z");
path3.setAttribute("fill", "#DCA0A0");
// 将路径添加到 SVG 图标中
svgIcon3.appendChild(path3);
// 将 SVG 图标添加到清除按钮中
clearButton.appendChild(svgIcon3);
clearButton.addEventListener("click", () => {
  chrome.storage.sync.clear();
  clearTableLag();
  lastLeftValue = '';
  lastRightValue = '';
});

containerMid.appendChild(clearButton);

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
// var table;
// script.onload = function (){
//   table = d3.select(containerBot)
//         .append("table")
//         .attr("class","DataTable");
// }

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
            var widthBL;
            //if(intdata != '' && intdata2 != '')widthBL = (intdata / (intdata + intdata2)) * 100;
            widthBL = '100%';
            //console.log(item[1] + '\n' + cellData + ' ' + item[2-index] + '\n' + widthBL);
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
function extractNumbersFromString(numStr) {
  // Get the input text value
  var inputText = numStr;
  
  // Regular expression to match numbers outside parentheses and brackets
  var regex = /(?:^|\D)(\d+)(?![^\(]*\))(?![^\[]*\])(?![^\{]*\})(?:$|\D)/g;

  // Array to store matched numbers
  var numbers = [];
  
  // Match numbers in the input text
  var match;
  while ((match = regex.exec(inputText)) !== null) {
      numbers.push(match[1]);
  }

  // Check if numbers were found
  if (numbers.length === 1 && inputText.split(',').length <= 2) {
      // Output the numbers
      return numbers.join(", ");
  } else {
      // Output if no numbers were found
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