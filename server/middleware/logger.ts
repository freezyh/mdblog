// server/middleware/logger.js
export default defineEventHandler(async (event) => {
  const startTime = Date.now();
  const { method, url } = event.node.req;

  // 获取客户端 IP
  const getClientIP = () => {
    return event.node.req.headers["x-forwarded-for"]
      || event.node.req.headers["x-real-ip"]
      || event.node.req.socket.remoteAddress || "unknown";
  };

  const clientIP = getClientIP();

  // 记录请求开始
  console.log("🌐 API 请求开始", {
    method,
    url,
    clientIP,
    timestamp: new Date().toISOString(),
  });

  // 记录响应信息（在响应发送时）
  event.node.res.on("finish", () => {
    const duration = Date.now() - startTime;
    const statusCode = event.node.res.statusCode;

    console.log("✅ API 请求完成", {
      method,
      url,
      statusCode,
      duration: `${duration}ms`,
      clientIP,
      timestamp: new Date().toISOString(),
    });
  });

  event.node.res.on("close", () => {
    if (!event.node.res.writableFinished) {
      const duration = Date.now() - startTime;
      console.warn("⚠️ 客户端提前关闭连接", {
        method,
        url,
        duration: `${duration}ms`,
        clientIP,
      });
    }
  });

  // 不需要返回任何内容，继续执行后续处理
});
