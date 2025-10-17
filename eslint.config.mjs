import antfu from "@antfu/eslint-config";
// 注意：此配置与 VS Code 设置中的 "prettier.enable": false 配合使用，确保格式化权完全交给 ESLint。
export default antfu(
  // ========== 基础配置 ==========
  {
    // 项目类型：应用（app）或库（library）
    type: "app",

    // ===== 代码风格配置 =====
    stylistic: {
      indent: 2, // 2空格缩进
      quotes: "double", // 使用双引号
      semi: true, // 语句末尾需要分号
    },

    // ===== 格式化器配置 =====
    formatters: {
      css: true, // 启用 CSS 自动格式化
      html: true, // 启用 HTML 自动格式化
      markdown: "dprint", // "prettier", // 使用 Prettier 格式化 Markdown
    },

    // ===== 语言支持 =====
    typescript: true, // 启用 TypeScript 支持
    vue: true, // 启用 Vue 支持
    jsonc: false, // 禁用 JSONC 支持
    yaml: false, // 禁用 YAML 支持

    // ===== 忽略文件配置 =====
    ignores: [
      "​**​/node_modules", // 忽略所有 node_modules
      "​**​/.nuxt", // 忽略 Nuxt 生成目录
      "​**​/.dist", // 忽略构建输出目录
    ],
  },

  // ========== 针对 TypeScript 文件的特殊配置 ==========
  {
    files: ["​**​/*.ts"], // 匹配所有 .ts 文件
    rules: {}, // 可在此添加 TypeScript 特定规则
  },
  {
    files: ["**/*.html"],
    rules: {
      "no-irregular-whitespace": "off",
    },
  },
  {
    files: ["**/*.md"],
    rules: {
      "no-irregular-whitespace": "off",
    },
  },
  // ========== 全局规则覆盖 ==========
  {
    rules: {
      "no-unused-vars": "off", // 关闭未使用变量的检查
      "no-console": "off", // 允许使用 console
      "linebreak-style": "off", // 关闭行尾换行符检查
      "htmlWhitespaceSensitivity": "ignore",
    },
  },
);
