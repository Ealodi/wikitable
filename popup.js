
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
var lastLeftValue = "";
var lastRightValue = "";
var buttonContainer;
const blackList = ['Capital','*GDP(PPP)','Time zone','Calling code','*GDP (nominal)'];
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


readData();


function getLabelAnValue(doc){
  // 获取当前页面的所有属性值和属性名
  // 选择具有特定类名的元素
  const infobox = doc.querySelector('.infobox');
  // 获取infobox的tbody子元素
  const tbodyChildren = infobox.querySelector('tbody');
  // 获取tbody下的第一个tr元素
  var Tr = tbodyChildren.querySelector('tr');
  // 获取关键词
  const name_ = doc.querySelector(".mw-page-title-main").textContent;
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
        // 如果是值行
        const value1 = d.rowData[0];
        const value2 = d.rowData[2];
        const nowvalue = d.index == 0 ? value1 : value2;

        const regex = /(\d+(\.\d+)?)%/g;
        const isPercentNum = nowvalue.match(regex) || [];
        //console.log(isPercentNum);
        if (isPercentNum.length != 0){
          // 如果可以画饼图
          drawPieChart(cell,isPercentNum,(d.index === 0 ? "#02D2C5" : "#40B1F1"));
        }else {
          //console.log(d);
          let widthBl;
          const intvalue1 = extractNumbersFromString(value1);
          const intvalue2 = extractNumbersFromString(value2);
          //console.log(d.rowData[1]);
          const isInBlackList = blackList.includes(d.rowData[1]);
          //console.log(d.rowData[0] + "\n" + intvalue1);
          if (intvalue1 !== null && intvalue2 !== null && !isInBlackList) {
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
        }

      } else {
        // 对于其他列的单元格，直接显示值
        cell
          .attr("width","30%")
          .attr("class", d.value[0] == '*' ? "mainTag labelcell" : "labelcell")
          .append("button")  // 添加按钮元素
          .style("width", "100%")  // 按钮宽度填充单元格
          .style("height", "100%")  // 按钮高度填充单元格
          .text(d.value)  // 按钮上的文字
          .attr("title", d.value)  // 鼠标悬停显示提示文字
          .on("click", function() {
            alert("You clicked on: " + d.value);  // 点击按钮时弹出提示
          });
      }
    });
  updateTitle(infoBoxContent);
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
        if(getSimilarity(name,array2[i][1]) >= 80 && !mergedArray.some(subArray => subArray[1] === name)){
          // 如果1 和 2 中的项名称相同 并且新数组中没用出现过这个名称
          if (name[0] == '•' || name[0] == '-'){
            // 如果是子类
            if(array1_top == array2_top && array1_top != null)
              mergedArray.push([value,name,array2[i][0]]);
          }else {
            //if (name[0] = '*')mergedArray.push(['','','']);
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
async function readData(){
  // const leftValue = JSON.parse(localStorage.getItem('leftValue'));
  // if(leftValue)lastLeftValue = leftValue;

  // const rightValue = JSON.parse(localStorage.getItem('rightValue'));
  // if(rightValue)lastRightValue = rightValue;
  const leftData = await dataFromHtml('https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/wiki/France');
  const rightData = await dataFromHtml('https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/wiki/China');
  //console.log(leftData);
  const mergedata = mergeArrays(leftData,rightData);
  if(mergedata){
    writeData(mergedata);
  }
}
async function dataFromHtml(url) {
  // 从html分离表格内容
  const html = await fetchHtml(url);  // 使用 await 等待 fetchHtml 完成
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const data = getLabelAnValue(doc);  // 提取表格数据
  return data;  // 返回数据
}
function deleteNoNumberRow(){
  //if (block1.text() != "" && block3.text() != ""){
    // 如果已经开始对比了
    console.log("start deleteNum");

    d3.selectAll('tr.trl').each(function() {

      const tr = d3.select(this);
      const second = tr.select('td:nth-child(2) button');
      // try {
      //   // 选取第一个 td 元素的 rect
      //   const firstRect = tr.select('td:nth-child(1) svg rect').attr('fill');
      //   // 选取第三个 td 元素的 rect
      //   const thirdRect = tr.select('td:nth-child(3) svg rect').attr('fill');

      //   if (firstRect === 'none'  && thirdRect === 'none' && second.text()[0] != '*' && second.text() != '') {
      //     // 选择表格元素
      //     var table = d3.select(".DataTable");
      //     table.style("height", parseInt(table.style("height"), 10) - 30 + "px");

      //     tr.remove();  // 删除 tr 元素
      //   }
      // }catch(error){
      //   console.error("发生错误但被忽略:", error.message);
      // }
      if(second.text()[0] == '*'){
        // 去除 *

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
  //}
  // var tableHeight = 0;
  // d3.selectAll("tr.trl").each(function() {
  //   tableHeight += d3.select(this).node().offsetHeight; // 获取每个td的高度
  // });

  // if (tableHeight > 380){
  //   d3.select("body").style("height",120 + tableHeight + 'px');
  //   d3.select(".VisContainer").style("height",120 + tableHeight + 'px');
  // }
  // else d3.select("body").style("height",500 - (380 - tableHeight) + 'px');

  // d3.select(".botContainer").style("height",tableHeight + 'px');
  // d3.select(".DataTable").style("height",tableHeight + 'px');
}
function drawPieChart(selector, percentages, color1) {
  const data = percentages.map(d => parseFloat(d) / 100);
  const width = 100;
  const height = 100;
  const radius = Math.min(width, height) / 2;
  console.log(percentages);
  const svg = selector.append("svg")
      .attr("width", width)
      .attr("height", height)
      .style("display", "block")
      .style("margin", "auto")
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

  const color = d3.scaleOrdinal(d3.schemeCategory10);

  const pie = d3.pie();

  const arc = d3.arc()
      .innerRadius(0)
      .outerRadius(radius);

  const arcs = svg.selectAll("arc")
      .data(pie(data))
      .enter()
      .append("g");

  arcs.append("path")
      .attr("d", arc)
      .attr("fill", (d, i) => color(i));
  // 对数据进行排序，找到数值最大的三个区块
  const sortedData = data
  .map((value, index) => ({ value, index }))
  .sort((a, b) => b.value - a.value)
  .slice(0, 3);  // 取出最大的三个
  console.log(sortedData);
  // 在数值最大的三个区块上添加百分比标签
  arcs.append("text")
      .attr("transform", d => `translate(${arc.centroid(d)})`)
      .attr("text-anchor", "middle")
      .attr("font-size", "10px")
      .attr("fill", "#fff")
      .text((d, i) => {
          // 检查当前区块是否是数值最大的三个之一
          const isTop3 = sortedData.some(item => item.index === i);
          return isTop3 ? percentages[i] : '';  // 如果是最大三个之一，显示百分比，否则不显示
      });
  }

async function fetchHtml(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      return response.status;
    }
    const html = await response.text();
    return html; // 返回获取到的 HTML
  } catch (error) {
    console.error('请求失败: ', error);
    //throw error;
  }
}