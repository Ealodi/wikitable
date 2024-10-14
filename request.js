const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());

// 创建一个后端 API 来发送请求并获取 HTML
app.get('/fetch-html', async (req, res) => {
  const url = req.query.url;  // 从请求参数中获取目标 URL
  if (!url) {
    return res.status(400).send('缺少 URL 参数');
  }

  try {
    // 通过 axios 发送 GET 请求
    const response = await axios.get(url ,{ timeout: 5000 });
    const html = response.data;  // 获取响应中的 HTML 内容

    // 将 HTML 返回给前端
    res.send(html);
  } catch (error) {
    console.error('获取 HTML 失败:', error);
    res.status(500).send('获取 HTML 失败');
  }
});

// 启动服务器
app.listen(3000, () => {
  console.log('服务器运行在 http://localhost:3000');
});
