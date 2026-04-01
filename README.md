npm install -D eslint @antfu/eslint-config typescript

npx nuxi@latest module add vueuse

Node 24.7.0

content目录和app同级

@nuxt/content v3.7.1 中存在一个已知 bug（Issue #3607）：https://github.com/nuxt/content/issues/3607

当你设置了 app.baseURL: "/mdblog/" 时，构建时生成的数据库 dump SQL 文件会被放到 .output/public/mdblog/ 目录下，但 Vercel 的数据库处理器在初始化 SQLite 时，从错误的基础路径去读取 dump 文件，导致数据库为空。于是 queryCollection("blog").all() 返回空数据，触发你代码里的 404。
