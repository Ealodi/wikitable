
// main.js
//import { OpenAI } from 'https://cdn.jsdelivr.net/npm/openai@4.47.2/index.min.js';
//import { Configuration, OpenAIApi } from 'https://cdn.jsdelivr.net/npm/openai@4.47.2/index.min.js';

//console.log(window.OpenAI);
var table;
var container;
var containerTop;
var containerMid;
var containerBot;
var block1;
var block2;
var block3;
var clearButton;
var lastLeftValue = "";
var lastRightValue = "";
var detectButtonRight;
var detectButton;
var buttonContainer;

// 创建容器元素
container = d3.select(".VisContainer");
containerTop = d3.select(".topContainer");
containerMid = d3.select(".midContainer");
containerBot = d3.select(".botContainer");
buttonContainer = d3.select(".buttonContainer");

block1 = containerTop.append("div")
    .text("")
    .classed("leftBlock", true)
    .style("flex", "1");
block2 = containerTop.append("div")
    .text("")
    .style("flex", "1");
block3 = containerTop.append("div")
    .classed("rightBlock", true)
    .text("")
    .style("flex", "1");
addLeftAddButton();
addClearButton();
addRightAddButton();

readData();

// 按下添加按钮 左
detectButton.addEventListener("click",() => {
  getLabelAndValue().then(function(data){
    lastLeftValue = data;
    localStorage.setItem('leftValue', JSON.stringify(data));
  
    const mergedata = mergeArrays(lastLeftValue,lastRightValue);
    console.log("mergedata:");
    console.log(mergedata);
    writeData(mergedata);
    updateTitle(mergedata);
  });

});
// 按下添加按钮 右
detectButtonRight.addEventListener("click",() => {
  getLabelAndValue().then(function(data){
    lastRightValue = data;
    localStorage.setItem('rightValue', JSON.stringify(lastRightValue));
    const mergedata = mergeArrays(lastLeftValue,lastRightValue);
    console.log("mergedata:");
    console.log(mergedata);
    writeData(mergedata);
    updateTitle(mergedata);
  });
  //console.log(lbAnValues);

});
function getLabelAndValue() {
  return new Promise(function(resolve, reject) {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, {action: "getLabelAndValue"}, function(response) {
              // 接收来自 content script 的响应
              console.log(response.processedData);
              resolve(response.processedData);
          });
      });
  });
}
function RemakeValue(inputString) {
  // 去除value中的无效字符
  //console.log(inputString);
  const withoutComments = inputString.replace(/\/\*[\s\S]*?\*\//g, '');
  const withoutCSSRules = withoutComments.replace(/[^{]*\{[^}]+\}/g, '');
  
  return withoutCSSRules.replace(/\s+/g, "").replace(/\[.*?\]/g, '');
}
function writeData(infoBoxContent) {
  // 将数据写入表格展示
  clearTableLag();
  const table = containerBot
    .append("table")
    .attr("class", "DataTable");
  const tbody = table.append("tbody");
  // 创建行
  const rows = tbody.selectAll("tr")
    .data(infoBoxContent)
    .enter()
    .append("tr")
    .attr("class", "trl");
  // 创建单元格
  const cells = rows.selectAll("td")
    .data((d, i) => {
      return d.map((value, index) => {
        return { value: value, index: index, rowNumber: i, rowData: d };
      });
    })
    .enter()
    .append("td")
    .attr("class", (d) => {
      return d.index === 1 ? "labelTd Tdinject" : d.index == 0 ? "valueTd leftTd" : "valueTd rightTd";
    })
    .each(async function (d) {
      const cell = d3.select(this);
      if (d.index === 0 || d.index === 2) {
        //console.log(d);
        let widthBl;
        const intvalue1 = extractNumbersFromString(d.rowData[0]);
        const intvalue2 = extractNumbersFromString(d.rowData[2]);
        //console.log(d.rowData[0] + "\n" + intvalue1);
        if (intvalue1 !== null && intvalue2 !== null) {
          // 如果都是数字
          const total = parseFloat(intvalue1) + parseFloat(intvalue2);
          widthBl = (parseFloat(d.index == 0 ? intvalue1 : intvalue2)) / total * 100;
        } else {
          widthBl = 100;
        }

        const svg = cell.append("svg")
          .attr("width", "100%")
          .attr("height", 30)
          .attr("display", "block");

        // 获取svg的宽度
        const svgWidth = parseFloat(svg.style("width"));
        const rectWidth = svgWidth * (widthBl / 100);
        
        const rect = svg.append("rect")
          .attr("width", rectWidth + 'px')
          .attr("height", '100%')
          .attr("x", d.index === 0 ? svgWidth - rectWidth : 0)
          .attr("fill", widthBl === 100 ? "none" : (d.index === 0 ? "#02D2C5" : "#40B1F1")); // 设置透明
        
        const text = svg.append("text")
          .attr("font-size", 15) // 保持字体大小不变
          .attr("fill", "black")
          .text(d.value)
          .attr("x", d.index == 0 ? svgWidth - 10 : 5)
          .attr("y", 20)
          .attr("text-anchor", d.index == 0 ? "end" : "start");;
        
        // 截断文字并显示省略号
        const availableWidth = parseFloat(svgWidth) - 10; // 10px用于文字偏移
        const textNode = text.node();
        const textWidth = textNode.getComputedTextLength();
        if (textWidth > availableWidth) {
          const charsToShow = Math.floor(availableWidth / textWidth * d.value.length);
          const lStr = d.value.substring(0, charsToShow - 3) + '...';
          text.text(lStr);
        }
        text.append("title")
          .text(d.value);
      } else {
        // 对于其他列的单元格，直接显示值
        cell
          .attr("width","30%")
          .attr("class", d.value[0] == '*' ? "mainTag labelcell" : "labelcell")
          .text(d.value)
          .attr("title", d.value);
      }
    });
  deleteNoNumberRow();
}
function clearTableLag() {
  containerBot.selectAll("table").remove();
}
function updateTitle(mergedata){
  // 更新标题
  block1.text(mergedata[0][0]);
  block3.text(mergedata[0][2]);
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
  var array1_top = null;
  // 遍历第一个数组，合并数据
  array1.forEach(([value, name]) => {
    // 如果值不为null
    if(value != null && name != null){
      if (name[0] == "*")array1_top = name;
      var array2_top = null;
      for(var i = 0;i < array2.length;i++){
        if(array2[i][1][0] == "*")array2_top = array2[i][1];
        if(name == array2[i][1] && !mergedArray.some(subArray => subArray[1] === name)){
          // 如果1 和 2 中的项名称相同 并且新数组中没用出现过这个名称
          if (name[0] == '•' || name[0] == '-'){
            // 如果是子类
            if(array1_top == array2_top && array1_top != null)
              mergedArray.push([value,name,array2[i][0]]);
          }else {
            //if (name[0] == '*')mergedArray.push(['','','']);
            mergedArray.push([value,name,array2[i][0]]);
          }
        }
      }
    }
  });
  console.log(mergedArray);
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
  // 使用正则表达式提取第一个数字
  const match = numStr.match(/\d+([\d,]*)?(\.\d+)?/);
  if (match) {
    // 如果匹配到数字，去掉数字中的逗号并返回
    return match[0].replace(/,/g, '');
  } else {
    // 如果没有匹配到数字，返回 null
    return null;
  }
}
function readData(){
  const leftValue = JSON.parse(localStorage.getItem('leftValue'));
  if(leftValue)lastLeftValue = leftValue;

  const rightValue = JSON.parse(localStorage.getItem('rightValue'));
  if(rightValue)lastRightValue = rightValue;

  const mergedata = mergeArrays(lastLeftValue,lastRightValue);
  if(mergedata){
    writeData(mergedata);
    updateTitle(mergedata);
  }
}
function deleteNoNumberRow(){
    d3.selectAll('tr.trl').each(function() {
      const tr = d3.select(this);
      // 选取第一个 td 元素的 rect
      const firstRect = tr.select('td:nth-child(1) svg rect').attr('fill');
      const second = tr.select('td:nth-child(2)');
      // 选取第三个 td 元素的 rect
      const thirdRect = tr.select('td:nth-child(3) svg rect').attr('fill');
      //console.log(second);
      // if (second.text()[0] == '*' && firstRect !== 'none' && thirdRect !== 'none'){
      //   second.style("border",'1px solid black');
      // }
      if (firstRect === 'none'  && thirdRect === 'none' && second.text()[0] != '*' && second.text() != '') {
        // 选择表格元素
        var table = d3.select(".DataTable");
        table.style("height", parseInt(table.style("height"), 10) - 30 + "px");

        tr.remove();  // 删除 tr 元素
      }

      if(second.text()[0] == '*'){
        // 去除*

        // 获取目标元素的前一个兄弟元素
        var previousElement = second.node().previousElementSibling;
        if (previousElement) 
            d3.select(previousElement).node().classList.add("parentValueTd");
        // 获取目标元素的后一个兄弟元素
        var nextElement = second.node().nextElementSibling;
        if (nextElement)
            d3.select(nextElement).node().classList.add("parentValueTd");
        second.text(second.text().substring(1));
      }else if (second.text()[0] == '•' || second.text()[0] == '-'){
        // 将• 固定到最左边
        var firstChar = second.text()[0];
        second.html('<span class="fixed-left">' + firstChar + '</span>' + second.text().substring(1));
      }
  });
  const rowCount = d3.selectAll("tr.trl").size();
  const tableHeight = rowCount * 30;
  console.log(tableHeight);
  if (tableHeight > 380)
    d3.select("body").style("height",120 + tableHeight + 'px');
  else d3.select("body").style("height",500 - (380 - tableHeight) + 'px');

  d3.select(".botContainer").style("height",tableHeight + 'px');
  // d3.select("tbody").style("height",tableHeight + 'px');
  d3.select(".DataTable").style("height",tableHeight + 'px');
}
function addClearButton(){
  // 清空列表1.0
  clearButton = document.createElement("button");
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
    localStorage.clear();
    clearTableLag();
    lastLeftValue = '';
    lastRightValue = '';
    block1.textContent = "";
    block3.textContent = "";
  });
  buttonContainer.node().appendChild(clearButton);
}
function addLeftAddButton(){
  //添加的左按钮
  detectButton = document.createElement("button");
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
  buttonContainer.node().appendChild(detectButton);
}
function addRightAddButton(){
  //右边的按钮：
  detectButtonRight = document.createElement("button");
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
  buttonContainer.node().appendChild(detectButtonRight);
}