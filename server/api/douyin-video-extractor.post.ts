// 从URL提取视频ID
function extractVideoIdEnhanced(url: string): string {
  console.log("🔍 从URL提取视频ID:", url);

  const patterns = [
    /\/video\/(\d+)/,
    /\/share\/video\/(\d+)/,
    /aweme_id=(\d+)/,
    /modal_id=(\d+)/,
    /\/(\d{19})/, // 19位数字ID
    /\/(\d{18})/, // 18位数字ID
    /item_ids=(\d+)/,
    /\/note\/(\d+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      console.log(`✅ 匹配模式 ${pattern}: ${match[1]}`);
      return match[1];
    }
  }

  // 如果无法提取，生成一个基于时间的ID
  const fallbackId = Date.now().toString();
  console.log("⚠️ 无法提取ID，使用备用ID:", fallbackId);
  return fallbackId;
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  let { url } = body;

  if (!url) {
    return {
      code: 1,
      result: {
        message: "URL参数缺失",
      },
    };
  }

  // 展开短链接
  console.log("开始解析链接:", url);
  let videoId = "";

  if (url.includes("v.douyin.com")) {
    try {
      console.log("展开短链接...");
      const nativeResponse = await globalThis.fetch(url, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1",
          "Accept":
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
          "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
        },
      });
      const finalUrl = nativeResponse.url || url;
      if (finalUrl !== url) {
        url = finalUrl;
        console.log("展开后的链接:", url);
      }
    }
    catch (e: any) {
      console.log("短链接展开失败，尝试其他方式:", e.message);
    }
  }

  // 提取视频ID
  videoId = extractVideoIdEnhanced(url);
  console.log("提取到的视频ID:", videoId);

  return {
    code: 0,
    result: {
      videoId,
      url,
    },
  };
});
