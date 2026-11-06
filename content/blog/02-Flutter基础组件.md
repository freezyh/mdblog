---
title: 02 · Flutter 基础（环境 + 组件）
description: Flutter 基础（环境 + 组件）
date: 2026-11-6
year: 2026
moddifyDate: 2026-11-6 14:30:32
---

# 02 · Flutter 基础（环境 + 组件）

---

## 1. Flutter Android / iOS 环境搭建

**用法**：安装 Flutter SDK → 配置环境变量 → 安装 Android Studio / Xcode → 用 `flutter doctor` 检查缺什么。

```bash
# 1) 下载 SDK 解压到 D:\flutter，把 D:\flutter\bin 加入 PATH
# 2) 国内镜像（Windows 加环境变量）
#    PUB_HOSTED_URL=https://pub.flutter-io.cn
#    FLUTTER_STORAGE_BASE_URL=https://storage.flutter-io.cn
# 3) 检查
flutter doctor          # 列出所有环境问题
flutter doctor --android-licenses   # 同意安卓协议
```

iOS 端额外需要：Mac + Xcode + CocoaPods（`sudo gem install cocoapods`）。

---

## 2. Flutter CLI 常用命令

```bash
flutter create my_app          # 创建项目
cd my_app
flutter devices                # 查看可用设备
flutter run                    # 运行（r 热重载 / R 热重启）
flutter run -d chrome          # 跑在 Chrome
flutter clean                  # 清理构建产物
flutter pub get                # 拉取依赖
flutter pub add dio             # 添加依赖（等同手动改 pubspec.yaml）
flutter build apk              # 打 Android 包
flutter analyze                # 代码检查
```

**pubspec.yaml 添加依赖示例**：

```yaml
dependencies:
  flutter:
    sdk: flutter
  dio: ^5.4.0                  # 网络
  shared_preferences: ^2.2.0   # 本地存储
```

---

## 3. StatelessWidget 与 StatefulWidget

**用法**：

- **无状态**：页面静态展示、不变的数据（如商品详情的文字部分）。
- **有状态**：数据会变（计数器、输入框、倒计时），`setState()` 触发界面刷新。

```dart
// 1) 无状态组件
class HelloPage extends StatelessWidget {
  const HelloPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(app: AppBar(), body: const Center(child: Text('我是无状态组件')));
  }
}

// 2) 有状态组件：计数器
class CounterPage extends StatefulWidget {
  const CounterPage({super.key});

  @override
  State<CounterPage> createState() => _CounterPageState();
}

class _CounterPageState extends State<CounterPage> {
  int count = 0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(child: Text('点击了 $count 次')),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          setState(() {        // 必须用 setState 修改数据，UI 才会刷新
            count++;
          });
        },
        child: const Icon(Icons.add),
      ),
    );
  }
}
```

> 注意：Stateful 组件生命周期常用 `initState()`（初始化、发请求）、`dispose()`（销毁定时器/控制器）。

---

## 4. MaterialApp / Scaffold / Container / Text / Image

**用法**：`MaterialApp` 是 App 根组件（路由、主题）；`Scaffold` 是页面骨架（AppBar/body/底部导航）；`Container` 万能容器；`Text` 文本；`Image` 图片。

```dart
void main() => runApp(const MyApp());   // runApp 挂载根组件

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(primarySwatch: Colors.blue),
      home: const HomePage(),
    );
  }
}

class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('基础组件')),
      body: Center(
        child: Container(
          alignment: Alignment.center,
          width: 200,
          height: 100,
          margin: const EdgeInsets.all(10),      // 外边距
          padding: const EdgeInsets.all(8),      // 内边距
          decoration: BoxDecoration(
            color: Colors.blue.shade50,
            borderRadius: BorderRadius.circular(12),  // 圆角
            border: Border.all(color: Colors.blue),
          ),
          child: const Text(
            'Hello Flutter',
            style: TextStyle(fontSize: 20, color: Colors.blue, fontWeight: FontWeight.bold),
            maxLines: 1,
            overflow: TextOverflow.ellipsis,      // 超出省略号
          ),
        ),
      ),
    );
  }
}
```

**Image 三种来源**：

```dart
Image.network('https://picsum.photos/200',            // 网络图
  width: 100, height: 100, fit: BoxFit.cover),        // fit: cover/contain/fill
Image.asset('images/logo.png'),                        // 本地资源（需在 pubspec.yaml 注册）
CircleAvatar(radius: 30, backgroundImage: NetworkImage(url)),  // 圆形头像
```

---

## 5. Padding / Row / Column / Expanded（Flex 布局）

**用法**：`Row` 水平排列、`Column` 垂直排列；`mainAxisAlignment` 主轴对齐、`crossAxisAlignment` 交叉轴；`Expanded` 按权重占剩余空间。

```dart
class LayoutDemo extends StatelessWidget {
  const LayoutDemo({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        // Row：两端对齐
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: const [Text('左侧'), Text('右侧')],
        ),
        const SizedBox(height: 10),

        // Expanded：左 1 份、右 2 份
        Row(
          children: [
            Expanded(child: Container(height: 40, color: Colors.red)),
            Expanded(flex: 2, child: Container(height: 40, color: Colors.green)),
          ],
        ),
        const SizedBox(height: 10),

        // Padding 单独控制某个方向边距
        Padding(
          padding: const EdgeInsets.only(left: 16, top: 8),
          child: Text('只有左边距'),
        ),

        // 固定宽高占位
        const SizedBox(width: 10, height: 20),
      ],
    );
  }
}
```

---

## 6. Stack / Align / Positioned（层叠定位）

**用法**：`Stack` 层叠（如图片上盖文字/角标）；子组件用 `Positioned` 绝对定位，`Align` 对齐。

```dart
class StackDemo extends StatelessWidget {
  const StackDemo({super.key});

  @override
  Widget build(BuildContext context) {
    return Stack(
      clipBehavior: Clip.none,          // 超出部分不裁剪
      children: [
        Container(width: 300, height: 150, color: Colors.grey.shade300),

        // 右上角角标（电商"热卖"标签）
        Positioned(
          right: -6,
          top: -6,
          child: Container(
            padding: const EdgeInsets.all(4),
            decoration: const BoxDecoration(color: Colors.red, shape: BoxShape.circle),
            child: const Text('热', style: TextStyle(color: Colors.white, fontSize: 12)),
          ),
        ),

        // 底部渐变文字条
        Positioned(
          left: 0,
          right: 0,
          bottom: 0,
          child: Container(
            color: Colors.black38,
            padding: const EdgeInsets.all(8),
            child: const Text('商品标题文字', style: TextStyle(color: Colors.white)),
          ),
        ),
      ],
    );
  }
}
```

---

## 7. AspectRatio / Card / Wrap（流式布局）

**用法**：`AspectRatio` 固定宽高比（视频区、商品图）；`Card` 带阴影圆角卡片；`Wrap` 自动换行（标签流式布局）。

```dart
class FlowDemo extends StatelessWidget {
  const FlowDemo({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        // 16:9 视频封面区
        AspectRatio(
          aspectRatio: 16 / 9,
          child: Image.network('https://picsum.photos/640/360', fit: BoxFit.cover),
        ),
        const SizedBox(height: 10),

        // 卡片
        Card(
          elevation: 4,
          margin: const EdgeInsets.all(10),
          child: const ListTile(
            leading: Icon(Icons.album, color: Colors.blue, size: 40),
            title: Text('这是一个卡片'),
            subtitle: Text('Card = 容器 + 圆角 + 阴影'),
          ),
        ),
        const SizedBox(height: 10),

        // Wrap：标签自动换行
        Wrap(
          spacing: 8,          // 水平间距
          runSpacing: 8,       // 行间距
          children: ['数码', '家电', '服饰', '美妆', '食品', '母婴']
              .map((e) => Chip(
                    label: Text(e),
                    backgroundColor: Colors.blue.shade50,
                  ))
              .toList(),
        ),
      ],
    );
  }
}
```

---

## 8. ListView（列表 + ListTile + 动态列表）

**用法**：少量数据用普通 `ListView(children:[])`；数据量大用 `ListView.builder`（按需渲染，性能好）；需要分割线用 `ListView.separated`。

```dart
class ListDemo extends StatelessWidget {
  const ListDemo({super.key});

  @override
  Widget build(BuildContext context) {
    // 1) 基础列表
    // ListView(children: [ListTile(title: Text('item1')), ...])

    // 2) 动态列表：接口返回的数组渲染
    final goods = [
      {'title': 'iPhone 15', 'price': 5999},
      {'title': '华为 Mate60', 'price': 4999},
      {'title': '小米 14', 'price': 3999},
    ];

    return ListView.separated(
      itemCount: goods.length,
      separatorBuilder: (_, __) => const Divider(height: 1),   // 分割线
      itemBuilder: (context, index) {
        var item = goods[index];
        return ListTile(
          leading: const Icon(Icons.phone_iphone, size: 36, color: Colors.blue),
          title: Text(item['title']!),
          subtitle: Text('¥${item['price']}'),
          trailing: const Icon(Icons.chevron_right),
          onTap: () {
            // 跳转商品详情
            print('点击了 ${item['title']}');
          },
        );
      },
    );
  }
}
```

---

## 9. GridView（网格列表）

**用法**：`GridView.count` 指定列数；`GridView.builder` 长列表；`childAspectRatio` 控制单元格宽高比。

```dart
class GridDemo extends StatelessWidget {
  const GridDemo({super.key});

  @override
  Widget build(BuildContext context) {
    final icons = [
      Icons.home, Icons.search, Icons.shopping_cart, Icons.person,
      Icons.message, Icons.settings, Icons.camera, Icons.map,
    ];

    return GridView.builder(
      padding: const EdgeInsets.all(10),
      gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: 4,          // 每行 4 个
        mainAxisSpacing: 10,        // 纵向间距
        crossAxisSpacing: 10,       // 横向间距
        childAspectRatio: 1,        // 宽高比
      ),
      itemCount: icons.length,
      itemBuilder: (context, index) {
        return Container(
          color: Colors.blue.shade50,
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Icon(icons[index], color: Colors.blue, size: 32),
              const SizedBox(height: 6),
              Text('功能$index', style: const TextStyle(fontSize: 12)),
            ],
          ),
        );
      },
    );
  }
}
```

---

## 10. BottomNavigationBar 底部 Tab 切换页面

**用法**：`Scaffold.bottomNavigationBar` + `PageView`/索引切换 body。类型：`fixed`（固定）、`shifting`（动画）。

```dart
class TabPage extends StatefulWidget {
  const TabPage({super.key});

  @override
  State<TabPage> createState() => _TabPageState();
}

class _TabPageState extends State<TabPage> {
  int currentIndex = 0;
  final pages = const [HomeTab(), CategoryTab(), CartTab(), UserTab()]; // 4 个页面 Widget

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('商城')),
      body: pages[currentIndex],              // 按索引切换
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: currentIndex,
        type: BottomNavigationBarType.fixed,   // 超过 3 个 tab 必须加
        fixedColor: Colors.blue,               // 选中颜色
        onTap: (index) => setState(() => currentIndex = index),
        items: const [
          BottomNavigationBarItem(icon: Icon(Icons.home), label: '首页'),
          BottomNavigationBarItem(icon: Icon(Icons.category), label: '分类'),
          BottomNavigationBarItem(icon: Icon(Icons.shopping_cart), label: '购物车'),
          BottomNavigationBarItem(icon: Icon(Icons.person), label: '我的'),
        ],
      ),
    );
  }
}
```

---

## 11. AppBar 通用参数

**用法**：标题、左侧按钮、右侧按钮组、背景色、加 Tab。

```dart
AppBar(
  title: const Text('首页'),
  centerTitle: true,                          // 标题居中（iOS 风格）
  backgroundColor: Colors.blue,
  leading: IconButton(                        // 左侧：搜索
    icon: const Icon(Icons.search),
    onPressed: () {},
  ),
  actions: [                                  // 右侧按钮组
    IconButton(icon: const Icon(Icons.message), onPressed: () {}),
    IconButton(icon: const Icon(Icons.more_horiz), onPressed: () {}),
  ],
  elevation: 1,                               // 阴影
)
```

---

## 12. TabController 顶部导航（TabBar + TabBarView）

**用法**：顶部标签 + 左右滑动页面联动。需要 `SingleTickerProviderStateMixin` + `TabController`。

```dart
class TabBarDemo extends StatefulWidget {
  const TabBarDemo({super.key});

  @override
  State<TabBarDemo> createState() => _TabBarDemoState();
}

class _TabBarDemoState extends State<TabBarDemo>
    with SingleTickerProviderStateMixin {
  late TabController _tabController;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 3, vsync: this);   // length 与 Tab 数一致
    _tabController.addListener(() {
      if (_tabController.indexIsChanging) print('切到第 ${_tabController.index} 个');
    });
  }

  @override
  void dispose() {
    _tabController.dispose();       // 释放
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('订单'),
        bottom: TabBar(
          controller: _tabController,
          tabs: const [Tab(text: '全部'), Tab(text: '待付款'), Tab(text: '已完成')],
        ),
      ),
      body: TabBarView(
        controller: _tabController,
        children: const [OrderListPage('全部'), OrderListPage('待付款'), OrderListPage('已完成')],
      ),
    );
  }
}
```

---

## 13. Drawer 侧边栏

**用法**：`Scaffold.drawer`（左侧）、`endDrawer`（右侧）；`UserAccountsDrawerHeader` 快速做用户头部。

```dart
Scaffold(
  appBar: AppBar(title: const Text('首页')),
  drawer: Drawer(
    child: Column(
      children: [
        const UserAccountsDrawerHeader(
          accountName: Text('张三'),
          accountEmail: Text('zhangsan@example.com'),
          currentAccountPicture: CircleAvatar(
            backgroundImage: NetworkImage('https://picsum.photos/80'),
          ),
          decoration: BoxDecoration(color: Colors.blue),
        ),
        ListTile(
          leading: const Icon(Icons.favorite),
          title: const Text('我的收藏'),
          onTap: () => Navigator.pop(context),     // 关闭抽屉
        ),
        ListTile(leading: const Icon(Icons.settings), title: const Text('设置')),
      ],
    ),
  ),
  body: const Center(child: Text('左滑或点左上角菜单打开抽屉')),
)
```

---

## 14. FloatingActionButton 实现不规则底部导航（凸起按钮）

**用法**：把 `Scaffold` 的 `bottomNavigationBar` 改成容器包 Stack，中间叠一个浮动按钮，实现中间凸起"发单"按钮的效果。

```dart
class BottomBarWithFAB extends StatelessWidget {
  const BottomBarWithFAB({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: const Center(child: Text('内容区')),
      floatingActionButton: Container(
        margin: const EdgeInsets.only(top: 40),           // 让按钮凸出
        height: 60,
        width: 60,
        child: FloatingActionButton(
          backgroundColor: Colors.blue,
          child: const Icon(Icons.add),
          onPressed: () {},
        ),
      ),
      floatingActionButtonLocation: FloatingActionButtonLocation.centerDocked,  // 中间底部
      bottomNavigationBar: BottomAppBar(
        shape: const CircularNotchedRectangle(),          // 底栏挖出圆弧
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceAround,
          children: [
            IconButton(icon: const Icon(Icons.home), onPressed: () {}),
            const SizedBox(),                              // 中间占位
            IconButton(icon: const Icon(Icons.person), onPressed: () {}),
          ],
        ),
      ),
    );
  }
}
```

---

## 15. 按钮组件

**用法**：Material 3 常用按钮：`ElevatedButton`(实心)、`TextButton`(文字)、`OutlinedButton`(边框)、`IconButton`、`InkWell`(任意组件加点击事件)。

```dart
Column(
  children: [
    ElevatedButton(
      onPressed: () {},
      style: ElevatedButton.styleFrom(
        backgroundColor: Colors.blue,
        foregroundColor: Colors.white,
        minimumSize: const Size(200, 44),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
      ),
      child: const Text('提交订单'),
    ),
    TextButton(onPressed: () {}, child: const Text('忘记密码?')),
    OutlinedButton(onPressed: () {}, child: const Text('取消')),
    IconButton(icon: const Icon(Icons.favorite, color: Colors.red), onPressed: () {}),
    // 任意 Widget 加点击：图片、卡片等
    InkWell(
      onTap: () {},
      child: Container(padding: const EdgeInsets.all(12), child: const Text('整块可点击')),
    ),
  ],
)
```

---

## 16. Dialog 对话框（AlertDialog / SimpleDialog / BottomSheet）

**用法**：`showDialog` 弹 AlertDialog（确认）、`showModalBottomSheet` 弹底部菜单、`SimpleDialog` 选择列表。

```dart
// 1) AlertDialog：删除确认（典型场景）
Future<void> showDeleteDialog(BuildContext context) {
  return showDialog(
    context: context,
    builder: (context) => AlertDialog(
      title: const Text('提示'),
      content: const Text('确定要删除这条收货地址吗？'),
      actions: [
        TextButton(onPressed: () => Navigator.pop(context, false), child: const Text('取消')),
        TextButton(onPressed: () => Navigator.pop(context, true), child: const Text('删除')),
      ],
    ),
  );
}

// 调用方拿到结果
final ok = await showDeleteDialog(context);
if (ok == true) deleteAddress();

// 2) showModalBottomSheet：底部分享面板
showModalBottomSheet(
  context: context,
  builder: (context) => SizedBox(
    height: 180,
    child: Row(
      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
      children: const [
        Column(children: [Icon(Icons.wechat), Text('微信')]),
        Column(children: [Icon(Icons.people), Text('朋友圈')]),
        Column(children: [Icon(Icons.link), Text('复制链接')]),
      ],
    ),
  ),
);

// 3) SimpleDialog
showDialog(
  context: context,
  builder: (context) => SimpleDialog(
    title: const Text('选择排序方式'),
    children: ['价格从低到高', '销量最高']
        .map((e) => SimpleDialogOption(
              onPressed: () => Navigator.pop(context, e),
              child: Text(e),
            ))
        .toList(),
  ),
);
```

---

## 17. DatePicker 日期选择

**用法**：`showDatePicker` 返回 `Future<DateTime?>`；时间用 `showTimePicker`。

```dart
DateTime? selectedDate = DateTime.now();

Future<void> pickDate(BuildContext context) async {
  var result = await showDatePicker(
    context: context,
    initialDate: selectedDate,
    firstDate: DateTime(2020),
    lastDate: DateTime(2030),
  );
  if (result != null) {
    var time = await showTimePicker(
      context: context,
      initialTime: TimeOfDay.now(),
    );
    print('选择日期: $result ${time?.format(context)}');
  }
}
```

---

## 18. Chip / Tooltip

**用法**：`ChoiceChip` 单选筛选、`ActionChip` 可点击标签；`Tooltip` 长按提示。

```dart
int? selected;

Wrap(
  children: ['全部', '待付款', '已完成'].map((e) {
    final i = ['全部', '待付款', '已完成'].indexOf(e);
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 4),
      child: ChoiceChip(
        label: Text(e),
        selected: selected == i,
        onSelected: (v) => setState(() => selected = i),
      ),
    );
  }).toList(),
)

Tooltip(message: '复制链接', child: IconButton(icon: const Icon(Icons.link), onPressed: () {}))
```

---

## 19. 下拉刷新 + 上拉加载更多

**用法**：下拉刷新用 `RefreshIndicator`；上拉加载用 `ScrollController` 监听滚到底部，追加数据。

```dart
class NewsListPage extends StatefulWidget {
  const NewsListPage({super.key});

  @override
  State<NewsListPage> createState() => _NewsListPageState();
}

class _NewsListPageState extends State<NewsListPage> {
  List list = [];
  bool hasMore = true;
  late ScrollController _controller;

  @override
  void initState() {
    super.initState();
    _controller = ScrollController();
    getData();

    _controller.addListener(() {
      // 滚动到底部 → 加载下一页
      if (_controller.position.pixels >= _controller.position.maxScrollExtent - 20) {
        getData();
      }
    });
  }

  Future<void> getData() async {
    await Future.delayed(const Duration(milliseconds: 500));   // 模拟请求第 page 页
    setState(() {
      list.addAll(List.generate(10, (i) => '新闻 ${list.length + i + 1}'));
      hasMore = list.length < 30;
    });
  }

  @override
  Widget build(BuildContext context) {
    return RefreshIndicator(
      onRefresh: getData,                     // 下拉刷新
      child: ListView.builder(
        controller: _controller,
        itemCount: list.length + 1,           // 多一项"加载中"
        itemBuilder: (context, index) {
          if (index == list.length) {
            return Padding(
              padding: const EdgeInsets.all(16),
              child: Center(
                child: hasMore
                    ? const SizedBox(width: 24, height: 24, child: CircularProgressIndicator())
                    : const Text('没有更多数据了'),
              ),
            );
          }
          return ListTile(title: Text('${list[index]}'));
        },
      ),
    );
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }
}
```
