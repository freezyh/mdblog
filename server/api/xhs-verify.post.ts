import crypto from "node:crypto";

const APP_KEY = "red.gLvsVoksierVz0uF";
const APP_SECRET = "f13a2266d1e2c32a553cb7a42ea63c48";

// 备用
/* const APP_KEY = "red.jdTVXR4Ldj9sudhb";
const APP_SECRET = "e01fca2788b5d8097d76fbec72615e00"; */

// 缓存 access_token
let cachedToken: { token: string; expiresAt: number } | null = null;

/**
 * 生成小红书 API 签名
 */
function generateSignature(nonce: string, timestamp: string, secret: string): string {
  const paramStr = `appKey=${APP_KEY}&nonce=${nonce}&timeStamp=${timestamp}${secret}`;
  return crypto.createHash("sha256").update(paramStr).digest("hex");
}

/**
 * 获取 access_token
 */
async function getAccessToken(nonce: string, timestamp: string): Promise<string | null> {
  if (cachedToken && cachedToken.expiresAt > Date.now()) {
    return cachedToken.token;
  }

  const signature = generateSignature(nonce, timestamp, APP_SECRET);

  try {
    const response = await $fetch("https://edith.xiaohongshu.com/api/sns/v1/ext/access/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        app_key: APP_KEY,
        nonce,
        timestamp: Number.parseInt(timestamp, 10),
        signature,
      }),
    }) as any;

    if (response?.data?.access_token) {
      cachedToken = {
        token: response.data.access_token,
        expiresAt: Date.now() + 55 * 60 * 1000,
      };
      console.log(response.data);
      return response.data.access_token;
    }

    console.error("获取 access_token 失败:", response);
    return null;
  }
  catch (error) {
    console.error("获取 access_token 请求失败:", error);
    return null;
  }
}

export default defineEventHandler(async (): Promise<{
  appKey: string;
  nonce: string;
  timestamp: number;
  signature: string;
}> => {
  const nonce = crypto.randomBytes(16).toString("hex");
  // 时间戳往前调 10 分钟
  const timestamp = (Date.now() - 10 * 60 * 1000).toString();

  // 第一步：获取 access_token
  const accessToken = await getAccessToken(nonce, timestamp);

  if (!accessToken) {
    console.warn("无法获取 access_token，尝试直接签名");
    const signature = generateSignature(nonce, timestamp, APP_SECRET);
    return {
      appKey: APP_KEY,
      nonce,
      timestamp: Number.parseInt(timestamp, 10),
      signature,
    };
  }

  // 第二步：用 access_token 生成最终签名
  const signature = generateSignature(nonce, timestamp, accessToken);

  return {
    appKey: APP_KEY,
    nonce,
    timestamp: Number.parseInt(timestamp, 10),
    signature,
  };
});
