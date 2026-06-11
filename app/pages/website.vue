<script setup lang="ts">
useSeoMeta({
  title: "常用网站集合",
  description: "快速访问常用网站，方便开发，免去频繁切换标签页的烦恼",
});
interface Site {
  name: string;
  url: string;
  desc?: string;
}

interface Category {
  name: string;
  sites: Site[];
}

const categories: Category[] = [
  {
    name: "在线工具",
    sites: [
      { name: "JSON格式化", url: "https://www.hijson.com/", desc: "json格式化" },
      { name: "TinyPNG", url: "https://tinypng.com", desc: "图片压缩" },
      { name: "apifox", url: "https://app.apifox.com", desc: "API调试" },
    ],
  },
  {
    name: "综合",
    sites: [
      { name: "GitHub", url: "https://github.com", desc: "代码托管平台" },
      { name: "码云", url: "https://gitee.com", desc: "代码托管平台" },
      { name: "百度网盘", url: "http://pan.baidu.com", desc: "网盘" },
      { name: "Google", url: "https://www.google.com", desc: "搜索引擎" },
      { name: "小皮面板", url: "https://www.xp.cn/term", desc: "服务器领域" },
      { name: "豆包", url: "https://www.doubao.com/chat/", desc: "AI" },
      { name: "Deepseek", url: "https://chat.deepseek.com/", desc: "AI" },
      { name: "新浪微博", url: "https://weibo.com/newlogin", desc: "微博" },

    ],
  },
  {
    name: "博客平台",
    sites: [
      { name: "掘金", url: "https://juejin.cn", desc: "开发者社区" },
      { name: "博客园", url: "https://www.cnblogs.com", desc: "开发者社区" },
      { name: "CSDN", url: "https://www.csdn.net", desc: "开发者社区" },
      { name: "DevPress", url: "https://devpress.csdn.net/vue", desc: "开发者社区" },
      { name: "DEV", url: "https://dev.to", desc: "开发者社区" },
    ],
  },
  {
    name: "UI组件库",
    sites: [
      { name: "Naive UI", url: "https://www.naiveui.com/zh-CN/os-theme/docs/installation", desc: "Vue3组件库" },
      { name: "Element Plus", url: "https://element-plus.org/zh-CN/component/overview", desc: "Vue3组件库" },
      { name: "Vant4", url: "https://vant-ui.github.io/vant/#/zh-CN/home", desc: "Vue3组件库" },
      { name: "Element UI", url: "https://element.eleme.io/#/zh-CN/component/installation", desc: "Vue2组件库" },
      { name: "Vant2", url: "https://vant-ui.github.io/vant/v2/#/zh-CN/", desc: "Vue2组件库" },
    ],
  },
  {
    name: "前端相关",
    sites: [
      { name: "Stackblitz", url: "https://stackblitz.com", desc: "在线IDE" },
      { name: "Typescript", url: "https://www.typescriptlang.org/zh/play/", desc: "typescript转换" },
      { name: "tailwindcss", url: "https://tailwindcss.com/docs/installation/using-vite", desc: "css" },
    ],
  },
  {
    name: "视频网站",
    sites: [
      { name: "Bilibili", url: "https://www.bilibili.com", desc: "视频平台" },
      { name: "YouTube", url: "https://www.youtube.com", desc: "视频平台" },
    ],
  },
  {
    name: "免费CDN服务",
    sites: [
      { name: "CDNJS", url: "https://cdnjs.com", desc: "cdn加速" },
      { name: "bootcdn", url: "https://www.bootcdn.cn", desc: "cdn加速" },
      { name: "七牛云", url: "https://staticfile.org", desc: "cdn加速" },
    ],
  },
  {
    name: "辅助软件",
    sites: [
      { name: "超级炸弹", url: "https://xn--31t720bz9j7oo.com", desc: "代理" },
      { name: "墙裂", url: "https://www.qianglie.com", desc: "代理" },
    ],
  },
  {
    name: "其他",
    sites: [
      { name: "163邮箱", url: "https://mail.163.com", desc: "邮箱" },
      { name: "QQ邮箱", url: "https://wx.mail.qq.com/", desc: "邮箱" },
    ],
  },
];
</script>

<template>
  <div class="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-100 via-indigo-50 to-sky-50 py-6">
    <!-- 点阵网格 -->
    <div class="pointer-events-none absolute inset-0 opacity-[0.04]" style="background-image: radial-gradient(circle, #6366f1 1px, transparent 1px); background-size: 20px 20px;" />
    <!-- 斜线扫描线 -->
    <div class="pointer-events-none absolute inset-0 opacity-[0.015]" style="background: repeating-linear-gradient(45deg, #6366f1 0px, #6366f1 1px, transparent 1px, transparent 30px);" />
    <!-- 装饰光斑 -->
    <div class="pointer-events-none absolute -top-32 -left-32 h-80 w-80 rounded-full bg-indigo-200/30 blur-3xl" />
    <div class="pointer-events-none absolute -bottom-32 -right-32 h-72 w-72 rounded-full bg-sky-200/30 blur-3xl" />
    <div class="pointer-events-none absolute top-1/3 right-1/4 h-64 w-64 rounded-full bg-violet-200/25 blur-3xl" />
    <div class="pointer-events-none absolute top-2/3 left-1/3 h-56 w-56 rounded-full bg-amber-200/20 blur-3xl" />
    <div class="pointer-events-none absolute bottom-1/4 right-1/3 h-48 w-48 rounded-full bg-emerald-200/20 blur-3xl" />

    <div class="relative mx-auto max-w-7xl px-6">
      <!-- 分类区域 -->
      <div class="space-y-4">
        <section v-for="category in categories" :key="category.name">
          <!-- 分类标题 -->
          <h2 class="mb-2 text-sm uppercase tracking-widest text-slate-400">
            {{ category.name }}
          </h2>

          <!-- 网站卡片网格 -->
          <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8">
            <a
              v-for="site in category.sites"
              :key="site.url"
              :href="site.url"
              target="_blank"
              rel="noopener noreferrer"
              class="group relative overflow-hidden rounded-lg bg-white px-4 py-3 shadow-[0_0_0_1px_rgba(148,163,184,0.12),0_1px_2px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:bg-indigo-50/50 hover:shadow-[0_0_0_1px_rgba(99,102,241,0.25),0_4px_12px_rgba(99,102,241,0.08)]"
            >
              <!-- 名称 -->
              <p class="text-sm text-center font-medium text-slate-700 transition-colors group-hover:text-indigo-500">
                {{ site.name }}
              </p>
              <!-- 描述 -->
              <p v-if="site.desc" class="mt-0.5 text-center text-xs text-slate-400 transition-colors group-hover:text-slate-500 line-clamp-1">
                {{ site.desc }}
              </p>
            </a>
          </div>
        </section>
      </div>

      <!-- 底部 -->
      <p class="mt-12 text-center text-xs text-slate-300">
        点击卡片在新标签页打开对应网站
      </p>
    </div>
  </div>
</template>
