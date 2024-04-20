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
// 添加按钮
const detectButton = document.createElement("button");
detectButton.textContent = "添加";
container.appendChild(detectButton);

// 当按钮被点击时，显示或隐藏容器
button.addEventListener("click", () => {
  if (container.style.display === "none") {
    container.style.display = "block";
  } else {
    container.style.display = "none";
  }
});
detectButton.addEventListener("click",() => {
  const infoBoxes = document.querySelectorAll("th.infobox-label");
  const infoBoxContent = Array.from(infoBoxes).map(th => {
      const td = th.nextElementSibling;
      return [
          RemakeValue(td ? td.textContent : ""),
          RemakeValue(th.textContent)
      ];
  });
  const leftTextI = document.createElement("div");
  leftTextI.style.height = "600px";
  leftTextI.style.width = "500px";
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
  //leftTextI.innerHTML = "";
  infoBoxContent.forEach(item => {
      var row = table.insertRow();
      item.forEach(function(cellData) {
          var cell = row.insertCell();
          cell.textContent = cellData;
          cell.style.color = "#fff";
          cell.style.border = '1px solid #ddd'; // 设置单元格边框
          cell.style.padding = '8px'; // 设置单元格内边距
      });
  });
});
function RemakeValue(inputString) {
  console.log(inputString);
  const withoutComments = inputString.replace(/\/\*[\s\S]*?\*\//g, '');
  const withoutCSSRules = withoutComments.replace(/[^{]*\{[^}]+\}/g, '');
  
  return withoutCSSRules;
}