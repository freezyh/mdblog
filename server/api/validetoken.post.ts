import { createHash } from "node:crypto";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { token } = body;
  const secret = useRuntimeConfig().chatSessionSecret;
  let msg = "";
  if (!secret) {
    msg = "Secret not configured";
    return {
      result: {
        msg,
      },
    };
  }
  if (!token) {
    msg = "请输入token";
    return {
      result: {
        msg,
      },
    };
  }

  const [timestamp, signature] = token.split(".");
  const age = Date.now() - Number.parseInt(timestamp, 10);
  if (age > 10 * 1000) {
    msg = "已经超时10s";
    return {
      result: {
        msg,
      },
    };
  }

  const expected = createHash("sha256")
    .update(`${timestamp}:${secret}`)
    .digest("hex")
    .slice(0, 16);

  if (signature !== expected) {
    msg = "签名不一致";
    return {
      result: {
        msg,
      },
    };
  }
  else {
    msg = "验证成功";
    return {
      result: {
        msg,
      },
    };
  }
});
