---
title: 01 · Dart 入门实战
description: Dart 入门实战测试
date: 2026-11-6
year: 2026
moddifyDate: 2026-11-6 13:54:04
---

# 01 · Dart 入门实战

> Dart 是 Flutter 的开发语言。Flutter 中 90% 的代码就是 Dart 类 + Widget 组合，先把 Dart 语法吃透，Flutter 上手就快。

---

## 1. Hello Dart 与运行方式

**用法**：Dart 程序入口是 `main()`，每个文件只能有一个入口。可通过 `dart run` 运行，或在 Flutter 项目里直接写。

```dart
void main() {
  print('Hello Dart');
}
```

```bash
dart run main.dart        # 命令行运行
dart analyze              # 静态分析
```

---

## 2. 变量与常量

**用法**：

- `var`：类型自动推断，赋值后类型固定。
- `final`：运行时常量（赋值一次，运行时才能确定的值用它，如 `DateTime.now()`）。
- `const`：编译期常量（值必须在编译时就确定）。
- `dynamic`：动态类型，绕过类型检查（尽量少用）。

```dart
void main() {
  var name = 'Flutter';          // 推断为 String
  // name = 123;                 // ❌ 报错：类型已固定

  final time = DateTime.now();   // ✅ 运行时才确定 → 用 final
  // const time2 = DateTime.now(); // ❌ 编译期无法确定

  const pi = 3.14159;            // ✅ 编译期常量

  dynamic anything = 'str';
  anything = 123;                // ✅ dynamic 可换任意类型
  print('$name $time $pi $anything');
}
```

---

## 3. 内置数据类型

**用法**：`int`（整数）、`double`（小数）、`num`（两者父类）、`String`、`bool`。字符串与数字互转用 `parse` / `toString`。

```dart
void main() {
  int a = 10;
  double b = 3.14;
  num c = 100;     // 可以赋 int 也可以赋 double
  bool flag = true;
  String s = '你好';

  // 字符串 <-> 数字
  int n = int.parse('123');
  double d = double.parse('3.14');
  String str = 100.toString();
  print('$a $b $c $flag $s | $n $d $str');
}
```

---

## 4. 字符串操作

**用法**：插值 `$变量`、`${表达式}`；三个引号支持多行；常用方法 `split / contains / replaceAll / trim / substring / indexOf / isEmpty`。

```dart
void main() {
  String name = 'Flutter';
  int age = 5;

  print('我叫 $name，明年 ${age + 1} 岁');   // 插值

  String desc = '''
多行字符串
可以换行
''';

  print(name.toUpperCase());       // FLUTTER
  print(name.contains('flu'));     // false（区分大小写）
  print(name.split(''));           // [F, l, u, t, t, e, r]
  print('  ab  '.trim());          // ab
  print(name.isEmpty);             // false
}
```

---

## 5. List（数组）

**用法**：最常用集合。重点掌握 `where(过滤) / map(映射) / forEach(遍历) / any / every / fold(累加)` 与扩展运算符 `...`。

```dart
void main() {
  List<int> list = [1, 2, 3, 4, 5];

  list.add(6);
  list.insert(0, 0);
  print(list);                        // [0,1,2,3,4,5,6]

  // 过滤：where 返回惰性 Iterable，一般转 toList
  var big = list.where((e) => e > 3).toList();
  print(big);                         // [4,5,6]

  // 映射：int -> String
  var strs = list.map((e) => '编号$e').toList();
  print(strs);

  // 累加
  var sum = list.fold(0, (pre, e) => pre + e);
  print(sum);                         // 21

  // 扩展运算符合并
  var all = [...list, ...[7, 8]];
  print(all);
}
```

**Flutter 中的典型用法**——`List.map` 生成 Widget 列表：

```dart
final items = ['首页', '分类', '购物车'];
Column(
  children: items.map((e) => Text(e)).toList(),
)
```

---

## 6. Set（去重集合）

**用法**：元素唯一，常用于去重、交集并集。

```dart
void main() {
  Set<String> set = {'a', 'b', 'c'};
  set.add('a');                        // 重复添加无效
  print(set);                          // {a, b, c}

  var list = [1, 2, 2, 3, 3];
  print(list.toSet().toList());        // [1, 2, 3]  经典去重

  var s1 = {'a', 'b'};
  var s2 = {'b', 'c'};
  print(s1.intersection(s2));          // {b} 交集
  print(s1.union(s2));                 // {a, b, c} 并集
}
```

---

## 7. Map（键值对）

**用法**：JSON 解析后的数据基本都是 Map；重点掌握 `forEach / keys / values / containsKey / putIfAbsent`。

```dart
void main() {
  Map<String, dynamic> user = {'name': '张三', 'age': 20};

  print(user['name']);            // 张三
  user['city'] = '深圳';           // 增/改
  user.remove('age');             // 删

  user.forEach((key, value) => print('$key=$value'));

  // Map -> List -> 字符串（接口传参常用）
  var kv = user.entries.map((e) => '${e.key}=${e.value}').join('&');
  print(kv);                      // name=张三&city=深圳

  // Model.fromJson(json) 的典型模式
  var json = '{"name":"李四","age":25}';
  var map = jsonDecode(json);     // 需要 import 'dart:convert';
  print(map['name']);
}
```

---

## 8. 函数

**用法**：Dart 函数是一等公民。重点掌握**可选位置参数 `[]`、命名参数 `{}`、默认值**（Flutter 构造函数大量使用命名参数）。

```dart
// 必填 + 可选位置参数
String greet(String name, [String? city]) {
  return city == null ? '你好,$name' : '你好,$name(来自$city)';
}

// 命名参数 + 默认值（Flutter Widget 构造的写法）
void createUser({required String name, int age = 18, String sex = '男'}) {
  print('name=$name, age=$age, sex=$sex');
}

void main() {
  print(greet('张三'));
  print(greet('张三', '深圳'));

  createUser(name: '李四');                       // age 用默认值
  createUser(name: '王五', age: 30, sex: '女');

  // 箭头函数
  var list = [1, 2, 3];
  list.forEach((e) => print(e * 2));

  // 匿名函数赋值给变量
  var add = (int a, int b) => a + b;
  print(add(1, 2));
}
```

---

## 9. 运算符

**用法**：Dart 特色运算符在 Flutter 里随处可见。

```dart
void main() {
  var a;               // null
  print(a ?? 10);      // 10  空值兜底

  var b;
  b ??= 5;             // b 为 null 才赋值
  print(b);            // 5

  String? name;        // 可空类型
  print(name?.length); // null，不报错（等价 name==null?null:name.length）

  // 级联操作符 ..：对同一对象连续操作
  var list = []
    ..add(1)
    ..add(2)
    ..addAll([3, 4]);
  print(list);

  // 类型判断 / 转换
  var x = 'hello';
  print(x is String);       // true
  print(x is! int);         // true
  dynamic y = 10 as num;    // 强转
  print(y);
}
```

---

## 10. 流程控制

**用法**：与 JS 类似；`switch` 支持 `continue 标签` 落到其他分支；循环可加标签跳出。

```dart
void main() {
  // if
  var score = 85;
  if (score >= 90) {
    print('优秀');
  } else if (score >= 80) {
    print('良好');
  } else {
    print('继续努力');
  }

  // for / for-in
  for (var i = 0; i < 3; i++) {
    print('i=$i');
  }
  for (var item in ['a', 'b', 'c']) {
    print(item);
  }

  // while / do-while
  var n = 3;
  while (n > 0) {
    print(n--);
  }

  // switch
  var week = 'Monday';
  switch (week) {
    case 'Monday':
      print('周一');
      break;
    case 'Sunday':
      print('周日');
      break;
    default:
      print('其他');
  }
}
```

---

## 11. 类、构造函数

**用法**：所有 Flutter Widget 都是类。重点掌握**命名构造函数、`this.xxx` 简写、可空/必填参数**。

```dart
class Person {
  String name;
  int age;

  // 默认构造函数（this 简写）
  Person(this.name, this.age);

  // 命名构造函数：从 Map(JSON) 创建对象
  Person.fromJson(Map<String, dynamic> json)
      : name = json['name'],
        age = json['age'];

  void say() => print('我是 $name, $age 岁');
}

class Student extends Person {
  String school;
  // : super() 调用父类构造
  Student(String name, int age, this.school) : super(name, age);

  @override
  void say() => print('我是学生 $name，就读 $school');
}

void main() {
  var p = Person('张三', 20);
  var p2 = Person.fromJson({'name': '李四', 'age': 25});
  var s = Student('王五', 18, '深大');
  p.say();
  p2.say();
  s.say();
}
```

---

## 12. getter / setter / 静态成员

**用法**：`get` 可当计算属性用（Flutter 里 `widget.xxx` 底层就是 getter）。

```dart
class Rect {
  double width, height;
  Rect(this.width, this.height);

  double get area => width * height;      // 计算属性
  set size(double v) {                     // setter
    width = height = v;
  }

  static int count = 0;                    // 静态成员，类名直接访问
  static void log() => print('count=$count');
}

void main() {
  var r = Rect(3, 4);
  print(r.area);   // 12
  r.size = 5;
  print(r.area);   // 25
  Rect.count = 1;
  Rect.log();
}
```

---

## 13. 继承、抽象类、接口、多态

**用法**：`extends` 继承（单继承）；`abstract` 抽象类可以当接口实现（`implements` 可实现多个）；Flutter 里 `State<T>` 就是通过抽象方法约束子类实现 `build()`。

```dart
// 抽象类
abstract class Animal {
  String name;
  Animal(this.name);
  void eat();                        // 抽象方法，子类必须实现
}

class Dog extends Animal {
  Dog(String name) : super(name);

  @override
  void eat() => print('$name 啃骨头');   // 多态
}

class Cat implements Animal {          // implements 要实现全部成员
  @override
  String name = '猫咪';

  @override
  void eat() => print('$name 吃鱼');
}

void main() {
  // 父类引用指向子类对象 → 多态
  List<Animal> animals = [Dog('旺财'), Cat()];
  for (var a in animals) {
    a.eat();
  }
}
```

---

## 14. Mixins（混入）

**用法**：`with` 混入多个类，实现类似多继承。Flutter 里 `StatefulWidget` 的 State 经常 `with SingleTickerProviderStateMixin` 就是 Mixin。

```dart
mixin Run {
  void run() => print('跑步');
}

mixin Swim {
  void swim() => print('游泳');
}

class Duck with Run, Swim {}           // 一个类混入多个能力

class Human with Run, Swim {
  @override
  void run() => print('人类跑步${super.run}');  // 可覆写混入方法
}

void main() {
  Duck().run();
  Duck().swim();
  Human().run();
}
```

---

## 15. 泛型

**用法**：提高复用与类型安全。Flutter 中 `State<MyPage>`、`Future<List<T>>`、`List<T>` 都是泛型。

```dart
// 泛型方法
T first<T>(List<T> list) => list.first;

// 泛型类（仿一个简单缓存仓库）
class Repository<T> {
  final Map<String, T> _cache = {};
  void put(String key, T value) => _cache[key] = value;
  T? get(String key) => _cache[key];
}

void main() {
  print(first<int>([1, 2, 3]));          // 1
  print(first<String>(['a', 'b']));      // a

  var userRepo = Repository<Map<String, dynamic>>();
  userRepo.put('u1', {'name': '张三'});
  print(userRepo.get('u1'));
}
```

---

## 16. 库的使用

**用法**：Dart 每个文件就是一个库；`import` 引入，`show/hide/as` 控制可见性与重命名。Flutter 项目常用 `package:` 引三方包。

```dart
import 'dart:convert';                          // Dart 官方库：JSON 编解码
import 'package:flutter/material.dart';         // 三方库 / Flutter 库
import 'lib/person.dart' show Person;           // 只导入 Person
import 'lib/old.dart' as old;                   // 重命名，避免命名冲突
// import 'lib/xx.dart' hide a;                 // 隐藏某成员

void main() {
  var jsonStr = '{"name":"张三"}';
  var map = jsonDecode(jsonStr);
  print(map['name']);
  print(jsonEncode(map));     // 编码回 JSON 字符串
}
```

自定义库（`lib/person.dart`）：

```dart
class Person {
  String name;
  Person(this.name);
}
```

---

## 17. 异步：Future / async / await

**用法**：网络请求、IO 都是异步。`Future` 相当于 JS 的 Promise；`async/await` 写同步风格的异步代码；`Future.wait` 并发多个任务。

```dart
Future<String> fetchUser() async {
  await Future.delayed(Duration(seconds: 1));   // 模拟网络延迟
  return '{"name":"张三"}';
}

void main() async {
  // 写法 1：then / catchError（类似 promise.then）
  fetchUser().then((value) => print(value)).catchError((e) => print(e));

  // 写法 2：async / await + try-catch（推荐）
  try {
    var user = await fetchUser();
    print(user);
  } catch (e) {
    print('请求失败: $e');
  }

  // 并发
  var results = await Future.wait([fetchUser(), fetchUser()]);
  print(results.length);   // 2
}
```

---

## 18. Stream（流）

**用法**：连续多次的数据流（定时器、消息推送、MQTT）。`StreamController` 是手动发流的核心；Widget 用 `StreamBuilder` 监听。

```dart
import 'dart:async';

void main() async {
  var controller = StreamController<String>();

  // 订阅
  controller.stream.listen(
    (data) => print('收到: $data'),
    onDone: () => print('流已关闭'),
  );

  controller.add('消息1');
  await Future.delayed(Duration(milliseconds: 100));
  controller.add('消息2');
  await Future.delayed(Duration(milliseconds: 100));
  await controller.close();
}
```

---

## 小结：Dart 在 Flutter 中的高频用法对照

| Dart 知识点       | Flutter 中的体现                           |
| ----------------- | ------------------------------------------ |
| 命名参数 + 默认值 | 所有 Widget 构造函数                       |
| Mixins (`with`)   | `SingleTickerProviderStateMixin`、状态混入 |
| 抽象类            | `State<T>` 强制实现 `build()`              |
| 泛型              | `State<T>`、`List<T>`、`Future<T>`         |
| Future/async      | 网络请求（dio）、读取存储                  |
| Stream            | `StreamBuilder`、MQTT、轮询推送            |
| Map + 泛型类      | 接口 JSON → Model（`fromJson`）            |
