// content.js
// 创建容器元素
const container = document.createElement("div");
container.style.position = "fixed";
container.style.top = "10px";
container.style.right = "10px";
container.style.width = "40%";
container.style.height = "100%";
container.style.background = "steelblue";
//container.style.border = "1px solid #fff";
container.style.zIndex = "9999";
container.style.display = "none"; // 初始时隐藏

// 关闭
const closeButton = document.createElement("button");
closeButton.textContent = "关闭";
closeButton.addEventListener("click", () => {
  container.style.display = "none";
});

container.appendChild(closeButton);

// 将容器添加到页面中
document.body.appendChild(container);
// 显示
const button = document.createElement("button");
button.textContent = "显示";
button.style.position = "fixed";
button.style.top = "10px";
button.style.right = "10px";
document.body.appendChild(button);
// 添加按钮 左
const detectButton = document.createElement("button");
detectButton.textContent = "添加到左侧";
container.appendChild(detectButton);

// 添加按钮 右
const detectButtonRight = document.createElement("button");
detectButtonRight.textContent = "添加到右侧";
container.appendChild(detectButtonRight);

// 当按钮被点击时，显示或隐藏容器
button.addEventListener("click", () => {
  if (container.style.display === "none") {
    container.style.display = "block";
  } else {
    container.style.display = "none";
  }
});
const leftTextI = document.createElement("div");
leftTextI.style.height = "600px";
leftTextI.style.width = "580px";
leftTextI.style.marginTop = "20px";
leftTextI.style.marginLeft = "10px";
leftTextI.style.overflowY = "auto";
leftTextI.style.border = "1px solid #ccc";
leftTextI.style.display = "flex";

const table = document.createElement('table');
table.style.width = "100%";
table.style.height = "100%";
table.style.borderCollapse = 'collapse';
leftTextI.appendChild(table);

container.appendChild(leftTextI);

var lastLeftValue = " ";
var lastRightValue = " ";

// 从存储中获取数据
chrome.storage.sync.get(['leftValue'], function(result) {
  // 如果存储中有数据，将其应用于页面
  if(result.leftValue){
    lastLeftValue = result.leftValue;
    console.log(lastLeftValue);
    writeData(mergeArrays(result.leftValue,lastRightValue));
  }
});
chrome.storage.sync.get(['rightValue'], function(result) {
  if(result.rightValue){
    lastRightValue = result.rightValue;
    console.log(lastRightValue);
    writeData(mergeArrays(lastLeftValue,result.rightValue));
  }
});
// 按下添加按钮 左
detectButton.addEventListener("click",() => {
  const lbAnValues = getLabelAnValue();
  const nowValues = lbAnValues[1].map((name, index) => [name, lbAnValues[0][index]]);

  chrome.storage.sync.set({ 'leftValue': nowValues }, function() {
    lastLeftValue = nowValues;
    console.log('leftData is saved.');
    console.log(nowValues);
  });
  
  writeData(mergeArrays(nowValues,lastRightValue));
});
// 按下添加按钮 右
detectButtonRight.addEventListener("click",() => {
  const lbAnValues = getLabelAnValue();
  const nowValues = lbAnValues[1].map((name, index) => [name, lbAnValues[0][index]]);

  chrome.storage.sync.set({ 'rightValue': nowValues }, function() {
    lastRightValue = nowValues;
    console.log('rightData is saved.');
    console.log(nowValues);
  });
  
  writeData(mergeArrays(lastLeftValue,nowValues));
});
function RemakeValue(inputString) {
  //console.log(inputString);
  const withoutComments = inputString.replace(/\/\*[\s\S]*?\*\//g, '');
  const withoutCSSRules = withoutComments.replace(/[^{]*\{[^}]+\}/g, '');
  
  return withoutCSSRules;
}
function getLabelAnValue(){
  // 获取当前页面的所有属性值和属性名
  const infoBoxes = document.querySelectorAll("th.infobox-label");
  const values = Array.from(infoBoxes).map(th => {
      const td = th.nextElementSibling;
      return RemakeValue(td ? td.textContent : "");
  });
  const labels = Array.from(infoBoxes).map(th =>{
    return RemakeValue(th.textContent);
  });
  return [labels,values];
}
function writeData(infoBoxContent){
  // 将数据写入表格展示
  // 获取表格的 tbody 元素
  const tbody = table.querySelector('tbody');
  // 如果存在 tbody 元素
  if (tbody) {
    // 清空 tbody 中的所有子元素（即表格行）
    tbody.innerHTML = '';
  }
  infoBoxContent.forEach(item => {
      var row = table.insertRow();
      item.forEach(function(cellData) {
          var cell = row.insertCell();
          cell.textContent = cellData;
          cell.style.color = "#fff";
          cell.style.border = '1px solid #ddd'; // 设置单元格边框
          cell.style.padding = '8px'; // 设置单元格内边距
          cell.style.minWidth = "80px";
          cell.style.maxWidth = "80px";
      });
  });
}
function mergeArrays(array1, array2) {
  // 创建一个映射表，将第二个数组的名称映射到其对应的值
  if(array1 == ' '){
    const mergedArray = array2.map(([value, name]) => {
      return ['', name, value];
    });
    return mergedArray;
  }
  if (array2 == ' '){
    const mergedArray = array1.map(([value, name]) => {
      return [name, value , ' '];
    });
    return mergedArray;
  }
  const nameToValueMap = {};
  array2.forEach(([value, name]) => {
    nameToValueMap[name] = value;
  });

  // 遍历第一个数组，合并数据
  const mergedArray = array1.map(([value, name]) => {
    // 如果第二个数组中存在当前名称
    if (nameToValueMap.hasOwnProperty(name)) {
      // 将第二个数组中的值加入到当前二级数组的末尾
      return [value, name, nameToValueMap[name]];
    } else {
      // 否则在当前二级数组的末尾填充空值
      return [value, name, '']; // 或者使用 null、undefined 等表示空值的标记
    }
  });

  // 如果第二个数组中存在但在第一个数组中不存在的名称
  array2.forEach(([value, name]) => {
    if (!mergedArray.some(item => item[1] === name)) {
      // 在第一个数组的末尾添加一个新的二级数组
      mergedArray.push(['', name, value]);
    }
  });

  return mergedArray;
}