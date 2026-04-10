/**
 * API 访问守卫中间件
 *
 * 作用：保护 /api/ 开头的接口，防止非法来源的请求
 *
 * return 的含义：提前结束处理 = 放行请求（检查通过，允许继续）
 * throw createError 的含义：阻断请求，返回错误响应
 */

export default defineEventHandler((event) => {
  const reqPath = event.path;
  console.log(process.env.APP_ENV);
  // 非 /api/ 路径 → 放行（不拦截非 API 请求）
  if (!reqPath.startsWith("/api/"))
    return;

  const config = useRuntimeConfig(event);
  const allowedOrigin = config.allowedOrigin as string;
  const internalSecret = config.internalApiSecret as string;
  const appEnv = config.appEnv as string;
  const isSit = config.sitEnv as boolean;

  const internalHeader = getHeader(event, "x-internal-secret");

  // 携带正确的 x-internal-secret 头 → 放行（内部服务可跳过检查）
  if (internalSecret && internalHeader === internalSecret)
    return;

  const origin = getHeader(event, "origin");
  const referer = getHeader(event, "referer");

  // 请求没有 origin/referer 头 → 放行（简单请求放行）
  if (!origin && !referer)
    return;

  // allowedOrigin 未配置 → 放行（未配置白名单时禁用检查）
  if (!allowedOrigin)
    return;

  let allowedHost: string;

  try {
    // allowedOrigin 格式错误 → 放行（配置错误时不阻断）
    allowedHost = new URL(allowedOrigin).host;
  }
  catch {
    return;
  }

  let requestHost = "";

  try {
    requestHost = new URL(origin || referer || "").host;
  }
  catch { }

  // 无法解析请求来源 → 放行
  if (!requestHost)
    return;

  // 请求来源 host 与白名单匹配 → 放行（来自信任域名）
  if (requestHost === allowedHost)
    return;

  // 开发/SIT 环境 + localhost 请求 → 放行（方便本地调试）
  if (
    ((appEnv === "development" || isSit) && requestHost.includes("localhost"))
    || requestHost.includes("127.0.0.1")
  ) {
    return;
  }

  // 以上都不满足 → 拒绝请求
  throw createError({
    statusCode: 403,
    statusMessage: "Forbidden",
  });
});
