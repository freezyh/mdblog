---
title: Flutter 状态管理对比笔记
description: Flutter 状态管理对比笔记
date: 2026-11-12
year: 2026
moddifyDate: 2026-11-12 14:28:13
---

# Flutter 状态管理对比笔记

> 项目：demoflutter —— 同一个"计数器"用 4 种主流状态管理方案各实现一遍，方便横向对比。
>
> 涉及依赖（pubspec.yaml）：
>
> - `provider: ^6.1.5+1`
> - `flutter_riverpod: ^2.5.1`
> - `flutter_bloc: ^8.1.6`
> - `get: ^4.6.6`

## 项目结构

```text
lib/
├── main.dart                         # 入口，包 ProviderScope + GetMaterialApp
├── app.dart                          # 底部导航壳
├── provider_demo/
│   ├── counter_model.dart
│   └── provider_counter_page.dart
├── riverpod_demo/
│   ├── counter_provider.dart
│   └── riverpod_counter_page.dart
├── bloc_demo/
│   ├── counter_event.dart
│   ├── counter_bloc.dart
│   └── bloc_counter_page.dart
└── getx_demo/
    ├── counter_controller.dart
    └── getx_counter_page.dart
```

---

## 1. 入口与导航壳

### lib/main.dart

```dart
// lib/main.dart
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:get/get.dart';

import 'app.dart';

void main() {
  runApp(
    // ProviderScope：Riverpod 必需
    ProviderScope(
      // GetMaterialApp：GetX 路由/DI 必需（同时兼容普通 Material 用法）
      child: GetMaterialApp(
        title: '状态管理对比',
        debugShowCheckedModeBanner: false,
        home: const AppShell(),
      ),
    ),
  );
}
```

要点：

- `ProviderScope` 放在 `runApp` 最外层，是 Riverpod 所有 Provider 的"容器"。
- `GetMaterialApp` 替代 `MaterialApp`，为 GetX 提供路由/依赖注入能力。

### lib/app.dart

```dart
// lib/app.dart
import 'package:flutter/material.dart';
import 'provider_demo/provider_counter_page.dart';
import 'riverpod_demo/riverpod_counter_page.dart';
import 'bloc_demo/bloc_counter_page.dart';
import 'getx_demo/getx_counter_page.dart';

class AppShell extends StatefulWidget {
  const AppShell({super.key});

  @override
  State<AppShell> createState() => _AppShellState();
}

class _AppShellState extends State<AppShell> {
  int _index = 0;

  // 四个页面实例（保持状态，切 Tab 不重建）
  final List<Widget> _pages = [
    ProviderCounterPage(),
    RiverpodCounterPage(),
    BlocCounterPage(),
    GetxCounterPage(),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      // IndexedStack 保留各页面状态，方便对比
      body: IndexedStack(index: _index, children: _pages),
      bottomNavigationBar: NavigationBar(
        selectedIndex: _index,
        onDestinationSelected: (i) => setState(() => _index = i),
        destinations: const [
          NavigationDestination(icon: Icon(Icons.wb_sunny), label: 'Provider'),
          NavigationDestination(
            icon: Icon(Icons.water_drop),
            label: 'Riverpod',
          ),
          NavigationDestination(icon: Icon(Icons.account_tree), label: 'Bloc'),
          NavigationDestination(icon: Icon(Icons.bolt), label: 'GetX'),
        ],
      ),
    );
  }
}
```

要点：

- `IndexedStack` 同时持有 4 个页面实例，切 Tab 不丢状态。
- 四个方案各占一个 tab（Provider / Riverpod / Bloc / GetX），页面集合不再用 `const` 列表（GetX 页面含 `Get.put` 字段初始化，本就要求非 const）。

---

## 2. Provider 版

### lib/provider_demo/counter_model.dart

```dart
import 'package:flutter/foundation.dart';

class CounterModel extends ChangeNotifier {
  int _counter = 0;
  int get counter => _counter;

  void increment() {
    _counter++;
    notifyListeners();
  }

  void decrement() {
    _counter--;
    notifyListeners();
  }

  void reset() {
    _counter = 0;
    notifyListeners();
  }
}
```

### lib/provider_demo/provider_counter_page.dart

```dart
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'counter_model.dart';

class ProviderCounterPage extends StatelessWidget {
  const ProviderCounterPage({super.key});

  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider<CounterModel>(
      create: (context) => CounterModel(),
      child: Scaffold(
        appBar: AppBar(title: Text('Provider 版')),
        body: Center(
          child: Consumer<CounterModel>(
            builder: (_, model, _) => Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                const Text(
                  '手动 notifyListeners 通知刷新',
                  style: TextStyle(color: Colors.grey),
                ),
                const SizedBox(height: 16),
                Text(
                  '${model.counter}',
                  style: TextStyle(fontSize: 72, fontWeight: FontWeight(900)),
                ),
                const SizedBox(height: 24),
                _btnRow(
                  onMinus: model.decrement,
                  onPlus: model.increment,
                  onReset: model.reset,
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _btnRow({
    required VoidCallback onMinus,
    required VoidCallback onPlus,
    required VoidCallback onReset,
  }) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        ElevatedButton(onPressed: onMinus, child: const Text('-')),
        const SizedBox(width: 20),
        ElevatedButton(onPressed: onPlus, child: const Text('+')),
        const SizedBox(width: 20),
        ElevatedButton(onPressed: onReset, child: const Text('重置')),
      ],
    );
  }
}
```

要点：

- 状态类继承 `ChangeNotifier`，**手动调用 `notifyListeners()`** 通知刷新。
- 页面用 `ChangeNotifierProvider` 注入、`Consumer<T>` 订阅，强依赖 `BuildContext`。

---

## 3. Riverpod 版

### lib/riverpod_demo/counter_provider.dart

```dart
import 'package:flutter_riverpod/flutter_riverpod.dart';

final counterProvider = NotifierProvider<CounterNotifier, int>(
  CounterNotifier.new,
);

class CounterNotifier extends Notifier<int> {
  @override
  int build() => 0;

  void increment() => state++;

  void decrement() {
    if (state > 0) state--;
  }

  void reset() => state = 0;
}
```

要点：

- Provider 是**全局常量**，页面无需 widget 树包装即可访问。
- `build()` 返回初始状态（`0`）；对 `state` 赋值**自动通知**监听者，无需手动 notify。
- `build()` 也可以依赖其他 Provider（`ref.watch`），依赖变化时状态整体重算重建。
- 注意差异：此处 `decrement` 限制不能减到负数（`state > 0` 才减），与其他三版行为不一致。

### lib/riverpod_demo/riverpod_counter_page.dart

```dart
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'counter_provider.dart';

class RiverpodCounterPage extends ConsumerWidget {
  const RiverpodCounterPage({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final count = ref.watch(counterProvider);
    final notifier = ref.read(counterProvider.notifier);

    return Scaffold(
      appBar: AppBar(title: Text('Riverpod 版')),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Text(
              'ref.watch 订阅，改 state 自动刷新',
              style: TextStyle(color: Colors.grey),
            ),
            const SizedBox(height: 12),
            Text(
              '$count',
              style: TextStyle(fontSize: 72, fontWeight: FontWeight(900)),
            ),
            const SizedBox(height: 24),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                ElevatedButton(
                  onPressed: notifier.decrement,
                  child: const Text('-'),
                ),
                const SizedBox(width: 20),
                ElevatedButton(
                  onPressed: notifier.increment,
                  child: const Text('+'),
                ),
                const SizedBox(width: 20),
                ElevatedButton(
                  onPressed: notifier.reset,
                  child: const Text('重置'),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
```

要点：

- 继承 `ConsumerWidget`，`build` 多一个 `WidgetRef ref`。
- `ref.watch(...)` 负责订阅刷新；`ref.read(...notifier)` 只取逻辑对象给按钮用，不产生订阅。
- 核心口诀：**数据用 watch，动作用 read**。

---

## 4. Bloc 版

### lib/bloc_demo/counter_event.dart

```dart
// lib/bloc_demo/counter_event.dart
abstract class CounterEvent {}

class IncrementEvent extends CounterEvent {}

class DecrementEvent extends CounterEvent {}

class ResetEvent extends CounterEvent {}
```

### lib/bloc_demo/counter_bloc.dart

```dart
import 'package:flutter_bloc/flutter_bloc.dart';
import 'counter_event.dart';

class CounterBloc extends Bloc<CounterEvent, int> {
  CounterBloc() : super(0) {
    on<IncrementEvent>((event, emit) => emit(state + 1));
    on<DecrementEvent>((event, emit) => emit(state - 1));
    on<ResetEvent>((event, emit) => emit(0));
  }
}
```

### lib/bloc_demo/bloc_counter_page.dart

```dart
// lib/bloc_demo/bloc_counter_page.dart
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'counter_bloc.dart';
import 'counter_event.dart';

class BlocCounterPage extends StatelessWidget {
  const BlocCounterPage({super.key});

  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (_) => CounterBloc(),
      child: Scaffold(
        appBar: AppBar(title: const Text('Bloc 版')),
        body: Center(
          child: BlocBuilder<CounterBloc, int>(
            builder: (context, count) {
              final bloc = context.read<CounterBloc>();
              return Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const Text(
                    '发 Event → Bloc → emit 新 State',
                    style: TextStyle(color: Colors.grey),
                  ),
                  const SizedBox(height: 12),
                  Text(
                    '$count',
                    style: const TextStyle(
                      fontSize: 72,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 24),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      ElevatedButton(
                        onPressed: () => bloc.add(DecrementEvent()),
                        child: const Text('-'),
                      ),
                      const SizedBox(width: 20),
                      ElevatedButton(
                        onPressed: () => bloc.add(IncrementEvent()),
                        child: const Text('+'),
                      ),
                      const SizedBox(width: 20),
                      ElevatedButton(
                        onPressed: () => bloc.add(ResetEvent()),
                        child: const Text('重置'),
                      ),
                    ],
                  ),
                ],
              );
            },
          ),
        ),
      ),
    );
  }
}
```

要点：

- 单向数据流：**UI 发 Event → Bloc 处理 → emit 新 State → UI 重建**。
- UI 层不直接改状态，只能通过 `bloc.add(Event)` 提交"意图"。

---

## 5. GetX 版

### lib/getx_demo/counter_controller.dart

```dart
// lib/getx_demo/counter_controller.dart
import 'package:get/get.dart';

class CounterController extends GetxController {
  final count = 0.obs;

  void increment() => count.value++;
  void decrement() {
    if (count.value > 0) count.value--;
  }

  void reset() => count.value = 0;
}
```

### lib/getx_demo/getx_counter_page.dart

```dart
// lib/getx_demo/getx_counter_page.dart
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'counter_controller.dart';

class GetxCounterPage extends StatelessWidget {
  GetxCounterPage({super.key});

  // Get.put 注入（页面首次构建即创建）
  final CounterController c = Get.put(CounterController());

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('GetX 版')),
      body: Center(
        child: Obx(
          () => Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Text(
                'Obx 自动订阅 .obs 变量',
                style: TextStyle(color: Colors.grey),
              ),
              const SizedBox(height: 12),
              Text(
                '${c.count.value}',
                style: const TextStyle(
                  fontSize: 72,
                  fontWeight: FontWeight.bold,
                ),
              ),
              const SizedBox(height: 24),
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  ElevatedButton(
                    onPressed: c.decrement,
                    child: const Text('-'),
                  ),
                  const SizedBox(width: 20),
                  ElevatedButton(
                    onPressed: c.increment,
                    child: const Text('+'),
                  ),
                  const SizedBox(width: 20),
                  ElevatedButton(onPressed: c.reset, child: const Text('重置')),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}
```

要点：

- `0.obs` 把变量变成响应式（`RxInt`），`.value` 读写。
- `Obx(() => ...)` 内只要读取过的 `.obs` 变量变化就自动刷新，无需 context、无需手动 notify。
- `Get.put` 是全局注入，任何地方都能 `Get.find<CounterController>()` 取到同一实例。

---

## 6. 四种方案横向对比

### 6.1 数据流与写法对比

|                       | Provider                                        | Riverpod                           | Bloc                                | GetX                           |
| --------------------- | ----------------------------------------------- | ---------------------------------- | ----------------------------------- | ------------------------------ |
| 核心思想              | InheritedWidget 封装                            | 编译安全的 Provider 重构           | 单向数据流（Event→State）           | 响应式变量 + 全局 DI           |
| 状态定义              | `ChangeNotifier` 子类，手动 `notifyListeners()` | `Notifier<T>`，改 `state` 自动通知 | `Bloc<Event, State>`，`emit` 新状态 | `GetxController` + `.obs` 变量 |
| UI 订阅               | `Consumer<T>` / `context.watch`                 | `ref.watch(provider)`              | `BlocBuilder<B, S>`                 | `Obx(() => ...)`               |
| 是否依赖 BuildContext | 强依赖                                          | 几乎不依赖（全局 ref）             | 依赖（provider 化的读法）           | 不依赖（`Get.put/find` 全局）  |
| 状态修改方式          | 改字段 + notify                                 | `state = 新值`                     | UI 只发 Event，Bloc 内 emit         | `count.value = 新值`           |
| 代码量（本 demo）     | 2 文件                                          | 2 文件                             | 3 文件                              | 2 文件                         |

### 6.2 优缺点分析

#### Provider

**优点**

- Flutter 官方推荐过、文档与社区资料最丰富，学习成本最低。
- 与 Flutter 的 `InheritedWidget` 机制一致，心智模型简单。
- `selector`、`Consumer` 可做精细粒度重建。

**缺点**

- 强依赖 `BuildContext`，跨页面/非 widget 环境拿状态很别扭。
- 需要手动调 `notifyListeners()`，忘记调用就是"界面不刷新"的经典 bug。
- Provider 作用域与 widget 树绑定，嵌套复杂时容易 `ProviderNotFoundException`。
- 本质是把状态挂在 widget 树上，复杂业务分层（数据层/逻辑层）没有强制约定。

#### Riverpod

**优点**

- Provider 全局声明，**编译期安全**（类型错误、遗漏依赖在编译/分析期就报），不依赖 widget 树。
- 改 `state` 自动通知，无需手动 notify；`build()` 还能声明依赖、自动重算。
- 生态完善（`AsyncValue` 处理异步、`ref.listen` 副作用、自动 dispose），测试友好（可 override Provider）。
- 被社区普遍视为 Provider 的"正统继任者"，目前最主流的选择之一。

**缺点**

- 需要外层 `ProviderScope`，`Notifier`/`build()` 等新概念有一段学习曲线。
- 概念较多：`StateProvider`、`FutureProvider`、`StreamProvider`、`NotifierProvider`、`AsyncNotifierProvider`……初学容易迷路。
- "状态必须整体替换（对象要用 copyWith）"与直觉相悖，需要转变思维。

#### Bloc

**优点**

- **强制的单向数据流与严格分层**：UI 只能发 Event，状态只能由 Bloc 产生，大型团队协作时结构清晰、可追溯。
- 状态变化可被完整记录（Event→State 流水），非常适合日志、回放、时间旅行调试。
- 生态成熟（`BlocObserver` 全局监听、`freezed` 配套、代码生成），中大型项目与 Flutter 官方文档均有背书。

**缺点**

- 样板代码最多：一个功能要写 Event、Bloc、（复杂时还有 State 类）、Provider、Builder，小功能显得笨重。
- 学习成本高，"什么该是 Event、什么该是 State"需要团队规范约束。
- 简单页面用它明显过度设计（本 demo 里 3 个文件 vs 其他方案 2 个）。

#### GetX

**优点**

- **最简写法**：`.obs` + `Obx` 三行代码出效果，上手极快。
- 不只是状态管理：路由、国际化、依赖注入、Snackbar/Dialog 全家桶，一套 API 搞定。
- 无需 BuildContext、无需 widget 树包装，响应式变量变化精准刷新 `Obx` 范围。

**缺点**

- "魔法"太多、约束太少：全局 `Get.put/find` 实际上是服务定位器模式，容易造成隐式依赖、状态散落，项目大了难以维护。
- 与 Flutter 官方设计理念有分歧（官方推荐走 InheritedWidget/Riverpod 系），社区口碑两极分化。
- 全局注入 + 智能管理（自动销毁）的时机容易踩坑（页面重进、controller 被意外销毁等）。
- 过度捆绑：引入状态管理会把路由/DI 一并绑定到 GetX 体系。

### 6.3 选型建议

| 场景                                           | 推荐                             |
| ---------------------------------------------- | -------------------------------- |
| 小工具/快速原型，追求最少代码                  | GetX                             |
| 一般项目、团队技术栈未定                       | Riverpod（社区主流、平衡性最好） |
| 中大型项目、多人协作、需要严格规范与可追溯状态 | Bloc                             |
| 维护遗留项目或对 InheritedWidget 心智模型熟悉  | Provider                         |

### 6.4 同一功能的实现心智模型速记

```text
Provider : 改字段 → 手动 notifyListeners → Consumer 重建
Riverpod : state = 新值 → 自动通知 → ref.watch 处重建
Bloc     : add(Event) → Bloc 处理 → emit 新 State → BlocBuilder 重建
GetX     : count.value 改 → 自动通知 → Obx 范围重建
```

> 备注：四个页面已全部注册进 `app.dart` 的 `IndexedStack`，底部导航四个 tab 均可正常访问与切换，页面状态在切换时保留（IndexedStack 特性）。
