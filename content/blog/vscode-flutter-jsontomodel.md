---
title: vscode扩展flutter json转dart model
description: vscode扩展flutter json转dart model
date: 2026-11-11
year: 2026
moddifyDate: 2026-11-11 14:41:42
---

# vscode扩展flutter json转dart model

## 新建如下文件

```plaintext
.vscode/
├── extensions/
│ └── dart-json-gen/
│ ├── package.json
│ └── extension.js
└── tasks.json
```

```js [extension.js]
const vscode = require("vscode");

/** 顶层类名（需求约定），要改类名改这里 */
const TOP_CLASS_NAME = "DemoModel";

// ==================== 模式一：选中 JSON → 生成整个模型类 ====================

/** 宽松解析选中的对象字面量（支持单引号、无引号 key、尾逗号、外层数组） */
function parseSelectionObject(text) {
  const val = new Function(`return (${text.trim()})`)();
  if (Array.isArray(val)) {
    if (!val.length || val[0] === null || typeof val[0] !== "object") {
      throw new Error("数组元素需为对象");
    }
    return val[0]; // 接口常返回数组，取第一个元素作为字段模板
  }
  if (val && typeof val === "object")
    return val;
  throw new Error("选中的不是对象或对象数组");
}

/** 值 → Dart 类型推断 */
function inferType(v) {
  if (typeof v === "number")
    return Number.isInteger(v) ? "int" : "double";
  if (typeof v === "string")
    return "String";
  if (typeof v === "boolean")
    return "bool";
  if (Array.isArray(v))
    return "List<dynamic>";
  if (v === null || v === undefined)
    return "String?"; // 无法推断，给可空 String
  return "NESTED";
}

/** fromJson 取值表达式（按推断类型） */
function fromJsonExpr(t, field) {
  switch (t) {
    case "int":
      return `(json['${field}'] as num?)?.toInt() ?? 0`;
    case "double":
      return `(json['${field}'] as num?)?.toDouble() ?? 0`;
    case "bool":
      return `json['${field}'] as bool? ?? false`;
    case "String":
      return `json['${field}']?.toString() ?? ''`;
    case "String?":
      return `json['${field}']?.toString()`;
    case "List<dynamic>":
      return `(json['${field}'] as List<dynamic>?)?.toList() ?? []`;
    default:
      return `json['${field}']?.toString() ?? ''`;
  }
}

/** snake_case key → UpperCamel 类名：user_info → UserInfoModel */
function classNameFromKey(key) {
  return (
    `${key
      .split(/[_\-\s]+/)
      .filter(Boolean)
      .map(s => s.charAt(0).toUpperCase() + s.slice(1))
      .join("")}Model`
  );
}

function pickToStringFields(fields) {
  const names = fields.map(f => f.name);
  const prefer = ["id", "account", "nickname", "mobile", "token", "name"];
  const picked = prefer.filter(p => names.includes(p)).slice(0, 4);
  // 优先字段不足 3 个时，按声明顺序补齐
  for (const n of names) {
    if (picked.length >= 3)
      break;
    if (!picked.includes(n))
      picked.push(n);
  }
  return picked.length ? picked : names.slice(0, 3);
}

/** 递归生成类文本（嵌套对象生成独立子类），追加到 out */
function buildClass(className, obj, out) {
  const fields = [];
  for (const [k, v] of Object.entries(obj)) {
    const t = inferType(v);
    if (t === "NESTED") {
      const child = classNameFromKey(k);
      fields.push({
        name: k,
        dartType: child,
        expr: `${child}.fromJson(Map<String, dynamic>.from(json['${k}'] ?? {}))`,
      });
      buildClass(child, v, out); // 递归生成子类
    }
    else {
      fields.push({ name: k, dartType: t, expr: fromJsonExpr(t, k) });
    }
  }

  const ctorParams = fields.map(f => `required this.${f.name}`).join(", ");
  const ctorLines = fields.map(f => `    ${f.name}: ${f.expr},`).join("\n");
  const show = pickToStringFields(fields);
  const toStringArgs = show.map(f => `${f}: $${f}`).join(", ");

  let code = "";
  code += `class ${className} {\n`;
  fields.forEach((f) => {
    code += `  final ${f.dartType} ${f.name};\n`;
  });
  code += `\n  const ${className}({${ctorParams}});\n\n`;
  code += `  factory ${className}.fromJson(Map<String, dynamic> json) => ${className}(\n${ctorLines}\n  );\n\n`;
  code += `  @override\n  String toString() => '${className}(${toStringArgs})';\n}`;
  out.push(code);
}

// ==================== 模式二：选中 class → 在类内追加 fromJson/toString ====================

/** 按字段类型生成取值表达式 */
function genValueExpr(type, field) {
  const t = type.replace(/\s+/g, "");

  const listMatch = t.match(/^List<(.+?)(\??)>$/);
  if (listMatch) {
    const inner = listMatch[1];
    let mapper = "e.toString()";
    if (/^int$/.test(inner)) {
      mapper = "(e as num).toInt()";
    }
    else if (/^double$/.test(inner)) {
      mapper = "(e as num).toDouble()";
    }
    else if (/^num$/.test(inner)) {
      mapper = "e as num";
    }
    else if (/^bool$/.test(inner)) {
      mapper = "e as bool";
    }
    else if (!/^(String|dynamic)$/.test(inner)) {
      mapper = `${inner}.fromJson(Map<String, dynamic>.from(e))`;
    }
    return `(json['${field}'] as List<dynamic>?)?.map((e) => ${mapper}).toList() ?? []`;
  }

  if (/^bool\??$/.test(t))
    return `json['${field}'] as bool? ?? false`;
  if (/^int\??$/.test(t))
    return `(json['${field}'] as num?)?.toInt() ?? 0`;
  if (/^double\??$/.test(t))
    return `(json['${field}'] as num?)?.toDouble() ?? 0`;
  if (/^num\??$/.test(t))
    return `json['${field}'] as num? ?? 0`;
  if (/^String\??$/.test(t))
    return `json['${field}']?.toString() ?? ''`;
  if (/^[A-Z]/.test(t)) {
    return `${t}.fromJson(Map<String, dynamic>.from(json['${field}'] ?? {}))`;
  }
  return `json['${field}']?.toString() ?? ''`;
}

function findClassEndOffset(relText) {
  const decl = relText.match(/class\s+\w+/);
  if (!decl)
    return -1;
  const open = relText.indexOf("{", decl.index);
  if (open === -1)
    return -1;
  let depth = 0;
  for (let i = open; i < relText.length; i++) {
    if (relText[i] === "{") {
      depth++;
    }
    else if (relText[i] === "}") {
      depth--;
      if (depth === 0)
        return i;
    }
  }
  return -1;
}

function appendToClass(editor, doc, sel, relText) {
  const classMatch = relText.match(/class\s+(\w+)/);
  const fieldRegex = /^\s*(?:final\s+)?([A-Za-z_][\w<>,\s?]*?)\s+(\w+)\s*;/gm;

  const fields = [];
  let m;
  while ((m = fieldRegex.exec(relText)) !== null) {
    fields.push({ type: m[1].trim(), name: m[2] });
  }

  if (!classMatch || fields.length === 0) {
    vscode.window.showErrorMessage(
      "未识别到 class 声明或字段（需要形如 String account; 的字段）"
    );
    return;
  }

  const endOffset = findClassEndOffset(relText);
  if (endOffset < 0) {
    vscode.window.showErrorMessage("无法定位 class 的闭合 }");
    return;
  }

  const className = classMatch[1];
  const insertPos = doc.positionAt(doc.offsetAt(sel.start) + endOffset);

  const ctorLines = fields
    .map(f => `    ${f.name}: ${genValueExpr(f.type, f.name)},`)
    .join("\n");
  const showFields = pickToStringFields(fields.map(f => f.name));
  const toStringArgs = showFields.map(f => `${f}: $${f}`).join(", ");

  const insertText
    = `\n\n  factory ${className}.fromJson(Map<String, dynamic> json) => ${className}(\n`
      + `${ctorLines}\n`
      + `  );\n\n`
      + `  @override\n`
      + `  String toString() =>\n`
      + `      '${className}(${toStringArgs})';\n`;

  editor
    .edit(builder => builder.insert(insertPos, insertText))
    .then((ok) => {
      if (ok) {
        vscode.window.showInformationMessage(
          `已为 ${className} 追加 fromJson / toString`
        );
      }
    });
}

// ==================== 命令入口：自动识别两种模式 ====================

function activate(context) {
  const cmd = vscode.commands.registerCommand("dartJsonGen.generate", () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor)
      return;
    if (editor.selection.isEmpty) {
      vscode.window.showErrorMessage("请先选中 JSON 对象（或 Dart class）");
      return;
    }

    const doc = editor.document;
    const sel = editor.selection;
    const relText = doc.getText(sel);
    const trimmed = relText.trim();

    // 模式一：JSON 模式（选区以 { 或 [ 开头）→ 替换为完整模型类
    if (/^[{[]/.test(trimmed)) {
      let obj;
      try {
        obj = parseSelectionObject(relText);
      }
      catch (e) {
        vscode.window.showErrorMessage(
          `解析失败：选中的不是合法的 JS/JSON 对象（${e.message}）`
        );
        return;
      }

      const classes = [];
      buildClass(TOP_CLASS_NAME, obj, classes);

      editor
        .edit(builder => builder.replace(sel, `${classes.join("\n\n")}\n`))
        .then((ok) => {
          if (ok) {
            const names = classes.map(c => c.match(/class (\w+)/)[1]);
            vscode.window.showInformationMessage(
              `已生成 ${names.length} 个模型类：${names.join("、")}`
            );
          }
        });
      return;
    }

    // 模式二：class 模式（选区含 class 声明）→ 类内追加 fromJson/toString
    if (/class\s+\w+/.test(trimmed)) {
      appendToClass(editor, doc, sel, relText);
      return;
    }

    vscode.window.showErrorMessage(
      "选区需为 JSON 对象（以 { 或 [ 开头）或 Dart class 声明"
    );
  });

  context.subscriptions.push(cmd);
}

function deactivate() {}

// 供测试脚本复用（不影响扩展运行）
module.exports = {
  activate,
  deactivate,
  __internals: {
    parseSelectionObject,
    inferType,
    fromJsonExpr,
    buildClass,
    classNameFromKey,
    TOP_CLASS_NAME,
  },
};
```

```json [package.json]
{
  "name": "dart-json-gen",
  "displayName": "Dart fromJson Generator (project-local)",
  "description": "选中 Dart class，生成 fromJson / toString",
  "version": "0.0.1",
  "publisher": "local",
  "engines": { "vscode": "^1.80.0" },
  "categories": ["Other"],
  "main": "./extension.js",
  "activationEvents": [],
  "contributes": {
    "commands": [
      {
        "command": "dartJsonGen.generate",
        "title": "Dart: 生成 fromJson",
        "category": "Dart"
      }
    ],
    "keybindings": [
      {
        "command": "dartJsonGen.generate",
        "key": "shift+alt+j",
        "when": "editorTextFocus"
      }
    ],
    "menus": {
      "editor/context": [
        {
          "command": "dartJsonGen.generate",
          "when": "editorTextFocus",
          "group": "9_dartJsonGen"
        }
      ]
    }
  }
}
```

> 注意vscode的安装路径，需要修改command

```tasks.json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "▶ 启动扩展宿主（fromJson 扩展）",
      "detail": "打开一个加载 dart-json-gen 扩展的新 VS Code 窗口；不影响 F5 调试",
      "type": "shell",
      "command": "D:\\Program Files\\Microsoft VS Code\\bin\\code.cmd",
      "args": [
        "--new-window",
        "--extensionDevelopmentPath=${workspaceFolder}/.vscode/extensions/dart-json-gen",
        "${workspaceFolder}"
      ],
      "isBackground": true,
      "problemMatcher": []
    }
  ]
}
```

## 使用

如下json

```json
{
  openId: '11111',
  name: 'test',
  nickName: 'test',
  pic: [],
}
```

新建一个dart文件，然后选中一个json对象，然后按下shift+alt+j,或者右击菜单点击【Dart: 生成 fromJson】，就会自动生成一个dart类

效果如下：

```dart
class DemoModel {
  final String openId;
  final String name;
  final String nickName;
  final List<dynamic> pic;

  const DemoModel({required this.openId, required this.name, required this.nickName, required this.pic});

  factory DemoModel.fromJson(Map<String, dynamic> json) => DemoModel(
    openId: json['openId']?.toString() ?? '',
    name: json['name']?.toString() ?? '',
    nickName: json['nickName']?.toString() ?? '',
    pic: (json['pic'] as List<dynamic>?)?.toList() ?? [],
  );

  @override
  String toString() => 'DemoModel(name: $name, openId: $openId, nickName: $nickName)';
}
```
