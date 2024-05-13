
// main.js
var table;
var container;
var containerTop;
var containerMid;
var containerBot;
var closeButton;
var block1;
var block2;
var block3;
var button;
var clearButton;
var lastLeftValue = "";
var lastRightValue = "";
var detectButtonRight;
var detectButton;
var buttonContainer;

// 创建容器元素
container = document.createElement("div");
container.classList.add("VisContainer");

containerTop = document.createElement("div");
containerTop.classList.add("topContainer");

containerMid = document.createElement("div");
containerMid.classList.add("midContainer");

containerBot = document.createElement("div");
containerBot.classList.add("botContainer");

// table = document.createElement('table');
// table.classList.add("DataTable");
// //table.style.borderCollapse = 'collapse';
// containerBot.appendChild(table);

container.appendChild(containerTop);
container.appendChild(containerMid);
container.appendChild(containerBot);

closeButton = document.createElement("button");
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
block1 = document.createElement("div");
block1.textContent = ""; // 给子元素添加内容
block1.classList.add("leftBlock");
block1.style.flex = "1"; // 子元素自动填充剩余空button

block2 = document.createElement("div");
block2.textContent = ""; // 给子元素添加内容
block2.style.flex = "1"; // 子元素自动填充剩余空间

block3 = document.createElement("div");
block3.classList.add("rightBlock");
block3.textContent = ""; // 给子元素添加内容
block3.style.flex = "1"; // 子元素自动填充剩余空间

// 将三个子元素添加到 header 元素中
containerTop.appendChild(block1);
containerTop.appendChild(block2);
containerTop.appendChild(block3);

// 显示
button = document.createElement("button");
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

// 创建按钮容器
buttonContainer = document.createElement("div");
buttonContainer.classList.add("buttonContainer");
container.appendChild(buttonContainer);

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
buttonContainer.appendChild(detectButton);


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
buttonContainer.appendChild(detectButtonRight);

lastLeftValue = '';
lastLeftValue = '';
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


readLeftData();
readRightData();



// 按下添加按钮 左
detectButton.addEventListener("click",() => {
  lastLeftValue = getLabelAnValue();
  localStorage.setItem('leftValue', lastLeftValue);
  
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
  localStorage.setItem('rightValue', lastRightValue);
  const mergedata = mergeArrays(lastLeftValue,lastRightValue);
  console.log("mergedata:");
  console.log(mergedata);
  writeData(mergedata);
  updateTitle(mergedata);
});
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
  // 选择所有具有特定类的元素，并删除它们
  d3.select('.DataTable').remove();

  block1.textContent = "";
  block2.textContent = "";
}
function writeData(infoBoxContent){
  // 将数据写入表格展示
  clearTableLag();
  table = d3.select(containerBot)
    .append("table")
    .attr("class","DataTable");
  const tbody = table.append("tbody");
  // 创建行
  const rows = tbody.selectAll("tr")
    .data(infoBoxContent)
    .enter()
    .append("tr")
    .attr("class","trl");
  // 创建单元格
  const cells = rows.selectAll("td")
    .data((d, i) => {
      return d.map((value, index) => {
        return { value: value, index: index, rowNumber: i };
      });
    })
    .enter()
    .append("td")
    .attr("class", (d) => {
      return d.index === 1 ? "labelTd" : "valueTd";
    })
    .each(function (d) {
      const cell = d3.select(this);
      if (d.index === 0 || d.index === 2) {
        // 对于第一列和第三列的单元格
        const svg = cell.append("svg")
          .attr("width", "100%")
          .attr("height", "80%")
          .attr("viewBox", "0 0 60 20"); // 视图框，宽度60，高度20
        const rect = svg.append("rect")
          .attr("width", "100%")
          .attr("height", '100%')
          .attr("rx", 5) // 左上角和左下角圆角
          .attr("ry", 5) // 左上角和左下角圆角
          .attr("fill", "lightgray"); // 矩形填充颜色
        const text = svg.append("text")
          .attr("x", 5) // 文字偏移量
          .attr("y", 15) // 文字偏移量
          .attr("font-size", 6) // 文字大小
          .attr("fill", "black") // 文字颜色
          .text(d.value); // 文字内容
        // 截断文字并显示省略号
        const availableWidth = 60 - 10; // 10px用于文字偏移
        const textNode = text.node();
        const textWidth = textNode.getComputedTextLength();
        if (textWidth > availableWidth) {
          const charsToShow = Math.floor(availableWidth / textWidth * d.value.length);
          text.text(d.value.substring(0, charsToShow - 3) + '...');
        }
      } else {
        // 对于其他列的单元格，直接显示值
        cell.text(d.value);
      }
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
function readLeftData(){
  const value_ = localStorage.getItem('leftValues');
  if(value_)lastLeftValue = value_;
  const mergedata = mergeArrays(lastLeftValue,lastRightValue);
  if(mergedata){
    writeData(mergedata);
    updateTitle(mergedata);
  }
}
function readRightData(){
  const value_ = localStorage.getItem('rightValues');
  if(value_)lastRightValue = value_;
  const mergedata = mergeArrays(lastLeftValue,lastRightValue);
  if(mergedata){
    writeData(mergedata);
    updateTitle(mergedata);
  }
}