---
title: 05 · Flutter 高级项目!
description: Flutter 高级项目
date: 2026-11-6
year: 2026
moddifyDate: "2026-11-6 10:27:39"
---

# 05 · Flutter 高级项目（Channel 原生通信 + 混合开发 + 仿商城项目）

---

## 1. Flutter Channel 调用 Android 原生

**用法**：Flutter 无法直接调手机原生能力（打电话、蓝牙、读 SIM 卡信息）时，通过 `MethodChannel` 与原生代码通信。Dart 侧发消息，Android 侧（Kotlin/Java）接收并处理。

**架构**：Dart(客户端) —MethodChannel(通道名)→ Android(MethodCallHandler)

```dart
// 1) Dart 侧
import 'package:flutter/services.dart';

class NativeService {
  // 通道名必须与原生侧一致
  static const MethodChannel _channel = MethodChannel('com.itying.app/native');

  // 调原生方法：获取设备信息
  static Future<String> getDeviceInfo() async {
    try {
      var result = await _channel.invokeMethod('getDeviceInfo');
      return result ?? '';
    } on PlatformException catch (e) {
      return 'error: ${e.message}';
    }
  }

  // 带参数调用：打开原生页面
  static Future<void> openNativePage(String title) async {
    await _channel.invokeMethod('openPage', {'title': title});
  }
}
```

```kotlin
// 2) Android 侧（android/app/src/main/kotlin/.../MainActivity.kt）
import io.flutter.embedding.android.FlutterActivity
import io.flutter.embedding.engine.FlutterEngine
import io.flutter.plugin.common.MethodChannel

class MainActivity : FlutterActivity() {
    override fun configureFlutterEngine(flutterEngine: FlutterEngine) {
        super.configureFlutterEngine(flutterEngine)
        MethodChannel(flutterEngine.dartExecutor.binaryMessenger, "com.itying.app/native")
            .setMethodCallHandler { call, result ->
                when (call.method) {
                    "getDeviceInfo" -> {
                        val info = android.os.Build.MODEL + " / " + android.os.Build.VERSION.RELEASE
                        result.success(info)
                    }
                    "openPage" -> {
                        val title = call.argument<String>("title")
                        // TODO: 跳转原生 Activity
                        result.success(null)
                    }
                    else -> result.notImplemented()
                }
            }
    }
}
```

---

## 2. Flutter Channel 调用 iOS 原生

**用法**：原理同上，iOS 侧在 `AppDelegate.swift` 注册 handler。

```swift
// ios/Runner/AppDelegate.swift
import UIKit
import Flutter

@main
class AppDelegate: FlutterAppDelegate {
  override func application(
    _ application: UIApplication,
    didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?
  ) -> Bool {
    let controller = window?.rootViewController as! FlutterViewController
    let channel = FlutterMethodChannel(name: "com.itying.app/native", binaryMessenger: controller.binaryMessenger)

    channel.setMethodCallHandler { (call, result) in
      switch call.method {
      case "getDeviceInfo":
        result(UIDevice.current.model)
      case "openPage":
        let title = call.arguments as? String
        let vc = UIViewController()
        vc.view.backgroundColor = .white
        controller.present(vc, animated: true)
        result(nil)
      default:
        result(FlutterMethodNotImplemented)
      }
    }

    GeneratedPluginRegistrant.register(with: self)
    return super.application(application, didFinishLaunchingWithOptions: launchOptions)
  }
}
```

---

## 3. Flutter Android / iOS 混合开发（Add-to-App）

**用法**：把 Flutter 模块嵌入**已有的**原生 App（原生做壳，Flutter 做部分页面），或反过来。适合老项目逐步迁移。

```bash
# 1) 创建 flutter module
flutter create --template module my_flutter

# 2) Android 引入（settings.gradle）
include ':my_flutter'
project(':my_flutter').projectDir = new File('../my_flutter')

# 3) iOS 引入（Podfile）
flutter_application_path = '../my_flutter'
load File.join(flutter_application_path, '.ios', 'Flutter', 'podhelper.rb')
```

原生跳转 Flutter 页面：Android 用 `FlutterActivity`，iOS 用 `FlutterViewController`；共享数据可经 MethodChannel / 深链。

---

## 4. 仿商城项目：项目结构

**用法**：大型项目推荐分层结构，页面 / 组件 / 服务 / 模型分开，配合路由和状态管理。

```
lib/
├── main.dart                 # 入口，注册路由、全局配置
├── routes/                   # 路由表
├── pages/                    # 页面
│   ├── tabs/                 # 底部导航容器 + 首页/分类/购物车/我的
│   ├── goods/                # 商品列表、商品详情
│   ├── category/             # 分类
│   ├── cart/                 # 购物车
│   └── user/                 # 登录、注册、地址、订单
├── services/                 # 接口请求（dio 封装）
├── models/                   # Model 类 + fromJson
├── provider/                 # 状态管理（购物车、用户信息）
├── components/               # 公共组件（轮播、角标、按钮）
└── config/                   # 常量：baseUrl、主题色
```

---

## 5. 商城：首页轮播图（Swiper）

**用法**：依赖 `flutter_swiper_view`（或 `card_swiper`），常见于首页 Banner 与商品详情图。

```yaml
dependencies:
  flutter_swiper_view: ^1.1.6
```

```dart
import 'package:flutter_swiper_view/flutter_swiper_view.dart';

Swiper(
  itemCount: bannerList.length,
  autoplay: true,
  pagination: const SwiperPagination(
    alignment: Alignment.bottomCenter,
    builder: DotSwiperPaginationBuilder(activeColor: Colors.blue, size: 6),
  ),
  itemBuilder: (context, index) => Image.network(
    bannerList[index]['pic'],
    fit: BoxFit.fill,
  ),
  onTap: (index) => Navigator.pushNamed(context, '/goods',
      arguments: {'goodsId': bannerList[index]['goodsId']}),
)
```

---

## 6. 商城：分类页（左右联动列表）

**用法**：左侧一级分类（ListView），右侧二级分类（GridView），点击左侧切换右侧。

```dart
class CategoryPage extends StatefulWidget {
  const CategoryPage({super.key});

  @override
  State<CategoryPage> createState() => _CategoryPageState();
}

class _CategoryPageState extends State<CategoryPage> {
  List cateList = ['手机数码', '家用电器', '服装', '食品'];
  int selectedIndex = 0;

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        // 左侧一级分类（固定宽 100）
        SizedBox(
          width: 100,
          child: ListView.builder(
            itemCount: cateList.length,
            itemBuilder: (context, index) => InkWell(
              onTap: () => setState(() => selectedIndex = index),
              child: Container(
                height: 56,
                color: selectedIndex == index ? Colors.blue.shade50 : Colors.white,
                child: Center(child: Text(cateList[index])),
              ),
            ),
          ),
        ),
        // 右侧二级分类网格
        Expanded(
          child: GridView.builder(
            padding: const EdgeInsets.all(10),
            gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
              crossAxisCount: 3, crossAxisSpacing: 10, mainAxisSpacing: 10,
            ),
            itemCount: 12,     // 实际按 selectedIndex 请求对应分类商品
            itemBuilder: (context, index) => Column(
              children: [
                Image.network('https://picsum.photos/100', width: 70),
                Text('商品$index', style: const TextStyle(fontSize: 12)),
              ],
            ),
          ),
        ),
      ],
    );
  }
}
```

---

## 7. 商城：商品列表筛选（顶部筛选条 + 列表）

**用法**：综合 / 价格 / 销量 排序按钮，选中高亮；列表支持下拉刷新、分页（复用 02 章的刷新加载模式）。

```dart
Widget buildFilterBar() {
  final items = ['综合', '价格', '销量'];
  return Row(
    children: List.generate(3, (i) {
      final selected = sortIndex == i;
      return Expanded(
        child: TextButton(
          onPressed: () => setState(() {
            sortIndex = i;
            page = 1;
            list.clear();        // 重新请求第一页
          }),
          child: Text(
            items[i] + (i == 1 ? (sortAsc ? '↑' : '↓') : ''),
            style: TextStyle(color: selected ? Colors.blue : Colors.black54),
          ),
        ),
      );
    }),
  );
}
```

---

## 8. 商城：商品详情页（Hero 动画 + 加购）

**用法**：顶部大图轮播、价格区、详情富文本、底部操作栏（加入购物车 / 立即购买）。

```dart
class GoodsDetailPage extends StatelessWidget {
  final Map goods;
  const GoodsDetailPage({super.key, required this.goods});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text(goods['title'])),
      body: ListView(
        children: [
          // 顶部轮播（Swiper 同首页）
          AspectRatio(
            aspectRatio: 1,
            child: Image.network(goods['pic'], fit: BoxFit.cover),
          ),
          Padding(
            padding: const EdgeInsets.all(12),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(goods['title'], style: const TextStyle(fontSize: 16)),
                const SizedBox(height: 8),
                Text('¥${goods['price']}',
                    style: const TextStyle(color: Colors.red, fontSize: 22, fontWeight: FontWeight.bold)),
              ],
            ),
          ),
          // 详情长图 / html 富文本
          Image.network(goods['detailPic'], fit: BoxFit.width),
        ],
      ),
      bottomNavigationBar: Container(
        height: 56,
        child: Row(
          children: [
            Expanded(child: ElevatedButton(
              style: ElevatedButton.styleFrom(shape: const StadiumBorder(), backgroundColor: Colors.orange),
              onPressed: () => cartProvider.add(goods),      // 加入购物车（provider 更新角标）
              child: const Text('加入购物车'),
            )),
            Expanded(child: ElevatedButton(
              style: ElevatedButton.styleFrom(shape: const StadiumBorder(), backgroundColor: Colors.red),
              onPressed: () => Navigator.pushNamed(context, '/order'),   // 立即购买
              child: const Text('立即购买'),
            )),
          ],
        ),
      ),
    );
  }
}
```

---

## 9. 商城：购物车（provider 状态管理 + 全选/反选/删除）

**用法**：购物车是典型的跨页面共享状态（列表页加购、购物车页结算、角标数量）。用 provider + ChangeNotifier 实现。

```dart
// 1) 状态类
class CartProvider extends ChangeNotifier {
  List<Map> items = [];               // 每项: {goods, count, checked}

  void add(Map goods) {
    // 已存在则数量+1
    var i = items.indexWhere((e) => e['goods']['_id'] == goods['_id']);
    if (i > -1) {
      items[i]['count']++;
    } else {
      items.add({...goods, 'count': 1, 'checked': true});
    }
    notifyListeners();                // 通知所有监听的页面刷新
  }

  void toggleAll(bool v) {
    for (var e in items) { e['checked'] = v; }
    notifyListeners();
  }

  void remove(String id) {
    items.removeWhere((e) => e['goods']['_id'] == id);
    notifyListeners();
  }

  double get totalPrice => items
      .where((e) => e['checked'])
      .fold(0, (p, e) => p + e['goods']['price'] * e['count']);
}

// 2) 注册全局
ChangeNotifierProvider(create: (_) => CartProvider(), child: const App())

// 3) 页面监听
Consumer<CartProvider>(
  builder: (context, cart, child) => Column(
    children: [
      Expanded(child: ListView(children: cart.items.map(_buildItem).toList())),
      Row(children: [
        Checkbox(value: allChecked, onChanged: (v) => cart.toggleAll(v!)),
        const Text('全选'),
        const Spacer(),
        Text('合计: ¥${cart.totalPrice.toStringAsFixed(2)}'),
        ElevatedButton(onPressed: () {}, child: const Text('去结算')),
      ]),
    ],
  ),
)
```

---

## 10. 商城：用户中心（登录注册 / 验证码倒计时 / 收货地址）

**用法**：登录拿到 token 存本地（shared_preferences），后续请求带头；验证码按钮 60 秒倒计时。

```dart
// 登录
Future<void> login() async {
  var res = await dio.post('/api/login', data: {'phone': phone, 'password': pwd});
  var token = res.data['token'];
  // 本地持久化
  final sp = await SharedPreferences.getInstance();
  await sp.setString('token', token);
  await sp.setString('userinfo', jsonEncode(res.data['userinfo']));
  Navigator.pushReplacementNamed(context, '/home');
}

// 验证码倒计时
Timer? _timer;
int countdown = 0;

void sendCode() {
  if (countdown > 0) return;
  dio.post('/api/sendCode', data: {'phone': phone});
  _timer = Timer.periodic(const Duration(seconds: 1), (t) {
    setState(() {
      countdown++;
      if (countdown >= 60) { countdown = 0; t.cancel(); }
    });
  });
}

// 按钮
ElevatedButton(
  onPressed: countdown > 0 ? null : sendCode,
  child: Text(countdown > 0 ? '${countdown}s后重发' : '获取验证码'),
)

// 收货地址：增删改查页面复用（列表 + 新增表单 + 编辑 + 删除确认Dialog）
```

---

## 11. 商城：订单与支付入口

**用法**：确认订单页（地址 + 商品清单 + 优惠）→ 创建订单 → 调支付（支付宝/微信，见第 07 章）→ 回调更新订单状态。

```dart
Future<void> submitOrder() async {
  var res = await dio.post('/api/order/create', data: {
    'goods': cart.items.map((e) => {'_id': e['goods']['_id'], 'count': e['count']}).toList(),
    'addressId': addressId,
  });
  final payInfo = res.data['payInfo'];        // 后端返回支付宝/微信所需签名参数
  await AlipayService.pay(payInfo);           // 唤起支付（见 07 章）
}
```
