---
title: 案例页面
description: test描述
date: 2025-10-20
year: 2025
moddifyDate: 2026-11-6 13:57:02
---

# 案例页面

Here is some content.

```js [config.js]
const a = 123; // precision for decimal numbers (2 by default)
```

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  modules: ["@nuxtwind/components"],
  nuxtwind: {
    // Module options
  },
});
```

- [ ] todo
- [x] 实现

<!-- 这是一段被注释掉的文字 -->

![👇👇👇编写高质量代码方法](https://userblink.csdnimg.cn/20220518/qq_35427589/pic/85c540a72edc5dedffffc42928a054a2-0.png?x-oss-process=image/watermark,image_bG9nby9sb2dvM3gucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLGhfMjg=,text_QOWFsemlruS4gOadr-aXoA==,color_FFFFFF,size_30,type_ZmFuZ3poZW5naGVpdGk,shadow_20,t_50,g_se,x_16,y_16,order_0,align_2,interval_4)

表格111

| 左对齐 | 右对齐 | 居中对齐 |
| :----- | -----: | :------: |
| 单元格 | 单元格 |  单元格  |
| 单元格 | 单元格 |  单元格  |

| Column 1          |        Column 2        |               Column 3 |
| :---------------- | :--------------------: | ---------------------: |
| centered 文本居左 | right-aligned 文本居中 | right-aligned 文本居右 |

车辆信息：

| 车型     | 颜色 |             报价 |
| :------- | :--: | ---------------: |
| 法拉利   | 红色 | 500达不溜500达不 |
| 劳斯莱斯 | 金色 |        666达不溜 |
| 布加迪   | 黑色 |       3246达不溜 |

test

| File                   | Command                                            |
| ---------------------- | -------------------------------------------------- |
| `config.js`            | `test build`<br>`test serve`                       |
| `config.production.js` | `test build production`<br>`test serve production` |

> 这里是引用

**这里是粗体**

[[链接]](https://www.baidu.com)

<u>我是下划线</u>

~~删除线~~

<!--
```html [layouts/main.html] diff {4-7}
<!doctype html>
<html>
  <head>
    <style> /* [!code ++] */
      @​tailwind components; /* [!code ++] */
      @​tailwind utilities; /* [!code ++] */
    </style> /* [!code ++] */
  </head>
  <body>
    <yield />
  </body>
</html>
``` -->

To use a specific version, first change the value to the desired release number:

```json [package.json] {3} no-copy
"dependencies": {
   "@maizzle/framework": "latest", // [!code --]
   "@maizzle/framework": "5.0.6", // [!code ++]
}
```

<Alert>We don't recommend using `@tailwind base` because it contains CSS resets that won't work or are not needed in HTML emails. Also, some resets in there use the `*` selector, which can cause issues when CSS is inlined.</Alert>

<Alert type="danger">We don't recommend using `@tailwind base` because it contains CSS resets that won't work or are not needed in HTML emails. Also, some resets in there use the `*` selector, which can cause issues when CSS is inlined.</Alert>
