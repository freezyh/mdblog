---
title: 03 · Flutter 路由
description: Flutter 路由
date: 2026-11-6
year: 2026
moddifyDate: "2026-11-6 10:27:05"
---

# 03 · Flutter 路由（普通路由 / 命名路由 / 传参 / 替换）

---

## 1. 普通路由（页面跳转 push / 返回 pop）

**用法**：`Navigator.push` + `MaterialPageRoute` 打开新页面；`Navigator.pop` 返回。适合页面少、结构简单的场景。

```dart
class PageA extends StatelessWidget {
  const PageA({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('页面A')),
      body: Center(
        child: ElevatedButton(
          onPressed: () {
            Navigator.push(
              context,
              MaterialPageRoute(builder: (context) => const PageB()),
            );
          },
          child: const Text('跳转到页面B'),
        ),
      ),
    );
  }
}

class PageB extends StatelessWidget {
  const PageB({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('页面B')),
      body: Center(
        child: ElevatedButton(
          onPressed: () => Navigator.pop(context),   // 返回上一页
          child: const Text('返回'),
        ),
      ),
    );
  }
}
```

---

## 2. 路由传参（构造函数传参）

**用法**：目标页定义必填字段，push 时直接传值。这是 Flutter 最常用、类型最安全的传参方式。

```dart
class GoodsPage extends StatelessWidget {
  final String goodsId;
  final String title;

  const GoodsPage({super.key, required this.goodsId, this.title = '商品详情'});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text(title)),
      body: Center(child: Text('商品ID: $goodsId')),
    );
  }
}

// 跳转并传参
Navigator.push(
  context,
  MaterialPageRoute(
    builder: (context) => GoodsPage(goodsId: '1001', title: 'iPhone 15'),
  ),
);
```

---

## 3. 路由返回值（A → B 选择后带回数据）

**用法**：`push` 返回 Future，B 页面 `pop(result)` 把结果传回；或 `then` 链式接收。

```dart
// 页面A：等结果
onPressed: () async {
  var result = await Navigator.push(
    context,
    MaterialPageRoute(builder: (_) => const CityPickerPage()),
  );
  if (result != null) print('选中的城市: $result');
},

// 页面B：返回结果
onPressed: () => Navigator.pop(context, '深圳'),
```

---

## 4. 命名路由（routes）

**用法**：在 `MaterialApp.routes` 里注册字符串路径，`pushNamed` 跳转。适合页面多、统一管理的项目；`initialRoute` 设置启动页。

```dart
void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      initialRoute: '/',                          // 启动页
      routes: {
        '/': (context) => const HomePage(),
        '/login': (context) => const LoginPage(),
        '/register': (context) => const RegisterPage(),
        // '/goods': (context) => GoodsPage(...),  // 需要传参的页面不放这里
      },
      // 路由表里没有的路径会走这里
      onUnknownRoute: (settings) => MaterialPageRoute(
        builder: (context) => const NotFoundPage(),
      ),
    );
  }
}

// 跳转
Navigator.pushNamed(context, '/login');
```

---

## 5. 命名路由传参（onGenerateRoute / arguments）

**用法**：`pushNamed` 时带 `arguments`，目标页从 `ModalRoute` 或 `settings.arguments` 取出。适合需要登录后才知道参数的动态页面。

```dart
class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      routes: const {},
      // 动态路由：所有未注册路径统一在 onGenerateRoute 处理
      onGenerateRoute: (settings) {
        if (settings.name == '/goods') {
          final args = settings.arguments as Map<String, dynamic>;   // 接收参数
          return MaterialPageRoute(
            builder: (context) => GoodsPage(
              goodsId: args['goodsId'],
              title: args['title'] ?? '商品详情',
            ),
          );
        }
        return null;    // 返回 null 则走 onUnknownRoute
      },
    );
  }
}

// 跳转 + 传参
Navigator.pushNamed(
  context,
  '/goods',
  arguments: {'goodsId': '1001', 'title': 'iPhone 15'},
);

// 目标页另一种取参方式（build 里直接取）
final args = ModalRoute.of(context)!.settings.arguments as Map<String, dynamic>;
```

---

## 6. 替换路由（pushReplacement）与清空路由栈

**用法**：

- `pushReplacementNamed`：替换当前页（登录成功后进首页，用户按返回不应回到登录页）。
- `pushNamedAndRemoveUntil`：清空栈再跳（登出后回登录页）。

```dart
// 登录成功 → 替换为首页（返回键回不到登录页）
Navigator.pushReplacementNamed(context, '/home');

// 登出 → 清空所有页面，回到登录页
Navigator.pushNamedAndRemoveUntil(context, '/login', (route) => false);

// 也可以用普通路由的写法
Navigator.of(context).pushReplacement(
  MaterialPageRoute(builder: (_) => const HomePage()),
);
```

---

## 7. 返回指定页面 / 返回到根路由

**用法**：多级跳转后想一步回到首页，用 `popUntil`。

```dart
// popUntil + ModalRoute.withName：连续返回直到某个命名路由
Navigator.popUntil(context, ModalRoute.withName('/'));

// 也可以自己写条件
Navigator.popUntil(context, (route) => route.isFirst);   // 回到栈底
```

---

## 8. 完整示例：登录流程（传参 + 替换 + 返回值综合）

```dart
// main.dart
class App extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      initialRoute: '/login',
      routes: {'/login': (c) => const LoginPage(), '/home': (c) => const HomePage()},
    );
  }
}

// login_page.dart
class LoginPage extends StatelessWidget {
  const LoginPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: ElevatedButton(
          onPressed: () {
            doLogin('user', 'pass').then((token) {
              if (token.isNotEmpty) {
                Navigator.pushReplacementNamed(context, '/home');   // 替换路由
              }
            });
          },
          child: const Text('登录'),
        ),
      ),
    );
  }
}
```

---

## 路由速查表

| 场景         | API                                               |
| ------------ | ------------------------------------------------- |
| 普通跳转     | `Navigator.push(context, MaterialPageRoute(...))` |
| 返回         | `Navigator.pop(context)` / `pop(result)`          |
| 命名跳转     | `Navigator.pushNamed(context, '/xxx')`            |
| 带参跳转     | `pushNamed(context, '/xxx', arguments: {...})`    |
| 登录后进首页 | `pushReplacementNamed`                            |
| 登出清栈     | `pushNamedAndRemoveUntil('/login', (r) => false)` |
| 回到首页     | `popUntil(ModalRoute.withName('/'))`              |
| 未注册路由   | `onGenerateRoute` / `onUnknownRoute`              |
