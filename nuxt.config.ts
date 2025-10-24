/* import { readFileSync } from "node:fs"; */
// https://nuxt.com/docs/api/configuration/nuxt-config
/* import tailwindTheme from "./app/assets/shiki/themes/tailwind.json";
console.log(tailwindTheme); */
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  sourcemap: false,
  app: {
    baseURL: "/mdblog/",
  },
  css: ["~/assets/styles/reset.css", "~/assets/styles/app.scss", "~/assets/styles/tailwind.css"],
  modules: ["@element-plus/nuxt", "@nuxtjs/tailwindcss", "@nuxt/content", "@vueuse/nuxt", "@pinia/nuxt"],
  content: {
    build: {
      markdown: {
        highlight: {
          theme: {
            default: "material-theme-lighter",
            dark: "material-theme-ocean",
          },
        },
      },
    },
  },
  typescript: {
    strict: true,
  },
  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks: (id: string) => {
            // 处理css分块
            if (id.includes("__uno.css")) {
              return "unocss";
            }
            const chunks = ["element-plus", "md-editor-v3", "markdown-it", "vue-pdf"];
            if (id.includes("/node_modules/")) {
              for (const chunkName of chunks) {
                if (id.includes(chunkName)) {
                  return chunkName;
                }
              }
            }
          },
        },
      },
    },
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      autoSubfolderIndex: false,
    },
  },
  elementPlus: {
    defaultLocale: "zh-cn",
    icon: "ElIcon",
    themes: ["dark"],
  },
});
