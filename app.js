const express = require('express');
const winston = require('winston');
const app = express();
const port = 3000;

// 設置 Winston logger 使用 JSON 格式
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    // new winston.transports.File({ filename: 'logs/app.log' })
  ]
});

// 輔助函數：生成特定長度的隨機字符串
function generateRandomString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

// 輔助函數：生成特定大小的日誌內容
function generateLogContent(bytes) {
  // 將 bytes 轉換為數字
  const targetBytes = parseInt(bytes, 10);
  if (isNaN(targetBytes) || targetBytes <= 0) {
    return { error: '無效的 bytes 參數' };
  }
  
  // 生成隨機變化量，範圍是 ±10
  const variation = Math.floor(Math.random() * 21) - 10; // -10 到 +10
  const actualBytes = Math.max(1, targetBytes + variation);
  
  // 創建基本日誌對象
  const logObject = {
    message: `生成日誌大小約 ${actualBytes} bytes (目標 ${targetBytes} bytes)`,
    targetBytes: targetBytes,
    actualBytes: actualBytes,
    variation: variation
  };
  
  // 計算已有內容的字節大小
  const currentBytes = Buffer.from(JSON.stringify(logObject), 'utf8').length;
  
  // 如果需要更多字節來達到目標大小，添加隨機內容
  if (currentBytes < actualBytes) {
    const additionalBytes = actualBytes - currentBytes;
    // 預估隨機字符串在 JSON 中的額外開銷 (引號和逗號等)
    const overhead = 15; // 估計 JSON 鍵值對的額外開銷
    const randomContent = generateRandomString(Math.max(0, additionalBytes - overhead));
    logObject.randomContent = randomContent;
  }
  
  // 調整最終大小更接近目標
  const finalBytes = Buffer.from(JSON.stringify(logObject), 'utf8').length;
  logObject.finalSize = finalBytes;
  
  return logObject;
}

// 設置路由
app.get('/log', (req, res) => {
  const bytes = req.query.bytes || '100';
  const logObject = generateLogContent(bytes);
  
  // 記錄日誌
  logger.info(logObject);
  
  // 返回結果
  res.json({
    message: '日誌已生成',
    requestedBytes: bytes,
    actualBytes: Buffer.from(JSON.stringify(logObject), 'utf8').length,
    logObject: logObject
  });
});

// 啟動伺服器
app.listen(port, () => {
  logger.info({
    message: `日誌測試應用程式啟動於 http://localhost:${port}`,
    service: 'log-generator',
    port: port
  });
});