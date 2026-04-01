---
title: Nuxt项目部署到github
description: Nuxt项目部署到github
date: 2025-10-22 15:42:58
year: 2025
---

## Nuxt项目部署到github

需要配置nuxt.config.ts, 否则会出现在路由后面自动添加 `/` 比如访问 `https://xxxx.github.io/mdblog/blog` 会自动跳转 `https://xxxx.github.io/mdblog/blog/`

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  nitro: {
    prerender: {
      crawlLinks: true,
      autoSubfolderIndex: false,
    },
  }
});
```
