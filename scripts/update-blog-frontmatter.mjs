/**
 * 扫描 content/blog 下改动的 md 文件，自动注入/更新 frontmatter
 * 触发时机：npm run build 前自动执行
 * 逻辑：
 *  - 通过 node_modules/.cache 中的状态文件对比 mtime，找出改动/新增的 md
 *  - title / description：读取文件正文最前面的 `# ` 标题
 *  - date：文件创建日期（已有 date 则保留原值，避免编辑器重写文件导致日期漂移）
 *  - year：date 的年份
 *  - moddifyDate：文件最后修改时间
 */
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const blogDir = path.join(root, "content", "blog");
const stateFile = path.join(root, "node_modules", ".cache", "blog-frontmatter-state.json");

const pad = n => String(n).padStart(2, "0");
const formatDate = d => `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
function formatDateTime(d) {
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

function loadState() {
  try {
    return JSON.parse(fs.readFileSync(stateFile, "utf8"));
  }
  catch {
    return {};
  }
}

function saveState(state) {
  fs.mkdirSync(path.dirname(stateFile), { recursive: true });
  fs.writeFileSync(stateFile, JSON.stringify(state, null, 2));
}

// 递归收集所有 md 文件
function walkMd(dir) {
  const files = [];
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const stat = fs.statSync(full);
    if (stat.isDirectory())
      files.push(...walkMd(full));
    else if (stat.isFile() && name.toLowerCase().endsWith(".md"))
      files.push(full);
  }
  return files;
}

// 去掉 YAML 值外层引号及转义，循环处理直到稳定（修复历史写入的多层引号）
function unquoteValue(v) {
  let prev;
  while (prev !== v && v.length > 1
    && ((v.startsWith("\"") && v.endsWith("\"")) || (v.startsWith("'") && v.endsWith("'")))) {
    prev = v;
    v = v.slice(1, -1).replace(/\\"/g, "\"").replace(/\\'/g, "'").replace(/\\\\/g, "\\");
  }
  return v;
}

// 解析 frontmatter，返回数据对象和正文
function parseFrontmatter(content) {
  const m = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(content);
  if (!m)
    return { data: {}, body: content };
  const data = {};
  for (const line of m[1].split(/\r?\n/)) {
    const i = line.indexOf(":");
    if (i > 0)
      data[line.slice(0, i).trim()] = unquoteValue(line.slice(i + 1).trim());
  }
  return { data, body: content.slice(m[0].length) };
}

// YAML 值含特殊字符时才加引号（如值中含 ": " 或以特殊字符开头）
function yamlValue(v) {
  return /:\s|\s#|^[-?:,[\]{}#&*!|>'"%@`]/.test(v) ? JSON.stringify(v) : v;
}

const state = loadState();
const files = fs.existsSync(blogDir) ? walkMd(blogDir) : [];
let changedCount = 0;

for (const file of files) {
  const rel = path.relative(root, file).replace(/\\/g, "/");
  const stat = fs.statSync(file);
  const prev = state[rel];
  // 未改动过则跳过
  if (prev && prev.mtimeMs === stat.mtimeMs && prev.size === stat.size)
    continue;

  const content = fs.readFileSync(file, "utf8");
  const { data, body } = parseFrontmatter(content);

  // 正文最前面的 `# ` 一级标题作为 title；description 已有值则保留，否则取标题去掉编号前缀（如 "01 · "）
  const heading = /^[ \t]*#[ \t]+([^\r\n]*)/m.exec(body);
  const headingText = heading ? heading[1].trim() : "";
  const title = headingText || data.title || path.basename(file, path.extname(file));
  const description = data.description || headingText.replace(/^\d+\s*[·.\-—:：]\s*/, "") || title;

  // date：优先保留已有值（去掉时分秒，只留年-月-日），否则取文件创建日期；year 与之保持一致
  const date = (data.date || formatDate(stat.birthtime)).split(/\s+/)[0];
  const year = data.year || date.split("-")[0];
  const moddifyDate = formatDateTime(stat.mtime);

  // 按固定顺序重建 frontmatter，计算值优先，保留其余自定义字段
  const reserved = new Set(["title", "description", "date", "year", "moddifyDate"]);
  const ordered = { title, description, date, year, moddifyDate };
  for (const [k, v] of Object.entries(data)) {
    if (!reserved.has(k))
      ordered[k] = v;
  }
  const fmLines = Object.entries(ordered)
    .filter(([, v]) => v !== undefined && v !== "")
    .map(([k, v]) => `${k}: ${yamlValue(String(v))}`);

  const newContent = `---\n${fmLines.join("\n")}\n---\n\n${body.replace(/^\r?\n/, "")}`;
  fs.writeFileSync(file, newContent, "utf8");

  // 写入后重新取 mtime 记入状态，避免下次误判为改动
  const newStat = fs.statSync(file);
  state[rel] = { mtimeMs: newStat.mtimeMs, size: newStat.size };
  changedCount++;
  console.log(`[frontmatter] 已更新 ${rel}`);
}

saveState(state);
console.log(`[frontmatter] 扫描完成：共 ${files.length} 个文件，更新 ${changedCount} 个`);
