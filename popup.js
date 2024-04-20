// 创建一个包含标题的数组
var headers = ['Name', 'Age', 'Country'];

// 创建一个包含数据的二维数组
var data = [
    ['John', 30, 'USA'],
    ['Alice', 25, 'UK'],
    ['Bob', 35, 'Canada']
];

// 创建表格元素
var table = document.createElement('table');

// 创建标题行
var headerRow = table.insertRow();
headers.forEach(function(header) {
    var cell = headerRow.insertCell();
    cell.textContent = header;
});

// 循环遍历数据数组，创建数据行并插入表格中
data.forEach(function(rowData) {
    var row = table.insertRow();
    rowData.forEach(function(cellData) {
        var cell = row.insertCell();
        cell.textContent = cellData;
    });
});

// 将表格添加到页面中
document.body.appendChild(table);
