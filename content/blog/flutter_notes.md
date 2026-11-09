---
title: Flutter 学习笔记 — 知识点详解与案例
description: Flutter 学习笔记 — 知识点详解与案例
date: 2026-11-6
year: 2026
moddifyDate: 2026-11-6 17:33:09
---

# Flutter 学习笔记 — 知识点详解与案例

> 整理自思维导图《FlutterNodeForPDF》 · 共 34 个知识点 · 每个知识点附完整可运行示例

## 01 环境与常用命令

Flutter CLI 是日常开发的入口：创建工程、运行、检查环境、升级。

**常用命令**：`flutter create 项目名`（创建工程）· `flutter run`（运行）· `flutter doctor`（体检）· `flutter --version` · `flutter --upgrade` · `flutter packages get`（拉取依赖）

```bash
# 1. 创建工程并打开
flutter create my_app
cd my_app && code ./

# 2. 环境体检：新装环境必跑，全绿才能正常编译
flutter doctor

# 3. 运行到连接的设备
flutter run

# 4. bash/.zshrc 环境变量配置（macOS/Linux）
# export PATH="$PATH:`pwd`/flutter/bin"
```

> **IDE 提效**：VS Code 装 Dart 插件后输入 `stful`（有状态组件）、`stlss`（无状态组件）、`bld`（build 方法）、`init`/`dis`（生命周期）快速生成模板；Android Studio 装 Awesome Flutter Snippets；也可自定义 snippet `${1:WidgetName}`（1 表示聚焦位置）。

---

## 02 MaterialApp 与 Scaffold（脚手架）

MaterialApp 是应用入口（Material Design 风格），Scaffold 是每个页面的"脚手架"，提供 AppBar、抽屉、底部导航、悬浮按钮等骨架。

**Scaffold 关键属性**：`appBar`（elevation 别设 0）· `drawer/endDrawer`（左/右侧滑栏）· `bottomNavigationBar`（item>4 需设 `type: fixed`）· `floatingActionButton + floatingActionButtonLocation`（endDocked/centerDocked 与 BottomAppBar 融合）

```dart
void main() => runApp(App());

class App extends StatelessWidget {
  final _scaffoldKey = GlobalKey<ScaffoldState>(); // 用于打开 BottomSheet 等
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,   // 去掉右上角 debug 标签
      theme: ThemeData(primarySwatch: Colors.blue),
      home: Scaffold(
        key: _scaffoldKey,
        appBar: AppBar(title: Text('脚手架示例'), elevation: 4),
        drawer: Drawer(child: DrawerHeader(child: Text('侧边栏'))),
        body: Center(child: Text('Hello Flutter')),
        floatingActionButton: FloatingActionButton(
          child: Icon(Icons.add), onPressed: () {}),
        bottomNavigationBar: BottomNavigationBar(
          type: BottomNavigationBarType.fixed, // item 超 4 个不变白
          items: [
            BottomNavigationBarItem(icon: Icon(Icons.home), label: '首页'),
            BottomNavigationBarItem(icon: Icon(Icons.person), label: '我的'),
          ]),
      ),
    );
  }
}
```

> **经验**：抽屉内关闭用 `Navigator.pop(context)`；显示抽屉则去掉 AppBar 的 leading 后左滑即可。

---

## 03 Text 与 RichText（文字样式）

Text 负责单一样式文字；RichText 用 TextSpan 嵌套实现一行内多样式。

**TextStyle**：`color` · `fontSize` · `fontWeight: bold` · `fontStyle: italic` · `textAlign` · `maxLines + overflow: ellipsis`（超行省略）。主题样式：`Theme.of(context).textTheme.title`。

```dart
Column(children: [
  Text('普通文本，最多两行超出省略',
    maxLines: 2,
    overflow: TextOverflow.ellipsis,
    textAlign: TextAlign.right,
    style: TextStyle(
      color: Colors.blue,
      fontSize: 18,
      fontWeight: FontWeight.bold,
      fontStyle: FontStyle.italic,
    )),
  // 行内多样式：富文本
  RichText(text: TextSpan(
    text: '价格：',
    style: TextStyle(color: Colors.black, fontSize: 14),
    children: [
      TextSpan(text: '￥99', style: TextStyle(color: Colors.red, fontSize: 22, fontWeight: FontWeight.bold)),
      TextSpan(text: ' /件', style: TextStyle(color: Colors.grey, fontSize: 12)),
    ])),
])
```

> **经验**：RichText 会占很大的默认位置，可用 `SizedBox` 或 `Row/Column` 包裹来约束尺寸。

---

## 04 Image 图片

网络图用 `Image.network`/NetworkImage，本地资源用 `Image.asset`/AssetImage；通过 DecorationImage 可将图片作为容器装饰。

**常用属性**：`fit: BoxFit.cover`（保持比例覆盖）· `repeat: ImageRepeat.repeatY`（平铺）· `alignment` · `colorFilter: ColorFilter.mode(颜色, BlendMode.hardLight)`（滤镜混色）

```dart
// 1. 网络图片
Image.network('https://picsum.photos/200',
  width: 120, height: 120, fit: BoxFit.cover);

// 2. 本地图片（需在 pubspec.yaml 声明 assets）
Image.asset('assets/imgs/logo.png', width: 48);

// 3. 图片作为容器装饰 + 圆角 + 透明度颜色叠加
Container(
  width: 200, height: 120,
  decoration: BoxDecoration(
    borderRadius: BorderRadius.circular(12),
    image: DecorationImage(
      image: NetworkImage('https://picsum.photos/400/240'),
      fit: BoxFit.cover,
      alignment: Alignment.topCenter,
      colorFilter: ColorFilter.mode(
        Colors.yellow[400]!.withOpacity(0.6), BlendMode.hardLight),
    ),
  ));
```

> **经验**：若图片不显示且外层 Container 设置了 color，可先去掉 color 排查冲突。

---

## 05 Container 与 BoxDecoration（容器装饰）

Container 是最常用的容器，配合 EdgeInsets、Alignment、BoxDecoration 实现边距、对齐、圆角、边框、阴影、渐变。

**要点**：

- `Alignment(x,y)` x/y 取 -1~1（-1 左/上，0 中，1 右/下），也可用封装 `Alignment.topCenter`
- EdgeInsets：`all()` / `only()`
- 阴影 `BoxShadow(color, blurRadius 模糊度, spreadRadius 扩散, offset Offset(0,3))`，可叠加多个
- 渐变 `LinearGradient(begin,end,colors)` / `RadialGradient`

```dart
Container(
  width: 240, height: 120,
  alignment: Alignment(0.8, 0),      // 手动指定更灵活
  margin: EdgeInsets.all(16),
  padding: EdgeInsets.only(left: 12),
  decoration: BoxDecoration(
    color: Colors.blue[50],
    borderRadius: BorderRadius.circular(12),
    border: Border.all(
      color: Colors.blue, width: 1,
      style: BorderStyle.solid),
    gradient: LinearGradient(
      begin: Alignment.topCenter, end: Alignment.bottomCenter,
      colors: [Colors.blue, Colors.purple]),
    boxShadow: [
      BoxShadow(color: Colors.black26, blurRadius: 8, spreadRadius: 1, offset: Offset(0, 3)),
      BoxShadow(color: Colors.blue12, blurRadius: 4),  // 可叠加多个
    ]),
  child: Text('渐变卡片', style: TextStyle(color: Colors.white)),
);
```

> **注意**：设置了 decoration 后不能再设置 color（会报错），颜色写进 decoration 里。

---

## 06 Row / Column（Flex 弹性布局）

横排/竖排布局，概念同 CSS FlexBox。Row 主轴为横向，Column 主轴为纵向（交叉轴相差 90°）。

- **mainAxisAlignment（主轴）**：`start`（默认）· `end` · `center` · `spaceAround`（两侧留半份间距）· `spaceBetween`（首尾贴边均分中间）· `spaceEvenly`（完全均分）
- **CrossAxisAlignment（交叉轴）**：`center`（默认）· `start/end` · `stretch`（拉伸到父容器尺寸）

```dart
Row(
  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
  crossAxisAlignment: CrossAxisAlignment.center,
  children: [
    Expanded(flex: 1, child: Container(height: 40, color: Colors.blue)),   // 占 1/3
    Expanded(flex: 2, child: Container(height: 40, color: Colors.red)),    // 占 2/3
  ]);

Column(
  mainAxisAlignment: MainAxisAlignment.center,
  children: [Text('竖排 A'), Text('竖排 B')]);
```

---

## 07 Stack 与 Positioned（叠加布局）

一摞子部件叠加在一起，配合 Positioned 精确指定子组件相对四边的位置。

```dart
Stack(
  alignment: Alignment.topCenter,  // 未 Positioned 的子组件对齐方式
  children: [
    Image.network('https://picsum.photos/400/200', fit: BoxFit.cover),
    Positioned(
      right: 8, bottom: 8,       // 距右/底的间距
      child: Container(
        padding: EdgeInsets.symmetric(horizontal: 8, vertical: 2),
        color: Colors.black54,
        child: Text('广告', style: TextStyle(color: Colors.white, fontSize: 12)))),
  ]);
```

---

## 08 尺寸类布局组件

- **Expanded**：占满主轴剩余空间，`flex` 默认 1，设 2 表示占双倍
- **SizedBox**：固定尺寸，也常用于指定间距 / 约束 Container 尺寸
- **AspectRatio**：宽高比（如 16/9）
- **ConstrainedBox**：限制最小/最大宽高

```dart
Column(children: [
  SizedBox(height: 20),                       // 20px 空白间距
  AspectRatio(aspectRatio: 16/9,            // 16:9 视频区域
    child: Container(color: Colors.black12)),
  ConstrainedBox(constraints: BoxConstraints(minWidth: 100, maxHeight: 60),
    child: Text('受限内容')),
]);
```

> **经验**：给 Container 设定具体宽高，也可以在最外层包一个 SizedBox 来指定。

---

## 09 按钮家族（Material 风格）

FlatButton（文字按钮）、RaisedButton（带背景色+阴影）、OutlineButton（描边按钮）、IconButton、FloatingActionButton。

**通用属性**：`onPressed: null` 表示按钮不可点 · `color/textColor` · `splashColor`（水波纹溅墨色）· `elevation`（阴影高度）· `shape`（形状）· `.icon()` 版本带图标。

```dart
Column(children: [
  FlatButton(onPressed: () {}, child: Text('文字按钮'),
    textColor: Colors.blue, splashColor: Colors.blue[50]),

  RaisedButton(
    onPressed: () {}, elevation: 4,
    color: Colors.blue, textColor: Colors.white,
    shape: StadiumBorder(),          // 椭圆形（足球场）
    child: Text('提交')),

  OutlineButton(
    onPressed: () {}, borderSide: BorderSide(color: Colors.blue),
    highlightedBorderColor: Colors.deepOrange,
    child: Text('描边按钮')),

  IconButton(icon: Icon(Icons.menu), tooltip: '菜单', onPressed: () {}),

  FloatingActionButton.extended(     // 带图片和文字的 FAB
    icon: Icon(Icons.edit), label: Text('新建'), onPressed: () {}),

  ButtonBar(                          // 一组带边距的横排按钮
    children: [FlatButton(onPressed: () {}, child: Text('取消')),
               FlatButton(onPressed: () {}, child: Text('确定'))]),
]);
```

**shape 形状**：`StadiumBorder()` 椭圆 · `BeveledRectangleBorder(borderRadius: BorderRadius.circular(10))` 斜角矩形 · `CircleBorder()` 圆形。

> **定宽按钮**：按钮宽度即容器宽度——包一层 `Container(width: ...)` 或 `Expanded`。
> **改间距**：外层 `Theme` 包裹，`data: Theme.of(context).copyWith(buttonTheme: ButtonThemeData(padding: ...))`。

---

## 10 Chip 碎片与 Wrap 换行布局

Chip 是小标签/过滤条件。Wrap 让小部件自动换行排列（`spacing` 横向间距、`runSpacing` 行间距）。

**四种 Chip**：`Chip`（可带 onDeleted 删除）· `ActionChip`（自带点击事件）· `FilterChip`（类似多选）· `ChoiceChip`（类似单选）；均可设 `avatar: CircleAvatar` 圆形图标。

```dart
class TagPage extends StatefulWidget {
  @override
  _TagPageState createState() => _TagPageState();
}
class _TagPageState extends State<TagPage> {
  final tags = ['数码', '穿搭', '美食', '旅行', '运动', '电影'];
  int _choice = 0;
  final Set<String> _filters = {};

  @override
  Widget build(BuildContext context) => Wrap(
    spacing: 8, runSpacing: 8,     // 自动换行显示小部件
    children: [
      Chip(
        avatar: CircleAvatar(child: Text('标')),  // 圆形图像
        label: Text('可删除标签'),
        onDeleted: () {},                      // 显示删除小按钮
        deleteIcon: Icons.cancel, deleteIconColor: Colors.grey,
        deleteButtonTooltipMessage: '移除该标签'),
      ActionChip(label: Text('点我执行动作'), onPressed: () {}),
      ...tags.asMap().entries.map((e) => ChoiceChip(    // 单选
        label: Text(e.value), selected: _choice == e.key,
        onSelected: (_) => setState(() => _choice = e.key))),
      ...tags.map((t) => FilterChip(                     // 多选过滤
        label: Text(t), selected: _filters.contains(t),
        onSelected: (v) => setState(() => v ? _filters.add(t) : _filters.remove(t)))),
    ]);
}
```

---

## 11 选择控件

Checkbox / Radio / Switch / Slider 及其 ListTile 版本（CheckboxListTile、RadioListTile、SwitchListTile）。

```dart
class _SelState extends State<SelPage> {
  bool _check = false;
  int _gender = 1;
  bool _notify = true;
  double _volume = 3;

  @override
  Widget build(BuildContext context) => Column(children: [
    Checkbox(value: _check, activeColor: Colors.blue,     // 勾选状态颜色
      onChanged: (v) => setState(() => _check = v!)),
    CheckboxListTile(title: Text('大标题'), subtitle: Text('副标题'),
      secondary: Icon(Icons.mail),                         // 左边图标
      value: _check, onChanged: (v) => setState(() => _check = v!)),
    RadioListTile<int>(value: 1, groupValue: _gender,    // value 与 groupValue 相等即选中
      title: Text('男'), onChanged: (v) => setState(() => _gender = v!)),
    RadioListTile<int>(value: 2, groupValue: _gender,
      title: Text('女'), onChanged: (v) => setState(() => _gender = v!)),
    SwitchListTile(title: Text('消息通知'),
      value: _notify, activeColor: Colors.blue,
      onChanged: (v) => setState(() => _notify = v)),
    Slider(
      value: _volume, min: 0, max: 10,
      divisions: 10,                        // 分成 10 份
      label: _volume.toStringAsFixed(0),     // 滑动时气泡文字
      activeColor: Colors.blue, inactiveColor: Colors.grey[300],
      onChanged: (v) => setState(() => _volume = v),
      // onChanged: null 表示禁用滑块
    ),
  ]);
}
```

---

## 12 对话框

统一使用 showDialog 显示对话框；`barrierDismissible: false` 表示点空白不取消（默认 true）。异步接收返回值用 `await` + `async`。

```dart
Future<void> _openDialogs() async {
  // 1. AlertDialog（提示对话框，actions 一般用 FlatButton）
  final ok = await showDialog<bool>(
    context: context,
    barrierDismissible: false,
    builder: (BuildContext context) => AlertDialog(
      icon: Icon(Icons.warning),        // 文本框/标题左边图标
      title: Text('删除确认'),
      content: Text('确定要删除这条数据吗？'),
      actions: [
        FlatButton(onPressed: () => Navigator.pop(context), child: Text('取消')),
        FlatButton(onPressed: () => Navigator.pop(context, true),  // 带参数返回
          child: Text('确定')),
      ]));
  if (ok == true) print('用户点了确定');  // 结果建议在 setState 中处理

  // 2. SimpleDialog（最简单的选择对话框）
  final fruit = await showDialog<String>(
    context: context,
    builder: (_) => SimpleDialog(
      title: Text('选择水果'),
      children: [
        SimpleDialogOption(child: Text('苹果'),
          onPressed: () => Navigator.pop(context, 'A')),
        SimpleDialogOption(child: Text('香蕉'),
          onPressed: () => Navigator.pop(context, 'B')),
      ]));

  // 3. 底部滑动窗口（类似音乐播放器的底部悬浮窗）
  await showModalBottomSheet(
    context: context,
    builder: (_) => Container(height: 200, child: Center(child: Text('BottomSheet'))));
}
```

> **经验**：BottomSheet 也可用 `scaffoldKey.currentState.showBottomSheet(...)` 打开；点击 item 后用 `Navigator.pop(context, "A")` 带数据返回。

---

## 13 SnackBar 操作提示栏

在 Text 底部出现的提示条，常用于表单提交成功/失败反馈。

```dart
Scaffold.of(context).showSnackBar(SnackBar(
  content: Text('注册成功！'),
  action: SnackBarAction(                 // 可以带一个动作，类似按钮
    label: '撤销', onPressed: () { /* 处理撤销 */ }),
));
```

> **注意**：必须在 Scaffold 的 body 内部使用（通过 context 能找到 Scaffold）。

---

## 14 表单 Form 与 TextFormField

Form 包裹 TextFormField，用 `GlobalKey<FormState>` 保存/校验/取数据。

**校验优化**：`autovalidate` 默认不开启，提交时先 `validate()`，失败后再打开自动验证——避免用户输入过程中频繁报错。

```dart
class _LoginFormState extends State<LoginForm> {
  final _formKey = GlobalKey<FormState>();
  final _account = TextEditingController();   // controller 添加初始值和状态
  bool _autoValidate = false;

  @override
  void initState() { super.initState(); _account.text = ''; }  // 设置默认值
  @override
  void dispose() { _account.dispose(); super.dispose(); }      // 基类必须释放

  void _submit() {
    if (_formKey.currentState!.validate()) {
      _formKey.currentState!.save();        // 触发所有 onSaved，收集数据
      Scaffold.of(context).showSnackBar(SnackBar(content: Text('注册成功')));
    } else {
      setState(() => _autoValidate = true);  // 失败后打开自动验证
    }
  }

  @override
  Widget build(BuildContext context) => Form(
    key: _formKey,
    autovalidate: _autoValidate,
    child: Column(children: [
      TextFormField(
        controller: _account,
        decoration: InputDecoration(labelText: '账号'),
        validator: (v) => (v == null || v.isEmpty) ? '账号不能为空' : null,
        onSaved: (v) => print('保存账号: $v')),
      TextFormField(
        obscureText: true,                    // 密码方式
        decoration: InputDecoration(labelText: '密码', hintText: '6-16位'),
        validator: (v) => (v ?? '').length < 6 ? '密码至少 6 位' : null,
        onSaved: (v) => print('保存密码: $v')),
      RaisedButton(onPressed: _submit, child: Text('提交')),
    ]));
}
```

---

## 15 TextField 文本框

**InputDecoration**：`labelText`（顶部标签）· `hintText`（提示文字）· `icon`（左边图标）· `border: InputBorder.none`（去底部默认边框）· `border: OutlineInputBorder()`（四周边框）· `filled: true + fillColor`（背景色）。

```dart
final _ctrl = TextEditingController();

TextField(
  controller: _ctrl,
  decoration: InputDecoration(
    icon: Icon(Icons.search),
    labelText: '搜索',
    hintText: '请输入关键字',
    border: OutlineInputBorder(),      // 四周添加边框（主题 primaryColor）
    filled: true, fillColor: Colors.grey[100]),
  onChanged: (value) => print('文字变化: $value'),   // 每次输入触发
  onSubmitted: (value) => print('键盘确定: $value'), // 点键盘确定触发
);
// 也可以监听 controller：_ctrl.addListener(() { print(_ctrl.text); })
```

---

## 16 ListView 列表

数据多时用 `ListView.builder` 按需生成页面项目，性能更好。

```dart
final items = List.generate(30, (i) => '列表项 $i');

ListView.builder(
  itemCount: items.length,
  itemBuilder: (BuildContext context, int index) => ListTile(
    leading: CircleAvatar(child: Text('$index')),  // 文字前的图标/头像
    title: Text(items[index]),                      // 大标题
    subtitle: Text('副标题说明'),
    trailing: Icon(Icons.chevron_right),            // 文字后面添加图标，好看又有样式
    onTap: () {},
  ));
```

---

## 17 GridView 网格视图

**三种写法**：`GridView.count`（crossAxisCount 固定列数）· `GridView.extent`（maxCrossAxisExtent 设定 item 最大宽/高）· `GridView.builder`（按需生成）。通用：`crossAxisSpacing/mainAxisSpacing` 间距、`scrollDirection: Axis.horizontal` 改横向、`childAspectRatio` 宽高比例。

```dart
GridView.count(
  crossAxisCount: 3,            // 水平方向最多几个 item
  crossAxisSpacing: 8, mainAxisSpacing: 8,
  childAspectRatio: 0.8,        // 显示比例，可观察不同效果
  children: List.generate(9, (i) => Container(   // List 直接生成模拟数组
    color: Colors.blue[50],
    alignment: Alignment.center,
    child: Text('Item $i'))));

// 数据量大时按需生成：
GridView.builder(
  gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
    crossAxisCount: 2, crossAxisSpacing: 8, mainAxisSpacing: 8),
  itemCount: 100,
  itemBuilder: (context, index) => Container(color: Colors.teal[50]));
```

---

## 18 PageView 滑动页面（引导页/轮播）

可以简单一页页水平/垂直滚动的页面。

**要点**：`scrollDirection: Axis.vertical` 改竖向 · `pageSnapping: false` 关闭滑到一半自动吸附 · `reverse: true` 数据全部翻转倒置 · `viewportFraction: 0.85` 当前页不占满屏幕（相邻页可见）· `onPageChanged` 当前页回调 · `controller: PageController(initialPage, keepPage)` 控制翻页。

```dart
PageView.builder(
  itemCount: 3,
  controller: PageController(initialPage: 0, viewportFraction: 0.85),
  onPageChanged: (page) => print('当前第 $page 页'),
  itemBuilder: (context, index) => Container(
    margin: EdgeInsets.all(12),
    color: Colors.blue[100 * (index % 8 + 1)],
    child: Center(child: Text('第 $index 页'))));
```

---

## 19 ExpansionPanelList 收缩面板

可展开/收起的分组面板，类似手风琴。ExpansionPanel 的 `isExpanded` 控制展开状态，在 `expansionCallback` 中 setState 切换。

```dart
class _PanelState extends State<PanelPage> {
  final List<bool> _expanded = [true, false, false];

  @override
  Widget build(BuildContext context) => SingleChildScrollView(
    child: ExpansionPanelList(
      expansionCallback: (int panelIndex, bool isExpanded) =>
        setState(() => _expanded[panelIndex] = !isExpanded),
      children: ['账号设置', '消息通知', '关于我们'].asMap().entries.map((e) =>
        ExpansionPanel(
          isExpanded: _expanded[e.key],
          headerBuilder: (context, isExpanded) => ListTile(title: Text(e.value)),
          body: Padding(padding: EdgeInsets.all(16), child: Text('${e.value} 的详细内容...')),
        )).toList()));
}
```

---

## 20 DataTable 数据表格

DataTable 定义表头+数据行；PaginatedDataTable 分页显示，需要 extends `DataTableSource` 的数据源。

**排序**：`sortColumnIndex` 第几列可排序 · `sortAscending` 默认 true 升序 · `onSort(columnIndex, ascending)` 中对数据源 `list.sort((a,b) => a.length.compareTo(b.length))`。

```dart
class _TableState extends State<TablePage> {
  bool _asc = true;
  final users = ['Charlie', 'Alice', 'Bob'];

  @override
  Widget build(BuildContext context) => DataTable(
    sortColumnIndex: 0,              // 第 1 列可排序
    sortAscending: _asc,
    columns: [
      DataColumn(label: Text('姓名'), onSort: (i, asc) =>
        setState(() { _asc = asc; users.sort((a, b) => a.compareTo(b) * (asc ? 1 : -1)); })),
      DataColumn(label: Text('操作')),
    ],
    rows: users.map((u) => DataRow(
      selected: false,
      onSelectChanged: (v) => print('选中行: $u'),   // 行选中状态
      cells: [DataCell(Text(u)), DataCell(Text('删除'))])).toList());
}

// PaginatedDataTable：数据源继承 DataTableSource，提供
// getRow(index) 返回 DataRow.byIndex(...)、rowCount、isRowCountApproximate=false、selectedRowCount
// PaginatedDataTable(header: '用户', rowsPerPage: 10, source: MyTableSource(), columns: [...])
```

---

## 21 Stepper 步骤条

```dart
int _current = 0;  // 当前第几个步骤

Stepper(
  currentStep: _current,
  steps: [
    Step(title: Text('填写信息'), isActive: _current >= 0,   // 是否激活
      content: TextField(decoration: InputDecoration(labelText: '姓名'))),
    Step(title: Text('验证手机'), isActive: _current >= 1,
      content: TextField(decoration: InputDecoration(labelText: '验证码'))),
    Step(title: Text('完成'), isActive: _current >= 2,
      content: Text('注册完成 🎉')),
  ],
  onStepTapped: (i) => setState(() => _current = i),   // 点击步骤头跳转
  onStepContinue: () => _current < 2 ? setState(() => _current++) : null,
  onStepCancel: () => _current > 0 ? setState(() => _current--) : null,
);
```

---

## 22 导航结构组件

DefaultTabController 添加 tab 标签；Drawer 侧滑栏；BottomAppBar + floatingActionButtonLocation 实现 FAB 凹陷布局。

```dart
DefaultTabController(   // 添加 tab 标签的控件
  length: 2,
  child: Scaffold(
    appBar: AppBar(
      leading: IconButton(icon: Icon(Icons.menu), onPressed: () {}),
      title: Text('Tabs'),
      bottom: TabBar(
        unselectedLabelColor: Colors.grey,     // 未选中 tab 颜色
        indicatorColor: Colors.blue,           // 底部滑动选项卡颜色
        indicatorSize: TabBarIndicatorSize.tab, // label: 跟文字长度；默认一整行
        indicatorWeight: 3,
        tabs: [Tab(icon: Icon(Icons.home), text: '推荐'),
               Tab(icon: Icon(Icons.person), text: '我的')])),
    body: TabBarView(children: [Text('推荐内容'), Text('我的内容')]),
    // Drawer 侧边栏顶部用户信息：
    drawer: Drawer(child: Column(children: [
      UserAccountsDrawerHeader(
        accountName: Text('Dev'),
        accountEmail: Text('dev@example.com'),
        currentAccountPicture: CircleAvatar(          // 圆形头像
          backgroundImage: NetworkImage('https://picsum.photos/80')),
      ),
      ListTile(leading: Icon(Icons.settings), title: Text('设置'),
        onTap: () => Navigator.pop(context)),          // 关闭 Drawer
    ])),
    // BottomAppBar + FAB 凹陷效果：
    floatingActionButton: FloatingActionButton(child: Icon(Icons.add), onPressed: () {}),
    floatingActionButtonLocation: FloatingActionButtonLocation.centerDocked,
    bottomNavigationBar: BottomAppBar(shape: CircularNotchedRectangle(),
      child: Row(children: [Icon(Icons.home), Spacer(), Icon(Icons.person)]))));
```

> **BottomAppBar 知识点**：app 的底部工具栏，配合 `FloatingActionButtonLocation.endDocked`（工具栏结束位置）/ `centerDocked`（中间位置）。

---

## 23 路由 Routes 与 Navigator

两种方式：命名路由（MaterialApp 中注册 routes map）和 MaterialPageRoute 直接 push。

```dart
void main() => runApp(MaterialApp(
  initialRoute: '/',              // 指定默认打开的界面；'/' 表示路由根
  routes: {
    '/': (context) => HomePage(),
    '/about': (context) => AboutPage(),
  },
));

// 打开命名路由：
Navigator.pushNamed(context, '/about');

// 直接 push（可传构造参数）：
Navigator.of(context).push(MaterialPageRoute(
  builder: (BuildContext context) => DetailPage(title: 'About')));

// 返回并带参数：
Navigator.pop(context, '返回的数据');
final result = await Navigator.push(...);   // 异步接收返回值
```

---

## 24 StatefulWidget 与 StatelessWidget

StatelessWidget 创建后状态不会再变化，成员变量必须是 final；StatefulWidget 通过 setState 更新界面。**更新代码必须写在 setState 里，否则界面不会刷新**；setState 的更新范围是当前 State 类（局部更新）。

```dart
// 无状态：构造参数全是 final，数据由父组件传入
class Counter extends StatelessWidget {
  final int count;                          // 必须是 final
  final VoidCallback onIncrease;             // 把事件传回父组件处理
  Counter({required this.count, required this.onIncrease});
  @override
  Widget build(BuildContext context) => Column(children: [
    Text('$count', style: TextStyle(fontSize: 32)),
    RaisedButton(onPressed: onIncrease, child: Text('+1')),
  ]);
}

// 有状态：父组件持有数据，子组件回调修改 —— 数据从父传子，事件从子传父
class _CounterWrapperState extends State<CounterWrapper> {
  int _count = 0;
  void _increase() => setState(() => _count++);   // 更新必须写进 setState
  @override
  Widget build(BuildContext context) =>
    Counter(count: _count, onIncrease: _increase);
}
```

> **经验**：子组件只负责显示数据时，可将 StatefulWidget 全部替换为 StatelessWidget，构造包含常量和 VoidCallback，在父辈中写回调 `void _xxx() { ... }`。

---

## 25 InheritedWidget（跨层共享数据）

把数据从祖先组件直接传递到任意深度的后代组件（Flutter 里 Provider/Theme 等的底层机制）。

```dart
class XProvider extends InheritedWidget {
  final int counter;
  XProvider({required this.counter, required Widget child})
      : super(child: child);

  @override
  bool updateShouldNotify(XProvider old) => true;  // 是否通知依赖的子部件重建

  static XProvider? of(BuildContext context) =>
      context.dependOnInheritedWidgetOfExactType<XProvider>();
}

// 使用：在 State 的最外层包装 XProvider，设置基础数据；子组件任意层级直接取：
final counter = XProvider.of(context)!.counter;  // 子组件内获取 XProvider 的值
```

---

## 26 Future 与 async/await + FutureBuilder

```dart
Future<String> fetchData() async {
  await Future.delayed(Duration(seconds: 3));   // 模拟延迟 3 秒
  return '加载完成的数据';
}

// FutureBuilder：根据 Future 自动重建界面
FutureBuilder<String>(
  future: fetchData(),
  builder: (context, snapshot) {
    switch (snapshot.connectionState) {
      case ConnectionState.waiting:
        return CircularProgressIndicator();       // 第一次 data 为 null，过一会就有值
      case ConnectionState.done:
        return Text(snapshot.data ?? '');          // 根据状态给不同布局
      default:
        return Text('加载中...');
    }
  });
```

---

## 27 Stream / StreamController / StreamBuilder

Stream 单向流动数据；StreamController 控制数据流（`x.stream` ≈ `Stream<T>`，`x.sink.add()` 添加数据，`close()` 在 dispose 中且在 super.dispose 之前调用）；StreamBuilder 根据 Stream 数据自动重建界面（不再需要 setState）。

```dart
class _StreamDemoState extends State<StreamDemo> {
  late StreamController<String> _controller;   // 默认用这个（单订阅）
  StreamSubscription? _sub;

  @override
  void initState() {
    super.initState();
    _controller = StreamController<String>();
    _sub = _controller.stream.listen(onData,        // onData 默认即可
      onError: print, onDone: () => print('完成'),
      cancelOnError: false);
    // 单订阅 Stream 也可直接来自 Future：
    Stream.fromFuture(Future.value('from future')).listen(print);
  }
  void onData(String data) => print(data);

  @override
  void dispose() {
    _sub?.cancel();          // 暂停 pause() / 恢复 resume() / 取消 cancel()
    _controller.close();     // 在 super.dispose 之前
    super.dispose();
  }

  @override
  Widget build(BuildContext context) => Column(children: [
    RaisedButton(onPressed: () => _controller.sink.add('hello ${DateTime.now()}'),
      child: Text('发送')),   // StreamSink 往 Stream 上添加数据
    StreamBuilder<String>(
      stream: _controller.stream,
      initialData: '默认的数据',
      builder: (context, snapshot) => Text('收到: ${snapshot.data}')),
  ]);
}
```

> **Broadcast**：需要多个订阅者用 Broadcast Streams / Subjects（RxDart），可以 add 多个数据。

---

## 28 RxDart（Observable 反应式编程）

一套加工处理流的方法/工具（Reactive Extensions），基于 Stream 开发、继承自 Stream，Stream 的方法在 Observable 上都可用。

**常用工厂**：`Observable.just('x')` 立刻发送一次 · `Observable.fromIterable([...])` 数组逐个发出 · `Observable.fromFuture(f)` · `Observable.periodic(Duration(seconds:3), (x)=>x.toString())` 间隔 3 秒重复发（x 为重复次数）。

```dart
final _subject = PublishSubject<String>();   // 类似特别的 StreamController

// 操作符：map 处理原始数据 / where 满足条件才通过
_subject.map((item) => 'item: $item')
        .where((item) => item.length > 9)
        .listen((data) => print(data));

// debounce 消抖：用户连续输入时不打印，停止输入 500ms 后才响应
// 最佳场景：搜索框频繁网络请求
_subject.debounce(Duration(milliseconds: 500))
        .listen((data) => print(data));

// 三种 Subject：
// PublishSubject   —— 把添加的数据都交给监听器
// BehaviorSubject  —— 把最后一次添加的数据交给新来的监听
// ReplaySubject    —— maxSize 限制最大接收数量（默认全部重放）
```

---

## 29 BLoC 模式与 ScopedModel

BloC（Business Logic Component）：把业务逻辑放到一个类里，通过 Sink 输入、Stream 输出；ScopedModel 从父辈把状态传给子组件，子组件只负责显示。

```dart
// ===== BLoC =====
class XBloc {
  final _x = StreamController<int>();
  StreamSink<int> get counter => _x.sink;        // 子组件输入（添加数据）
  Stream<int> get count => _x.stream;            // 子组件输出（获取数据）
  void dispose() => _x.close();
}
// 子组件中：xBloc.counter.add(1)；展示处用 StreamBuilder 包裹

// ===== ScopedModel（pubspec: scoped_model: ^0.3.0）=====
class XModel extends Model {
  int _count = 0;
  int get count => _count;
  void increaseCount() {
    _count++;
    notifyListeners();    // 通知数据改变，界面重建显示新数据
  }
}
// 最外层包裹：ScopedModel<XModel>(model: XModel(), child: App())
// 使用数据（按需重建；rebuildOnChange: false 则当前组件只执行方法不重建）：
ScopedModelDescendant<XModel>(
  builder: (context, _, model) => Text('${model.count}'));
```

> **InheritedWidget 也能做**：内部变量 final、构造带上变量、子类继承该类并提供 `of(BuildContext)`，在需要数据的组件外层包裹即可（`xBloc.counter.add(xxx)` 直接调用）。

---

## 30 http 网络请求与 JSON 序列化

**要点**：导入 `import 'package:http/http.dart' as http`（可用别名）；`json.encode(map)` map→json 发给后端；`json.decode(str)` 服务端返回→map；实体类提供 `fromJson`/`toJson`（encode 时默认调用 toJson）。

```dart
import 'dart:convert';
import 'package:http/http.dart' as http;

class PostData {
  final String title;
  final String des;
  PostData(this.title, this.des);

  // Map 的数据转换为数据实体
  PostData.fromJson(Map json)
      : title = json['title'], des = json['description'];

  // 数据实体转换为 Map，再由 json.encode 转成 json
  Map toJson() => {'title': title, 'des': des};
}

void demo() async {
  // GET
  final response = await http.get(Uri.parse('https://jsonplaceholder.typicode.com/posts/1'));
  print(response.statusCode);        // 200
  print(response.body);              // json 字符串
  final post = PostData.fromJson(json.decode(response.body));

  // POST：发送 json 到后端
  await http.post(Uri.parse('https://jsonplaceholder.typicode.com/posts'),
      body: json.encode(post));      // 默认调用了 toJson
}
```

---

## 31 动画

**要点**：

- `vsync` 传入 this（State 需 `with TickerProviderStateMixin`），防止屏幕外动画消耗资源
- `lowerBound/upperBound` 最小/最大值
- `forward 播放 / dispose 停止 / dismiss 消失`
- Tween `animate(controller)` 应用到 controller
- CurvedAnimation + `Curves.bounceOut` 动画曲线
- AnimatedWidget 动画值变化时自动重建自己

```dart
class _LogoAnimState extends State<LogoAnim> with TickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _size;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,                        // 传递 this（需 TickerProviderStateMixin）
      duration: Duration(milliseconds: 1000),
      lowerBound: 0, upperBound: 300)
      ..addListener(() => setState(() {}))   // 或者用 AnimatedWidget 自动重建
      ..addStatusListener((status) {
        if (status == AnimationStatus.completed) _controller.reverse(); // 往返播放
      });
    _size = Tween(begin: 50.0, end: 200.0)          // 两个值之间
        .animate(CurvedAnimation(parent: _controller, curve: Curves.bounceOut));
  }
  @override
  void dispose() { _controller.dispose(); super.dispose(); }

  @override
  Widget build(BuildContext context) => Center(
    child: IconButton(iconSize: _size.value, icon: Icon(Icons.favorite),
      onPressed: () => _controller.forward()));    // 播放动画
}

// AnimatedWidget 版本：动画值有变化就自动重建自己的小部件
class SizeAnim extends AnimatedWidget {
  SizeAnim(Animation<double> controller) : super(listenable: controller);
  @override
  Widget build(BuildContext context) {
    final anim = listenable as Animation<double>;
    return FlutterLogo(size: anim.value);
  }
}
```

---

## 32 国际化

**步骤**：安装 Intl 包 → 添加 `flutter_localizations: sdk: flutter` → Android Studio 装 Flutter i18n 插件（默认目录 res/values，生成 generated/i18n.dart；若无则关闭项目重新打开）→ iOS 还需配置 info.plist；日期格式化用 `DateFormat.YMMMMd().format(dt)`。

```dart
class App extends StatelessWidget {
  @override
  Widget build(BuildContext context) => MaterialApp(
    localizationsDelegates: const [
      S.delegate,                                    // 插件自动生成
      GlobalMaterialLocalizations.delegate,
      GlobalWidgetsLocalizations.delegate,
    ],
    supportedLocales: S.delegate.supportedLocales,
    // 可指定具体国际化资源：即使手机是英文，app 也认为是中文（默认可不指定）
    localeResolutionCallback: (locale, supported) => Locale('zh', ''),
    home: MyPage(),
  );
}

// 使用（strings_en.arb 为默认，strings_zh.arb 中文）：name = S.of(context).aa;
// ⚠ 不要直接在 MaterialApp 里用 S.of(context)，在二级或其他页面再使用，否则可能报空

// 手动获取当前语言和地区：
final locale = Localizations.localeOf(context).toString();  // => zh_CN
```

---

## 33 MethodChannel（调用原生 API）

通过命名通道直接调用原生 Android/iOS API。Android 侧：MainActivity 继承 FlutterActivity → `GeneratedPluginRegistrant.registerWith(this)` → `setMethodCallHandler` 处理调用。

```dart
static const channel = MethodChannel('android_log');   // const x = 'android_log' 通道名

void log() async {
  await channel.invokeMethod('logV', {'tag': 'FLUTTER', 'msg': 'hello native'});
}

// ===== Android（MainActivity.kt）=====
// class MainActivity : FlutterActivity() {
//   GeneratedPluginRegistrant.registerWith(this)
//   MethodChannel(flutterView, "android_log").setMethodCallHandler { call, result ->
//     when (call.method) {
//       "logV" -> {
//         val tag = call.argument<String>("tag")!!
//         val message = call.argument<String>("msg")!!
//         Log.v(tag, message)
//       }
//     }
//   }
// }
```

---

## 34 Sliver 滚动体系

Sliver 是"从一大块里切开的一小块可视口"，一般放在 CustomScrollView 里组合出复杂滚动效果（AppBar 滚动悬停、渐进隐藏等）。

**SliverAppBar**：`pinned`（固定顶部+阴影）· `floating`（下滑隐藏、上滑一点就显示，与 pinned 冲突）· `expandedHeight + FlexibleSpaceBar(background:)` 伸展高度的弹性空间；**SliverPadding**：Sliver 内不好加 padding 就用它；**SliverSafeArea**：为刘海屏/挖孔屏留出安全区域。

```dart
CustomScrollView(
  slivers: [
    SliverAppBar(
      pinned: true,                       // 滚到顶部才显示的固定 AppBar；true 时有阴影
      expandedHeight: 200,
      flexibleSpace: FlexibleSpaceBar(    // 弹性空间，可去掉上面 title
        title: Text('Sliver Demo'),
        background: Image.network('https://picsum.photos/600/300', fit: BoxFit.cover)),
    ),
    SliverPadding(padding: EdgeInsets.all(12),
      sliver: SliverSafeArea(              // 安全区：留出刘海/状态栏区域
        sliver: SliverList(
          delegate: SliverChildBuilderDelegate(
            (context, index) => ListTile(title: Text('条目 $index')),
            childCount: 30))),
    ),
    SliverGrid(                            // Sliver 网格
      delegate: SliverChildBuilderDelegate(
        (context, index) => Container(color: Colors.amber[100 * (index % 8 + 1)],
          child: Center(child: Text('Grid $index'))),
        childCount: 9),
      gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: 3, crossAxisSpacing: 8, mainAxisSpacing: 8)),
  ]);
```

**常用小件补充**：`Divider(height, indent 左缩进, color)` 浅灰分隔线 · `Card(child:, elevation:, shape:)` 卡片 · `ClipRRect(borderRadius: BorderRadius.only(topLeft:...))` 图片圆角 · `InkWell(onTap, splashColor, highlightColor)` 给任意组件添加溅墨点击效果（不显示时外层包 Ink/Material）。

---

> 整理自 FlutterNodeForPDF · 原笔记为思维导图，本文档按主题重构并补充完整案例 · 2026-11
