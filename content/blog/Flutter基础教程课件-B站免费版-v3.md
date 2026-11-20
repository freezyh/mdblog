---
title: Flutter 基础教程课件（B站免费版 v3）
description: Flutter 基础教程课件（B站免费版 v3）
date: 2026-11-20
year: 2026
moddifyDate: 2026-11-20 15:58:49
---

# Flutter 基础教程课件（B站免费版 v3）

## 一、Flutter介绍

Flutter 是谷歌开发的一款开源、免费的 UI 框架，可以快速地在 Android 和 iOS 上构建高质量 App，最大的特点是跨平台与高性能。目前 Flutter 已支持 iOS、Android、Web、Windows、macOS、Linux 等平台。

Flutter 基于谷歌的 Dart 语言。如果没有任何 Dart 语言基础，不建议直接学习 Flutter，建议先学习 Dart 基本语法，再进入 Flutter 的学习。

市面上已经有很多混合 App 开发框架：有些主要针对前端开发者，比如 ReactNative（基于 React）、Ionic（基于 Angular、Vue、React）；有些针对 .Net 平台开发者，比如 Xamarin。而 Flutter 基于 Dart 语言，面向全部开发者，性能相比 RN、Ionic 这类框架更好。

Flutter 从 2018 年 12 月 5 日发布 1.0 到后面的所有版本用法都一样，非常稳定，社区也很完善。Flutter 3.x 以后不仅支持 Android/iOS App 的跨平台开发，还支持 Web 和 Windows、macOS、Linux 桌面应用的跨平台开发。全球很多公司已在商业项目中使用 Flutter，比如 Google、微软、阿里、字节、百度、京东等。据官方统计，截止到 2024 年 9 月，已有超过 100 万款商业应用使用 Flutter 构建，在跨端框架中排名第一。

相关链接：

- Flutter 官网：https://flutter.dev/
- Flutter Packages 官网：https://pub.dev/

---

## 二、Windows 上面搭建 Flutter Android 运行环境

环境搭建整体步骤：

1. 电脑上面安装配置 JDK（版本 jdk-22）
2. 下载安装 Android Studio（版本 android-studio-2024.2.1.11）
3. 下载配置 Flutter SDK（如 Flutter 3.24.5，适用于 Flutter 3.7.3 之后的所有版本）
4. 配置 Flutter 国内镜像
5. 运行 `flutter doctor` 命令检测环境是否配置成功，根据提示安装配置对应软件
6. 打开 Android Studio 安装 Flutter 插件
7. 创建并运行 Flutter 项目

### 2.1、电脑上面安装配置JDK

1. 下载安装 JDK（jdk-22 或最新版本）：https://www.oracle.com/java/technologies/downloads/
2. 配置 JDK 环境变量。安装完成后在命令行输入 `java`、`javac` 有提示信息，但仍需要配置环境变量：
   1. 系统变量中新增 `JAVA_HOME`，设置值为 Java SDK 根目录。
   2. 系统变量中找到 `Path`，在 Path 环境变量里增加：

```text
;%JAVA_HOME%\bin;
```

> **提示**：JDK 19 及以上版本无需单独配置 JRE。Win10/Win11 通过「系统属性 → 环境变量」界面进行上述配置即可。

### 2.2、电脑上下载安装Android Studio

下载地址：https://developer.android.google.cn/studio ，下载后按向导安装即可。

### 2.3、电脑上面下载配置Flutter Sdk（所有版本方法一样）

1. 下载 Flutter SDK：https://flutter.dev/docs/development/tools/sdk/releases#windows
2. 把下载好的 Flutter SDK 解压到你想安装 SDK 的目录，例如解压到 `F:\flutter_windows\flutter`。
3. 把 Flutter 安装目录的 `bin` 目录配置到 `Path` 环境变量中。例如把 `F:\flutter_windows\flutter\bin` 添加到 Path 环境变量里（Windows 10/11 通过环境变量编辑界面添加）。

### 2.4、电脑上配置Flutter国内镜像

搭建环境过程中要下载很多资源文件，在国内访问 Flutter 时可能会受到限制，导致资源下载不了而报各种错误。Flutter 官方提供了国内镜像（参见 https://flutter.dev/community/china 、https://flutter-io.cn/ ），把下面的环境变量配置到系统里即可。

Flutter 社区镜像：

```text
FLUTTER_STORAGE_BASE_URL: https://storage.flutter-io.cn
PUB_HOSTED_URL: https://pub.flutter-io.cn
```

清华大学 TUNA 协会镜像：

```text
FLUTTER_STORAGE_BASE_URL: https://mirrors.tuna.tsinghua.edu.cn/flutter
PUB_HOSTED_URL: https://mirrors.tuna.tsinghua.edu.cn/dart-pub
```

### 2.5、运行 flutter doctor 命令检测环境是否配置成功

```bash
flutter doctor
```

第一次执行可能会提示以下几类错误：

1. **错误一**：`cmdline tools component is missing`（cmdline-tools 组件缺失）。
2. **错误二**：`Visual Studio not installed`。如果只是开发 Flutter App，可以忽略此错误信息。
3. **错误三**：`Android Studio Unable to find bundled Java version.`

**错误三的解决方法**：将 Android Studio 的 `jbr` 目录内容复制到 `jre` 目录：

- macOS 系统：在 `jbr` 同目录下创建一个 `jre` 目录，然后把 `jbr` 目录内的全部文件复制一份到 `jre` 目录下。
- Windows 系统：`jre` 目录是存在的，但里面几乎没有东西，直接把 `jbr` 目录内的全部文件复制一份到 `jre` 目录下即可。

**错误一（cmdline-tools 缺失）的解决方法**：安装 cmdline-tools 并配置 android-licenses。

1. 在 Android Studio 的 SDK Manager 中安装 Android SDK Command-line Tools。
2. 执行 licenses 配置命令：

```bash
flutter doctor --android-licenses
```

> **提示**：命令执行过程中提示输入 Y/N 的地方全部输入 Y。

**错误二（Visual Studio 未安装）的解决方法**：Visual Studio 主要用于 Flutter 桌面软件开发，如果只开发 Flutter App 可以不用安装。下载地址：https://visualstudio.microsoft.com/zh-hans/downloads/ 。如果安装失败，可以修改 DNS 后重试。

### 2.6、打开Android Studio 安装Flutter插件

在 Android Studio 的插件管理界面（Plugins）中搜索 Flutter 并安装（会连带安装 Dart 插件），安装完成后重启 IDE。

> **提示**：新版本 Android Studio 的插件设置界面布局可能略有不同，入口在 Settings → Plugins 中。

### 2.7、创建 运行Flutter项目

通过 Android Studio 的新建项目向导选择 Flutter 项目类型创建项目；创建完成后选择设备并运行。

可以用 `flutter devices` 检测当前可用的设备：

```bash
flutter devices
```

输出示例：

```text
C:\Users\itying>flutter devices
4 connected devices:
Redmi K30 (mobile)  • beac2700  • android-arm64  • Android 12 (API 31)
Windows (desktop)   • windows   • windows-x64    • Microsoft Windows [版本 10.0.19043.1766]
Chrome (web)        • chrome    • web-javascript • Google Chrome 103.0.5060.114
Edge (web)          • edge      • web-javascript • Microsoft Edge 103.0.1264.49
```

### 2.8、可能遇到的错误(必看)

1. **导入项目提示 Gradle 相关错误**：点击 `File -> Sync Project With Gradle Files` 重新下载 Gradle。这个过程比较慢，大约需要 10~30 分钟。

---

## 二、Flutter 运行问题排查（续）

Gradle 编译失败重试后的解决方法：

1. 开启手机热点重试。
2. 谷歌或百度搜索 “android Gradle编译时下载依赖失败”。
3. 配置国内镜像（推荐方式，可自行搜索相关教程）。

如果提示**找不到运行的设备**，请参考下一讲真机调试的内容。

---

## 三、Flutter Android 真机调试

真机调试需要满足以下条件：

1. 准备一台 Android 手机。
2. 手机开启调试模式。
3. 用数据线把手机连上电脑。
4. 手机允许电脑进行 USB 调试。
5. 安装手机对应的 SDK 版本。

> **提示**：
>
> - 关闭电脑上的手机助手（如 360 手机助手、应用宝等占用 adb 端口的软件）。
> - 关闭 HBuilder 之类占用 adb 端口的软件。
> - 数据线一定要可用（可以用手机助手软件检测）。

---

## 四、Flutter 虚拟机模拟器调试

必备条件：

1. 准备虚拟机模拟器，可以是 Android Studio 自带的模拟器，也可以是第三方模拟器。
2. 模拟器安装好后需要先打开。

> **提示**：同样需要关闭手机助手、HBuilder 等占用 adb 端口的软件。

### 4.1 使用 Android Studio 自带模拟器

在 Android Studio 的设备管理器（Device Manager）中创建并启动一个 AVD 模拟器，之后即可在运行 Flutter 项目时选择该设备。

### 4.2 使用第三方模拟器

百度或谷歌搜索 android 模拟器，找一款安装后参考其官方文档配置即可使用。

---

## 五、VSCode 中开发、运行 Flutter 应用

如果习惯用 Android Studio，可以直接用它开发 Flutter，但 Android Studio 比较耗费电脑资源，推荐使用 **VSCode**。

### 5.1 VSCode 中安装 Flutter 插件、Dart 插件

在 VSCode 扩展市场分别安装 **Flutter** 和 **Dart** 插件。

### 5.2 VSCode 中打开 Flutter 项目进行开发

> **提示**：打开项目时定位到项目根目录即可，不需要定位到项目下的 android 目录。

### 5.3 运行 Flutter 项目、热加载 Flutter 项目

```bash
flutter run
flutter run -d all
```

运行后可用的交互快捷键：

| 快捷键 | 作用                                     |
| ------ | ---------------------------------------- |
| r      | 热加载（Hot reload），重新加载改动       |
| R      | 热重启（Hot restart）                    |
| p      | 显示网格，便于掌握布局情况，工作中很有用 |
| o      | 切换 android 和 ios 的预览模式           |
| h      | 列出所有可用的交互命令                   |
| d      | 分离（结束 flutter run 但应用继续运行）  |
| c      | 清屏                                     |
| q      | 退出调试预览模式                         |

查看设备：

```bash
flutter devices
```

命令输出示例：

```text
Flutter assets will be downloaded from https://storage.flutter-io.cn. Make sure you trust this source!
3 connected devices:
Windows (desktop) • windows • windows-x64 • Microsoft Windows [版本 10.0.19043.1766]
Chrome (web)      • chrome  • web-javascript • Google Chrome 103.0.5060.114
Edge (web)        • edge    • web-javascript • Microsoft Edge 103.0.1264.49
```

运行在所有设备：

```bash
flutter run -d all
```

指定设备运行：

```bash
flutter run -d chrome
```

---

## 六、Mac 电脑搭建 Flutter iOS 环境

### 6.1 准备工作

1. 升级 macOS 系统为最新系统。
2. 安装最新的 Xcode。
3. 电脑上安装 brew（https://brew.sh/）。
4. 安装 Chrome 浏览器（开发 web 用）。

### 6.2 下载 Flutter、配置环境变量、配置 Flutter 镜像

#### 6.2.1 下载 Flutter SDK

从 Flutter 官网 Releases 页面下载 macOS 版 SDK。

#### 6.2.2 解压 SDK

把下载好的 Flutter SDK 解压到你想安装的目录，例如 `/Users/aisheng/flutter_mac/flutter`。

#### 6.2.3 配置环境变量与国内镜像

编辑 `~/.bash_profile` 或 `~/.zshrc`：

```bash
export PATH=/Users/aishengwanwu/flutter_mac/flutter/bin:$PATH
export PUB_HOSTED_URL=https://pub.flutter-io.cn
export FLUTTER_STORAGE_BASE_URL=https://storage.flutter-io.cn
```

让配置生效：

```bash
source ~/.bash_profile
source ~/.zshrc
```

执行 `flutter --version`，如果能输出版本号说明 SDK 配置成功。

> **提示**：如果配置完成后执行 `flutter --version` 提示 flutter 不是内置命令之类的错误，可能是 SDK 没有配置成功，也可能是下载时没有下载完整。

### 6.3 运行 flutter doctor 命令检测环境

第一次运行 `flutter doctor` 时可能提示如下错误（缺少 CocoaPods）：

```text
✗ CocoaPods not installed.
CocoaPods is used to retrieve the iOS platform side's plugin code that
responds to your plugin usage on the Dart side.
Without resolving iOS dependencies with CocoaPods, plugins will not work
on iOS.
To install:
  brew install cocoapods
  pod setup
```

### 6.4 配置 Flutter Xcode iOS 环境

#### 6.4.1 安装 brew（如未安装）

终端执行：

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

#### 6.4.2 执行以下命令

```bash
brew install cocoapods
pod setup
sudo xcode-select --switch /Applications/Xcode.app/Contents/Developer
sudo xcodebuild -runFirstLaunch
```

> **提示**：如果运行命令失败，请运行 `brew doctor` 并按照说明解决问题。

执行完上面的命令后重新运行 `flutter doctor`，全部检查项通过即表示 iOS 环境配置完成。

### 6.5 Mac 上创建 Flutter iOS 项目

```bash
sudo flutter create flutterdemo
```

### 6.6 修改 Flutter SDK 目录的权限以及项目目录的权限

创建项目后，需要修改 Flutter SDK 目录和项目目录的读写权限，否则后续打开和运行项目会失败。

### 6.7 Xcode 打开 Flutter 项目、模拟器运行项目

> **提示**：用 Xcode 打开项目之前一定要先修改好权限。

### 6.8 在 VSCode 中配置开发 Flutter 项目

1. VSCode 中安装 Flutter 插件、Dart 插件。
2. VSCode 中打开 Flutter 项目进行开发。
3. 运行 Flutter 项目：

```bash
flutter run
```

常用交互键：`r` 热加载、`p` 显示网格、`o` 切换 android/ios 预览、`q` 退出调试。

---

## 七、手把手教您学会写第一个 Flutter 应用

创建项目：

```bash
flutter create flutterdemo03
```

### 7.1 Flutter 目录结构介绍

创建完成后需要着重注意以下几个文件/文件夹，其他的暂时不用理会：

| 文件夹/文件           | 作用                                                                 |
| --------------------- | -------------------------------------------------------------------- |
| android               | android 平台相关代码                                                 |
| ios                   | ios 平台相关代码                                                     |
| linux                 | Linux 平台相关的代码                                                 |
| macos                 | macos 平台相关的代码                                                 |
| web                   | web 相关的代码                                                       |
| windows               | windows 相关的代码                                                   |
| lib                   | flutter 相关代码，我们编写的代码就在这个文件夹                       |
| test                  | 用于存放测试代码                                                     |
| pubspec.yaml          | 配置文件，一般存放一些第三方库的依赖                                 |
| analysis_options.yaml | 分析 dart 语法的文件，老项目升级成新项目有警告信息的话可以删掉此文件 |

### 7.2 Flutter 入口文件、入口方法

每一个 Flutter 项目的 `lib` 目录里都有一个 `main.dart`，这个文件就是 Flutter 的入口文件。

`main.dart` 里面的入口方法：

```dart
void main() {
  runApp(MyApp());
}
```

也可以简写为：

```dart
void main() => runApp(MyApp());
```

其中 **main 方法**是 dart 的入口方法，**runApp 方法**是 flutter 的入口方法，`MyApp` 是自定义的一个组件。

### 7.3 第一个 Demo：Center 组件的使用

**demo1**：最简单的文本显示

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(const Center(
    child: Text(
      "我是一个文本",
      textDirection: TextDirection.ltr,
    ),
  ));
}
```

**demo2**：给 Text 组件增加一些装饰

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(const Center(
    child: Text(
      "我是一个文本",
      textDirection: TextDirection.ltr,
      style: TextStyle(
        fontSize: 40.0,
        // color: Colors.yellow,
        color: Color.fromRGBO(244, 233, 121, 0.5),
      ),
    ),
  ));
}
```

**demo3**：用 MaterialApp 和 Scaffold 装饰

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(MaterialApp(
    home: Scaffold(
      appBar: AppBar(title: const Text("你好Flutter")),
      body: const Center(
        child: Text(
          "我是一个文本",
          textDirection: TextDirection.ltr,
          style: TextStyle(
            fontSize: 40.0,
            color: Color.fromRGBO(244, 233, 121, 0.5),
          ),
        ),
      ),
    ),
  ));
}
```

**demo4**：把内容抽离成自定义组件

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(MaterialApp(
    home: Scaffold(
      appBar: AppBar(title: const Text("你好Flutter")),
      body: const HomeWidget(),
    ),
  ));
}

class HomeWidget extends StatelessWidget {
  const HomeWidget({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return const Center(
      child: Text(
        "我是一个文本",
        textDirection: TextDirection.ltr,
        style: TextStyle(
          fontSize: 40.0,
          color: Color.fromRGBO(244, 233, 121, 0.5),
        ),
      ),
    );
  }
}
```

### 7.4 Flutter 把内容单独抽离成一个组件

在 Flutter 中自定义组件其实就是一个类，这个类需要继承 **StatelessWidget** 或 **StatefulWidget**。前期我们都继承 `StatelessWidget`，后期再讲 `StatefulWidget` 的使用。

- **StatelessWidget**：无状态组件，状态不可变的 widget。
- **StatefulWidget**：有状态组件，持有的状态可能在 widget 生命周期内改变。

示例：自定义 `MyApp` 组件

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return const Center(
      child: Text(
        "我是一个文本内容",
        textDirection: TextDirection.ltr,
      ),
    );
  }
}
```

示例：自定义组件配合 MaterialApp / Scaffold 使用

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(MaterialApp(
    home: Scaffold(
      appBar: AppBar(title: const Text("你好Flutter")),
      body: const HomeWidget(),
    ),
  ));
}

class HomeWidget extends StatelessWidget {
  const HomeWidget({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return const Center(
      child: Text(
        "我是一个文本",
        textDirection: TextDirection.ltr,
        style: TextStyle(
          fontSize: 40.0,
          color: Color.fromRGBO(244, 233, 121, 0.5),
        ),
      ),
    );
  }
}
```

### 7.5 用 MaterialApp 和 Scaffold 两个组件装饰 App

**1、MaterialApp**

`MaterialApp` 是一个方便的 Widget，它封装了应用程序实现 Material Design 所需要的一些 Widget，一般作为**顶层 widget** 使用。

常用属性：`home`（主页）、`title`（标题）、`color`（颜色）、`theme`（主题）、`routes`（路由）等。

**2、Scaffold**

`Scaffold` 是 Material Design 布局结构的基本实现，提供了用于显示 drawer、snackbar 和底部 sheet 的 API。

主要属性：

- `appBar`：显示在界面顶部的一个 AppBar。
- `body`：当前界面所显示的主要内容 Widget。
- `drawer`：抽屉菜单控件。

---

## 八、Container 容器组件

`Container` 是最常用的容器组件，常用属性如下：

| 属性       | 功能                                                                                                                                                                                                                                                                                            |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| alignment  | 对齐方式。可选值：`topCenter` 顶部居中、`topLeft` 顶部左对齐、`topRight` 顶部右对齐、`center` 水平垂直居中、`centerLeft` 垂直居中水平居左、`centerRight` 垂直居中水平居右、`bottomCenter` 底部居中、`bottomLeft` 底部居左、`bottomRight` 底部居右                                               |
| decoration | 容器装饰，`BoxDecoration` 可设置颜色 `color`、边框 `border: Border.all(color: Colors.red, width: 2.0)`、圆角 `borderRadius: BorderRadius.circular(8)`、阴影 `boxShadow: [BoxShadow(color: ..., offset: Offset(2.0, 2.0), blurRadius: 10.0)]` 等。注意：设置了 decoration 就不能再直接设置 color |
| gradient   | 背景渐变，`LinearGradient` 线性渐变、`RadialGradient` 径向渐变，如 `gradient: LinearGradient(colors: [Colors.red, Colors.orange])`                                                                                                                                                              |
| margin     | Container 与外部其他组件的距离（外边距），如 `margin: EdgeInsets.all(20.0)`                                                                                                                                                                                                                     |
| padding    | Container 的内边距，指 Container 边缘与 child 之间的距离，如 `padding: EdgeInsets.all(10.0)`                                                                                                                                                                                                    |
| transform  | 让 Container 进行旋转等变换，如 `transform: Matrix4.rotationZ(0.2)`                                                                                                                                                                                                                             |
| height     | 容器高度                                                                                                                                                                                                                                                                                        |
| width      | 容器宽度                                                                                                                                                                                                                                                                                        |
| child      | 容器子元素                                                                                                                                                                                                                                                                                      |

**示例代码01**：基础用法

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(MaterialApp(
    home: Scaffold(
      appBar: AppBar(title: const Text("你好Flutter")),
      body: const MyApp(),
    ),
  ));
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Container(
        alignment: Alignment.center,
        height: 200,
        width: 200,
        decoration: const BoxDecoration(
          color: Colors.yellow,
        ),
        child: const Text(
          "你好Flutter",
          style: TextStyle(fontSize: 20),
        ),
      ),
    );
  }
}
```

**示例代码02**：渐变、阴影、边框与旋转

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(MaterialApp(
    home: Scaffold(
      appBar: AppBar(title: const Text("你好Flutter")),
      body: const MyApp(),
    ),
  ));
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Container(
        alignment: Alignment.center,
        height: 200,
        width: 200,
        decoration: BoxDecoration(
          color: Colors.yellow,
          gradient: const LinearGradient(
            //LinearGradient 背景线性渐变 RadialGradient径向渐变
            colors: [Colors.red, Colors.orange],
          ),
          boxShadow: const [
            //卡片阴影
            BoxShadow(
              color: Colors.blue,
              offset: Offset(2.0, 2.0),
              blurRadius: 10.0,
            )
          ],
          border: Border.all(color: Colors.black, width: 1),
        ),
        transform: Matrix4.rotationZ(.2),
        child: const Text(
          "你好Flutter",
          style: TextStyle(fontSize: 20),
        ),
      ),
    );
  }
}
```

**示例代码03**：通过 Container 创建一个按钮

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(MaterialApp(
    home: Scaffold(
      appBar: AppBar(title: const Text("你好Flutter")),
      body: const MyApp(),
    ),
  ));
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Container(
        alignment: Alignment.center,
        height: 40,
        width: 200,
        decoration: BoxDecoration(
          color: Colors.blue,
          borderRadius: BorderRadius.circular(15),
        ),
        child: const Text(
          "按钮",
          style: TextStyle(fontSize: 20),
        ),
      ),
    );
  }
}
```

**示例代码04**：padding 和 margin

padding 是让容器和里面的元素有相应的间距，margin 是让容器和容器外部的其他容器有相应的间距。

```dart
Container(
  margin: EdgeInsets.all(20.0), //容器外补白
  color: Colors.orange,
  child: Text("Hello world!"),
),
Container(
  padding: EdgeInsets.all(20.0), //容器内补白
  color: Colors.orange,
  child: Text("Hello world!"),
),
```

---

## 九、Text 组件详解

`Text` 组件常用属性：

| 属性            | 功能                                                                     |
| --------------- | ------------------------------------------------------------------------ |
| textAlign       | 文本对齐方式（center 居中，left 左对齐，right 右对齐，justify 两端对齐） |
| textDirection   | 文本方向（ltr 从左至右，rtl 从右至左）                                   |
| overflow        | 文字超出屏幕之后的处理方式（clip 裁剪，fade 渐隐，ellipsis 省略号）      |
| textScaleFactor | 字体显示倍率                                                             |
| maxLines        | 文字显示最大行数                                                         |
| style           | 字体的样式设置                                                           |

**TextStyle** 的参数：

| 属性            | 功能                                                                             |
| --------------- | -------------------------------------------------------------------------------- |
| decoration      | 文字装饰线（none 没有线，lineThrough 删除线，overline 上划线，underline 下划线） |
| decorationColor | 文字装饰线颜色                                                                   |
| decorationStyle | 文字装饰线风格（dashed/dotted 虚线，double 两根线，solid 一根实线，wavy 波浪线） |
| wordSpacing     | 单词间隙（如果是负值，会让单词变得更紧凑）                                       |
| letterSpacing   | 字母间隙（如果是负值，会让字母变得更紧凑）                                       |
| fontStyle       | 文字样式（italic 斜体，normal 正常体）                                           |
| fontSize        | 文字大小                                                                         |
| color           | 文字颜色                                                                         |
| fontWeight      | 字体粗细（bold 粗体，normal 正常体）                                             |

> **提示**：更多参数可查阅 Flutter 官方文档中 TextStyle 类的说明。

示例代码：

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(MaterialApp(
    home: Scaffold(
      appBar: AppBar(title: const Text("你好Flutter")),
      body: const MyApp(),
    ),
  ));
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Container(
        alignment: Alignment.center,
        height: 200,
        width: 200,
        decoration: BoxDecoration(
          color: Colors.yellow,
          gradient: const LinearGradient(
            colors: [Colors.red, Colors.orange],
          ),
          boxShadow: const [
            BoxShadow(
              color: Colors.blue,
              offset: Offset(2.0, 2.0),
              blurRadius: 10.0,
            )
          ],
          border: Border.all(color: Colors.black, width: 1),
        ),
        transform: Matrix4.rotationZ(.2),
        child: const Text(
          '各位同学大家好我是主讲老师大地，各位同学大家好我是主讲老师大地',
          textAlign: TextAlign.left,
          overflow: TextOverflow.ellipsis,
          // overflow:TextOverflow.fade ,
          maxLines: 2,
          textScaleFactor: 1.8,
          style: TextStyle(
            fontSize: 16.0,
            color: Colors.black,
            // color:Color.fromARGB(a, r, g, b)
            fontWeight: FontWeight.w800,
            fontStyle: FontStyle.italic,
            decoration: TextDecoration.lineThrough,
            decorationColor: Colors.white,
            decorationStyle: TextDecorationStyle.dashed,
            letterSpacing: 5.0,
          ),
        ),
      ),
    );
  }
}
```

---

## 十、图片组件详解

### 10.1 图片组件介绍

Flutter 中，我们可以通过 **Image** 组件来加载并显示图片，Image 的数据源可以是 asset、文件、内存以及网络。这里主要讲两种：

- `Image.asset`：本地图片
- `Image.network`：远程图片

Image 组件的常用属性：

| 属性                   | 类型        | 说明                                                                                                                                                                                                                                                                                                                                                                      |
| ---------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| alignment              | Alignment   | 图片的对齐方式                                                                                                                                                                                                                                                                                                                                                            |
| color / colorBlendMode | —           | 设置图片的背景颜色，通常和 colorBlendMode 配合一起使用，这样可以让图片颜色和背景色混合                                                                                                                                                                                                                                                                                    |
| fit                    | BoxFit      | 控制图片的拉伸和挤压，根据父容器来定。`BoxFit.fill` 全图显示，图片被拉伸并充满父容器；`BoxFit.contain` 全图显示、保持原比例，可能会有空隙；`BoxFit.cover` 显示可能拉伸、可能裁切，充满整个容器且不变形；`BoxFit.fitWidth` 宽度充满（横向充满）；`BoxFit.fitHeight` 高度充满（竖向充满）；`BoxFit.scaleDown` 效果和 contain 差不多，但不允许显示超过源图片大小，可小不可大 |
| repeat                 | ImageRepeat | 平铺。`ImageRepeat.repeat` 横向和纵向都重复直到铺满整个画布；`ImageRepeat.repeatX` 横向重复、纵向不重复；`ImageRepeat.repeatY` 纵向重复、横向不重复                                                                                                                                                                                                                       |
| width                  | —           | 宽度，一般结合 ClipOval 才能看到效果                                                                                                                                                                                                                                                                                                                                      |
| height                 | —           | 高度，一般结合 ClipOval 才能看到效果                                                                                                                                                                                                                                                                                                                                      |

> **提示**：更多属性可查阅 Flutter 官方文档中 Image 类的说明。

### 10.2 加载远程图片

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(
    MaterialApp(
      home: Scaffold(
        appBar: AppBar(title: const Text("你好Flutter")),
        body: const MyApp(),
      ),
    ),
  );
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Container(
        width: 150,
        height: 150,
        decoration: const BoxDecoration(color: Colors.yellow),
        child: Image.network(
          "https://图片地址.png",
          fit: BoxFit.cover,
        ),
      ),
    );
  }
}
```

> **提示**：`Image.network` 中传入任意可访问的远程图片 URL 即可，配合 `fit: BoxFit.cover` 让图片填满容器。

### 10.3 Container 实现圆形图片

利用 `BoxDecoration` 的 `borderRadius`（半径取宽高的一半）加 `DecorationImage` 实现：

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(MaterialApp(
    home: Scaffold(
      appBar: AppBar(title: const Text("你好Flutter")),
      body: const MyApp(),
    ),
  ));
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Container(
        width: 150,
        height: 150,
        decoration: BoxDecoration(
          color: Colors.yellow,
          borderRadius: BorderRadius.circular(75),
          image: const DecorationImage(
            image: NetworkImage(
              "https://图片地址.png",
            ),
            fit: BoxFit.cover,
          ),
        ),
      ),
    );
  }
}
```

### 10.4 ClipOval 实现圆形图片

```dart
class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Center(
      child: ClipOval(
        child: Image.network(
          "https://图片地址.png",
          width: 150.0,
          height: 150.0,
          fit: BoxFit.cover,
        ),
      ),
    );
  }
}
```

### 10.5 CircleAvatar 实现圆形图片

`CircleAvatar` 通过 `radius` 属性设置圆形的半径：

```dart
const CircleAvatar(
  radius: 200,
  backgroundImage:
      NetworkImage("https://图片地址.png"),
)
```

基本上，CircleAvatar 不提供设置边框的属性，但可以将其包裹在一个具有更大半径和不同背景颜色的 CircleAvatar 中，以创建类似于边框的效果：

```dart
return const CircleAvatar(
  radius: 110,
  backgroundColor: Color(0xffFDCF09),
  child: CircleAvatar(
    radius: 100,
    backgroundImage:
        NetworkImage("https://图片地址.png"),
  ),
);
```

### 10.6 加载本地图片

1. 项目根目录新建 `images` 文件夹，images 中新建 `2.0x`、`3.0x` 等对应分辨率的子文件夹并放入图片。
2. 打开 `pubspec.yaml` 声明添加的图片资源。

```yaml
flutter:
  assets:
    - images/图片名称.png
```

> **提示**：编辑 pubspec.yaml 时一定要注意缩进空格，YAML 对缩进敏感。

3. 在代码中使用：

```dart
Image.asset(
  "images/图片名称.png",
  fit: BoxFit.cover,
)
```

---

## 十、图片组件（续）

本节承接上文：使用 `ClipOval` 组件配合 `Image.asset` 可以把图片裁剪成圆形（圆形头像的常见实现方式），需要同时指定宽高并让图片 `fit: BoxFit.cover` 填满。

```dart
class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return Center(
      child: ClipOval(
        child: Image.asset(
          "images/a.jpeg",
          width: 150.0,
          height: 150.0,
          fit: BoxFit.cover,
        ),
      ),
    );
  }
}
```

---

## 十一、图标组件

Flutter 内置了 Material Design 图标库，也可以借助第三方字体图标库（如阿里巴巴 iconfont）自定义图标。

### 11.1、使用Flutter官方Icons图标

Material Design 所有图标可以在其官网查看：https://material.io/tools/icons/

通过 `Icon` 组件直接使用 `Icons.xxx` 静态常量，可用 `color`、`size` 控制颜色与大小：

```dart
class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return Center(
      child: Column(
        children: const [
          Icon(Icons.search, color: Colors.red, size: 40),
          SizedBox(height: 10),
          Icon(Icons.home),
          SizedBox(height: 10),
          Icon(Icons.category),
          SizedBox(height: 10),
          Icon(Icons.shop),
          SizedBox(height: 10),
        ],
      ),
    );
  }
}
```

### 11.2、Flutter中借助阿里巴巴图标库自定义字体图标

我们也可以使用自定义字体图标。阿里巴巴图标库官网 iconfont.cn 上有很多字体图标素材，可以选择自己需要的图标打包下载，会生成不同格式的字体文件，在 Flutter 中使用 ttf 格式即可。

假设项目中需要使用一个书籍图标和微信图标，打包下载后按以下步骤导入：

**1. 导入字体图标文件**（和导入字体文件相同），假设字体图标文件保存在项目根目录下，路径为 `fonts/iconfont.ttf`，在 `pubspec.yaml` 中配置：

```yaml
fonts:
  - family: myIcon    # 指定一个字体名
    fonts:
      - asset: fonts/iconfont.ttf
```

也可以配置多个字体文件：

```yaml
fonts:
  - family: myIcon    # 指定一个字体名
    fonts:
      - asset: fonts/iconfont.ttf
  - family: alipayIcon    # 指定一个字体名
    fonts:
      - asset: fonts/iconfont2.ttf
```

**2. 定义一个 MyIcons 类**，功能和 Icons 类一样，将字体文件中的所有图标都定义成静态变量：

```dart
class MyIcons {
  // book 图标
  static const IconData book = IconData(
    0xe614,
    fontFamily: 'myIcon',
    matchTextDirection: true,
  );
  // 微信图标
  static const IconData wechat = IconData(
    0xec7d,
    fontFamily: 'myIcon',
    matchTextDirection: true,
  );
}
```

**3. 使用**：

```dart
Row(
  mainAxisAlignment: MainAxisAlignment.center,
  children: <Widget>[
    Icon(MyIcons.book, color: Colors.purple),
    Icon(MyIcons.wechat, color: Colors.green),
  ],
)
```

---

## 十二、Flutter 列表组件

列表布局是项目开发中最常用的布局方式。Flutter 中通过 `ListView` 定义列表项，支持垂直和水平方向展示，通过一个属性即可控制列表的显示方向。列表有以下分类：垂直列表、垂直图文列表、水平列表、动态列表。

列表组件常用参数：

| 名称              | 类型               | 说明                                                 |
| ----------------- | ------------------ | ---------------------------------------------------- |
| `scrollDirection` | Axis               | `Axis.horizontal` 水平列表，`Axis.vertical` 垂直列表 |
| `padding`         | EdgeInsetsGeometry | 内边距                                               |
| `resolve`         | bool               | 组件反向排序                                         |
| `children`        | List               | 列表元素                                             |

### 12.1、垂直列表

**示例1**：`ListView` 中放多个 `ListTile`，每个 `ListTile` 通过 `title` 设置标题：

```dart
class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return ListView(
      children: const <Widget>[
        ListTile(
          title: Text("我是一个标题"),
        ),
        ListTile(
          title: Text("我是一个标题"),
        ),
        ListTile(
          title: Text("我是一个标题"),
        ),
        ListTile(
          title: Text("我是一个标题"),
        ),
        ListTile(
          title: Text("我是一个标题"),
        ),
        ListTile(
          title: Text("我是一个标题"),
        ),
        ListTile(
          title: Text("我是一个标题"),
        ),
      ],
    );
  }
}
```

**示例2**：通过 `leading` 设置左侧图标、`Divider()` 添加分割线，实现类似"个人中心"的列表：

```dart
class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return ListView(
      children: const <Widget>[
        ListTile(
          leading: Icon(Icons.assignment, color: Colors.red),
          title: Text("全部订单"),
        ),
        Divider(),
        ListTile(
          leading: Icon(Icons.payment, color: Colors.green),
          title: Text("待付款"),
        ),
        Divider(),
        ListTile(
          leading: Icon(Icons.local_car_wash, color: Colors.orange),
          title: Text("待收货"),
        ),
        ListTile(
          leading: Icon(Icons.favorite, color: Colors.lightGreen),
          title: Text("我的收藏"),
        ),
        Divider(),
        ListTile(
          leading: Icon(Icons.people, color: Colors.black54),
          title: Text("在线客服"),
        ),
        Divider(),
      ],
    );
  }
}
```

### 12.2、垂直图文列表

**示例1**：`ListTile` 的 `leading` 放图片（图在左侧）、`title` 放标题、`subtitle` 放副标题；也可以把图片放到 `trailing`（图在右侧）：

```dart
class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return ListView(
      children: <Widget>[
        ListTile(
          leading: Image.network("https://www.itying.com/images/flutter/1.png"),
          title: const Text('华北黄淮高温雨今起强势登场'),
          subtitle: const Text("中国天气网讯 21日开始，华北黄淮高温雨今起强势登场"),
        ),
        const Divider(),
        ListTile(
          leading: Image.network("https://www.itying.com/images/flutter/2.png"),
          title: const Text('保监局50天开32罚单 "断供"违规资金为房市降温'),
          subtitle: const Text("中国天气网讯 保监局50天开32罚单 "断供"违规资金为房市降温"),
        ),
        const Divider(),
        ListTile(
          title: const Text('华北黄淮高温雨今起强势登场'),
          subtitle: const Text("中国天气网讯 21日开始，华北黄淮高温雨今起强势登场"),
          trailing: Image.network("https://www.itying.com/images/flutter/3.png"),
        ),
        const Divider(),
        ListTile(
          leading: Image.network("https://www.itying.com/images/flutter/4.png"),
          title: const Text('普京现身俄海军节阅兵：乘艇检阅军舰'),
        ),
        const Divider(),
        ListTile(
          leading: Image.network("https://www.itying.com/images/flutter/5.png"),
          title: const Text('鸿星尔克捐1个亿帮助困难残疾群体 网友：企业有担当'),
        ),
        const Divider(),
        ListTile(
          leading: Image.network("https://www.itying.com/images/flutter/6.png"),
          title: const Text('行业冥灯？老罗最好祈祷苹果的AR能成'),
        ),
      ],
    );
  }
}
```

**示例2**：不使用 `ListTile`，直接在 `ListView` 中排列 `Image` 与标题 `Container`，实现图文上下排列的列表；可通过 `padding` 给列表设置内边距：

```dart
class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return ListView(
      padding: const EdgeInsets.all(10),
      children: <Widget>[
        Image.network("https://www.itying.com/images/flutter/1.png"),
        Container(
          height: 44,
          padding: const EdgeInsets.fromLTRB(0, 10, 0, 10),
          child: const Text(
            '我是一个标题',
            textAlign: TextAlign.center,
            style: TextStyle(
              fontSize: 18,
            ),
          ),
        ),
        Image.network("https://www.itying.com/images/flutter/2.png"),
        Container(
          height: 44,
          padding: const EdgeInsets.fromLTRB(0, 10, 0, 10),
          child: const Text(
            '我是一个标题',
            textAlign: TextAlign.center,
            style: TextStyle(
              fontSize: 18,
            ),
          ),
        ),
        Image.network("https://www.itying.com/images/flutter/3.png"),
        Container(
          height: 44,
          padding: const EdgeInsets.fromLTRB(0, 10, 0, 10),
          child: const Text(
            '我是一个标题',
            textAlign: TextAlign.center,
            style: TextStyle(
              fontSize: 18,
            ),
          ),
        ),
        Image.network("https://www.itying.com/images/flutter/4.png"),
        Container(
          height: 44,
          padding: const EdgeInsets.fromLTRB(0, 10, 0, 10),
          child: const Text(
            '我是一个标题',
            textAlign: TextAlign.center,
            style: TextStyle(
              fontSize: 18,
            ),
          ),
        ),
        Image.network("https://www.itying.com/images/flutter/1.png"),
        Container(
          height: 44,
          padding: EdgeInsets.fromLTRB(0, 10, 0, 10),
          child: const Text(
            '我是一个标题',
            textAlign: TextAlign.center,
            style: TextStyle(
              fontSize: 18,
            ),
          ),
        ),
        Image.network("https://www.itying.com/images/flutter/2.png"),
        Container(
          height: 44,
          padding: EdgeInsets.fromLTRB(0, 10, 0, 10),
          child: const Text(
            '我是一个标题',
            textAlign: TextAlign.center,
            style: TextStyle(
              fontSize: 18,
            ),
          ),
        ),
        Image.network("https://www.itying.com/images/flutter/3.png"),
        Container(
          height: 44,
          padding: const EdgeInsets.fromLTRB(0, 10, 0, 10),
          child: const Text(
            '我是一个标题',
            textAlign: TextAlign.center,
            style: TextStyle(
              fontSize: 18,
            ),
          ),
        ),
        Image.network("https://www.itying.com/images/flutter/1.png"),
        Image.network("https://www.itying.com/images/flutter/2.png"),
        Image.network("https://www.itying.com/images/flutter/3.png"),
      ],
    );
  }
}
```

### 12.3、水平列表（可以左右滑动）

将 `scrollDirection` 设为 `Axis.horizontal` 即可实现水平列表；通常用 `SizedBox` 限定列表高度，子项通过 `Container` 设置宽度：

```dart
class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: 180,
      child: ListView(
        scrollDirection: Axis.horizontal,
        children: <Widget>[
          Container(
            width: 180.0,
            color: Colors.red,
          ),
          Container(
            width: 180.0,
            color: Colors.orange,
            child: Column(
              children: <Widget>[
                Image.network("https://www.itying.com/images/flutter/1.png"),
                const Text('我是一个文本'),
              ],
            ),
          ),
          Container(
            width: 180.0,
            color: Colors.blue,
          ),
          Container(
            width: 180.0,
            color: Colors.deepOrange,
          ),
          Container(
            width: 180.0,
            color: Colors.deepPurpleAccent,
          ),
        ],
      ),
    );
  }
}
```

### 12.4、ListView动态列表组件以及循环动态数据

**1. for循环实现动态列表**：在方法中通过 for 循环构建 `List<Widget>`，再传给 `ListView` 的 `children`：

```dart
import 'package:flutter/material.dart';
import './ityingFont.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: ThemeData(
        primarySwatch: Colors.yellow,
      ),
      home: Scaffold(
        appBar: AppBar(title: const Text("Flutter ICON")),
        body: const MyHomePage(),
      ),
    );
  }
}

class MyHomePage extends StatelessWidget {
  const MyHomePage({Key? key}) : super(key: key);

  List<Widget> _initListView() {
    List<Widget> list = [];
    for (var i = 0; i < 10; i++) {
      list.add(
        const ListTile(
          title: Text("我是一个列表"),
        ),
      );
    }
    return list;
  }

  @override
  Widget build(BuildContext context) {
    return ListView(
      children: _initListView(),
    );
  }
}
```

**2. ListView.builder实现动态列表**：通过 `itemCount` 与 `itemBuilder` 按索引生成列表项，适合数据量较大的场景：

```dart
import 'package:flutter/material.dart';
import './ityingFont.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: ThemeData(
        primarySwatch: Colors.yellow,
      ),
      home: Scaffold(
        appBar: AppBar(title: const Text("Flutter ICON")),
        body: MyHomePage(),
      ),
    );
  }
}

class MyHomePage extends StatelessWidget {
  List list = [];
  MyHomePage({Key? key}) : super(key: key) {
    for (var i = 0; i < 10; i++) {
      list.add("我是一个列表--$i");
    }
  }

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      itemCount: list.length,
      itemBuilder: (context, index) {
        return ListTile(
          title: Text("${list[index]}"),
        );
      },
    );
  }
}
```

> **提示**：`ListView.builder` 按需构建列表项，性能优于一次性把所有子组件塞进 `children`，是实际项目中最常用的动态列表写法。

---

## 十三、Flutter GridView网格布局组件

### 13.1、GridView网格布局组件介绍

GridView 网格布局在实际项目中用得也非常多，当我们想让可以滚动的元素以矩阵方式排列时，可以用网格列表组件 GridView 实现布局。

GridView 创建网格列表主要有三种方式：

1. 通过 `GridView.count` 实现网格布局
2. 通过 `GridView.extent` 实现网格布局
3. 通过 `GridView.builder` 实现动态网格布局

常用属性：

| 名称                 | 类型                                                                                 | 说明                                       |
| -------------------- | ------------------------------------------------------------------------------------ | ------------------------------------------ |
| `scrollDirection`    | Axis                                                                                 | 滚动方向                                   |
| `padding`            | EdgeInsetsGeometry                                                                   | 内边距                                     |
| `resolve`            | bool                                                                                 | 组件反向排序                               |
| `crossAxisSpacing`   | double                                                                               | 水平子Widget之间间距                       |
| `mainAxisSpacing`    | double                                                                               | 垂直子Widget之间间距                       |
| `crossAxisCount`     | int                                                                                  | 用在 GridView.count，一行的Widget数量      |
| `maxCrossAxisExtent` | double                                                                               | 用在 GridView.extent，横轴子元素的最大长度 |
| `childAspectRatio`   | double                                                                               | 子Widget宽高比例                           |
| `children`           | []                                                                                   | 子元素列表                                 |
| `gridDelegate`       | SliverGridDelegateWithFixedCrossAxisCount / SliverGridDelegateWithMaxCrossAxisExtent | 控制布局，主要用在 GridView.builder 里面   |

### 13.2、GridView.count 实现网格布局

`GridView.count` 构造函数内部使用了 `SliverGridDelegateWithFixedCrossAxisCount`，通过它可以快速创建横轴固定数量子元素的 GridView：

```dart
class HomePage extends StatelessWidget {
  const HomePage({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return GridView.count(
      crossAxisCount: 3,
      childAspectRatio: 1.0,
      children: const <Widget>[
        Icon(Icons.home),
        Icon(Icons.ac_unit),
        Icon(Icons.search),
        Icon(Icons.settings),
        Icon(Icons.airport_shuttle),
        Icon(Icons.all_inclusive),
        Icon(Icons.beach_access),
        Icon(Icons.cake),
        Icon(Icons.circle),
      ],
    );
  }
}
```

### 13.3、GridView.extent实现网格布局

`GridView.extent` 构造函数内部使用了 `SliverGridDelegateWithMaxCrossAxisExtent`，通过它可以快速创建横轴子元素为固定最大长度的 GridView：

```dart
class HomePage extends StatelessWidget {
  const HomePage({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return GridView.extent(
      maxCrossAxisExtent: 80.0,
      childAspectRatio: 1.0,
      children: const <Widget>[
        Icon(Icons.home),
        Icon(Icons.ac_unit),
        Icon(Icons.search),
        Icon(Icons.settings),
        Icon(Icons.airport_shuttle),
        Icon(Icons.all_inclusive),
        Icon(Icons.beach_access),
        Icon(Icons.cake),
        Icon(Icons.circle),
      ],
    );
  }
}
```

### 13.4、GridView.count 和 GridView.extent属性详解

```dart
class HomePage extends StatelessWidget {
  const HomePage({Key? key}) : super(key: key);
  List<Widget> _getListData() {
    List<Widget> list = [];
    for (var i = 0; i < 20; i++) {
      list.add(Container(
        alignment: Alignment.center,
        color: Colors.blue,
        child: Text(
          '这是第$i条数据',
          style: const TextStyle(color: Colors.white, fontSize: 20),
        ),
        // height: 400, // 设置高度没有反应
      ));
    }
    return list;
  }

  @override
  Widget build(BuildContext context) {
    return GridView.count(
      crossAxisSpacing: 20.0, // 水平子 Widget 之间间距
      mainAxisSpacing: 20.0,  // 垂直子 Widget 之间间距
      padding: const EdgeInsets.all(10),
      crossAxisCount: 2,      // 一行的 Widget 数量
      childAspectRatio: 0.8,  // 宽度和高度的比例
      children: _getListData(),
    );
  }
}
```

> **提示**：在 GridView 的子 Container 上直接设置 `height` 不起作用，子元素的大小由 `crossAxisCount` 与 `childAspectRatio` 共同决定。

### 13.5、GridView.count 实现动态列表

配合外部数据源（`res/listData.dart`）循环生成带边框的图文卡片：

```dart
import 'package:flutter/material.dart';
import 'res/listData.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: Scaffold(
        appBar: AppBar(title: const Text("FLutter App")),
        body: const HomePage(),
      ),
    );
  }
}

class HomePage extends StatelessWidget {
  const HomePage({Key? key}) : super(key: key);

  List<Widget> _getListData() {
    var tempList = listData.map((value) {
      return Container(
        decoration: BoxDecoration(
          border: Border.all(
            color: const Color.fromRGBO(233, 233, 233, 0.9),
            width: 1,
          ),
        ),
        child: Column(
          children: <Widget>[
            Image.network(value['imageUrl']),
            const SizedBox(height: 12),
            Text(
              value['title'],
              textAlign: TextAlign.center,
              style: const TextStyle(fontSize: 20),
            ),
          ],
        ),
      );
    });
    return tempList.toList();
  }

  @override
  Widget build(BuildContext context) {
    return GridView.count(
      crossAxisSpacing: 10.0, // 水平子 Widget 之间间距
      mainAxisSpacing: 10.0,  // 垂直子 Widget 之间间距
      padding: const EdgeInsets.all(10),
      crossAxisCount: 2,      // 一行的 Widget 数量
      // childAspectRatio: 0.7, // 宽度和高度的比例
      children: _getListData(),
    );
  }
}
```

### 13.6、GridView.builder实现动态列表

**使用 SliverGridDelegateWithFixedCrossAxisCount**：

```dart
import 'package:flutter/material.dart';
import 'res/listData.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: Scaffold(
        appBar: AppBar(title: const Text("FLutter App")),
        body: const HomePage(),
      ),
    );
  }
}

class HomePage extends StatelessWidget {
  const HomePage({Key? key}) : super(key: key);

  Widget _getListData(context, index) {
    return Container(
      decoration: BoxDecoration(
        border: Border.all(
          color: const Color.fromRGBO(233, 233, 233, 0.9), width: 1,
        ),
      ),
      child: Column(
        children: <Widget>[
          Image.network(listData[index]['imageUrl']),
          const SizedBox(height: 12),
          Text(
            listData[index]['title'],
            textAlign: TextAlign.center,
            style: const TextStyle(fontSize: 20),
          ),
        ],
      ),
      // height: 400, // 设置高度没有反应
    );
  }

  @override
  Widget build(BuildContext context) {
    return GridView.builder(
      // 注意
      gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisSpacing: 10.0, // 水平子 Widget 之间间距
        mainAxisSpacing: 10.0,  // 垂直子 Widget 之间间距
        crossAxisCount: 2,      // 一行的 Widget 数量
      ),
      itemCount: listData.length,
      itemBuilder: _getListData,
    );
  }
}
```

**使用 SliverGridDelegateWithMaxCrossAxisExtent**：

```dart
import 'package:flutter/material.dart';
import 'res/listData.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: Scaffold(
        appBar: AppBar(title: const Text("FLutter App")),
        body: const HomePage(),
      ),
    );
  }
}

class HomePage extends StatelessWidget {
  const HomePage({Key? key}) : super(key: key);

  Widget _getListData(context, index) {
    return Container(
      decoration: BoxDecoration(
        border: Border.all(
          color: const Color.fromRGBO(233, 233, 233, 0.9), width: 1,
        ),
      ),
      child: Column(
        children: <Widget>[
          Image.network(listData[index]['imageUrl']),
          const SizedBox(height: 12),
          Text(
            listData[index]['title'],
            textAlign: TextAlign.center,
            style: const TextStyle(fontSize: 20),
          ),
        ],
      ),
      // height: 400, // 设置高度没有反应
    );
  }

  @override
  Widget build(BuildContext context) {
    return GridView.builder(
      // 注意
      gridDelegate: const SliverGridDelegateWithMaxCrossAxisExtent(
        crossAxisSpacing: 10,
        mainAxisSpacing: 10,
        maxCrossAxisExtent: 300,
      ),
      itemCount: listData.length,
      itemBuilder: _getListData,
    );
  }
}
```

> **提示**：`GridView.builder` 必须通过 `gridDelegate` 传入布局代理：固定列数用 `SliverGridDelegateWithFixedCrossAxisCount`，按子元素最大宽度自适应用 `SliverGridDelegateWithMaxCrossAxisExtent`。

---

## 十四、Flutter Padding组件

在 HTML 中常见的布局标签都有 padding 属性，但 Flutter 中很多 Widget 是没有 padding 属性的，这时可以用 Padding 组件处理容器与子元素之间的间距。

| 属性      | 说明                                |
| --------- | ----------------------------------- |
| `padding` | padding 值，EdgeInsets 设置填充的值 |
| `child`   | 子组件                              |

示例：在 GridView 中用 `Padding` 包裹每张图片，让图片之间产生间距：

```dart
class HomePage extends StatelessWidget {
  const HomePage({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return GridView.count(
      // padding: const EdgeInsets.all(10),
      crossAxisCount: 2,
      childAspectRatio: 1,
      children: [
        Padding(
          padding: const EdgeInsets.all(10),
          child: Image.network(
            'https://www.itying.com/images/flutter/1.png',
            fit: BoxFit.cover,
          ),
        ),
        Padding(
          padding: const EdgeInsets.all(10),
          child: Image.network(
            'https://www.itying.com/images/flutter/2.png',
            fit: BoxFit.cover,
          ),
        ),
        Padding(
          padding: const EdgeInsets.all(10),
          child: Image.network(
            'https://www.itying.com/images/flutter/3.png',
            fit: BoxFit.cover,
          ),
        ),
        Padding(
          padding: const EdgeInsets.all(10),
          child: Image.network(
            'https://www.itying.com/images/flutter/4.png',
            fit: BoxFit.cover,
          ),
        ),
        Padding(
          padding: const EdgeInsets.all(10),
          child: Image.network(
            'https://www.itying.com/images/flutter/5.png',
            fit: BoxFit.cover,
          ),
        ),
        Padding(
          padding: const EdgeInsets.all(10),
          child: Image.network(
            'https://www.itying.com/images/flutter/6.png',
            fit: BoxFit.cover,
          ),
        ),
      ],
    );
  }
}
```

---

## 十四、线性布局（Row和Column）

（原文编号即为第二个"十四"，此处保留原编号。）

线性布局沿水平或垂直方向排列子组件：`Row` 用于水平排列，`Column` 用于垂直排列。

### 14.1、Row 水平布局组件

| 属性                 | 说明           |
| -------------------- | -------------- |
| `mainAxisAlignment`  | 主轴的排序方式 |
| `crossAxisAlignment` | 次轴的排序方式 |
| `children`           | 组件子元素     |

示例：`Row` 中排列三个自定义 `IconContainer`，通过 `mainAxisAlignment: MainAxisAlignment.spaceEvenly` 让子元素沿主轴均匀分布：

```dart
class HomePage extends StatelessWidget {
  const HomePage({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return Container(
      height: double.infinity,
      width: double.infinity,
      color: Colors.black26,
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.center,
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        children: [
          IconContainer(Icons.home, color: Colors.red),
          IconContainer(Icons.search, color: Colors.blue),
          IconContainer(Icons.send, color: Colors.orange),
        ],
      ),
    );
  }
}

class IconContainer extends StatelessWidget {
  Color color;
  double size;
  IconData icon;
  IconContainer(this.icon,
      {Key? key, this.color = Colors.red, this.size = 32.0})
      : super(key: key);
  @override
  Widget build(BuildContext context) {
    return Container(
      height: 100.0,
      width: 100.0,
      color: color,
      child: Center(child: Icon(icon, size: size, color: Colors.white)),
    );
  }
}
```

### 14.2、Column垂直布局组件

| 属性                 | 说明           |
| -------------------- | -------------- |
| `mainAxisAlignment`  | 主轴的排序方式 |
| `crossAxisAlignment` | 次轴的排序方式 |
| `children`           | 组件子元素     |

`Column` 的用法与 `Row` 一致，只是排列方向变为垂直：

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: Scaffold(
        appBar: AppBar(title: const Text("Flutter App")),
        body: const HomePage(),
      ),
    );
  }
}

class HomePage extends StatelessWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      height: double.infinity,
      width: double.infinity,
      color: Colors.black26,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        children: [
          IconContainer(Icons.home, color: Colors.red),
          IconContainer(Icons.search, color: Colors.blue),
          IconContainer(Icons.send, color: Colors.orange),
        ],
      ),
    );
  }
}

class IconContainer extends StatelessWidget {
  Color color;
  double size;
  IconData icon;
  IconContainer(this.icon,
      {Key? key, this.color = Colors.red, this.size = 32.0})
      : super(key: key);
  @override
  Widget build(BuildContext context) {
    return Container(
      height: 100.0,
      width: 100.0,
      color: color,
      child: Center(child: Icon(icon, size: size, color: Colors.white)),
    );
  }
}
```

### 14.3、double.infinity 和double.maxFinite

`double.infinity` 和 `double.maxFinite` 可以让当前元素的 width 或 height 达到父元素的尺寸。

底层代码：

```dart
static const double nan = 0.0 / 0.0;
static const double infinity = 1.0 / 0.0;
static const double negativeInfinity = -infinity;
static const double minPositive = 5e-324;
static const double maxFinite = 1.7976931348623157e+308;
```

如下可以让 Container 铺满整个屏幕：

```dart
Widget build(BuildContext context) {
  return Container(
    height: double.infinity,
    width: double.infinity,
    color: Colors.black26,
    child: Column(
      crossAxisAlignment: CrossAxisAlignment.center,
      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
      children: [
        IconContainer(Icons.home, color: Colors.red),
        IconContainer(Icons.search, color: Colors.blue),
        IconContainer(Icons.send, color: Colors.orange),
      ],
    ),
  );
}
```

如下可以让 Container 的宽度和高度等于父元素的宽度高度：

```dart
class HomePage extends StatelessWidget {
  const HomePage({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return Container(
      height: 400,
      width: 600,
      color: Colors.red,
      child: Container(
        height: double.maxFinite,
        width: double.infinity,
        color: Colors.black26,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: [
            IconContainer(Icons.home, color: Colors.red),
            IconContainer(Icons.search, color: Colors.blue),
            IconContainer(Icons.send, color: Colors.orange),
          ],
        ),
      ),
    );
  }
}
```

---

## 十五、弹性布局（Flex、Expanded）

Flex 组件可以沿着水平或垂直方向排列子组件。如果已知主轴方向，使用 `Row` 或 `Column` 会方便一些——因为 `Row` 和 `Column` 都继承自 Flex，参数基本相同，能用 Flex 的地方基本上都可以使用 Row 或 Column。Flex 本身功能很强大，它也可以和 `Expanded` 组件配合实现弹性布局。

### 15.1、水平弹性布局

`Flex` 配合 `direction: Axis.horizontal`，子组件用 `Expanded` 按 `flex` 比例分配空间（2:1）：

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: Scaffold(
        appBar: AppBar(title: const Text("Flutter App")),
        body: const HomePage(),
      ),
    );
  }
}

class HomePage extends StatelessWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Flex(
      direction: Axis.horizontal,
      children: [
        Expanded(flex: 2, child: IconContainer(Icons.home, color: Colors.red)),
        Expanded(
          flex: 1,
          child: IconContainer(Icons.search, color: Colors.orange),
        ),
      ],
    );
  }
}

class IconContainer extends StatelessWidget {
  Color color;
  double size;
  IconData icon;
  IconContainer(this.icon,
      {Key? key, this.color = Colors.red, this.size = 32.0})
      : super(key: key);
  @override
  Widget build(BuildContext context) {
    return Container(
      height: 100.0,
      width: 100.0,
      color: color,
      child: Center(child: Icon(icon, size: size, color: Colors.white)),
    );
  }
}
```

`Row` 结合 `Expanded` 可以达到相同的效果：

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: Scaffold(
        appBar: AppBar(title: const Text("Flutter App")),
        body: const HomePage(),
      ),
    );
  }
}

class HomePage extends StatelessWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Expanded(flex: 2, child: IconContainer(Icons.home, color: Colors.red)),
        Expanded(
          flex: 1,
          child: IconContainer(Icons.search, color: Colors.orange),
        ),
      ],
    );
  }
}

class IconContainer extends StatelessWidget {
  Color color;
  double size;
  IconData icon;
  IconContainer(this.icon,
      {Key? key, this.color = Colors.red, this.size = 32.0})
      : super(key: key);
  @override
  Widget build(BuildContext context) {
    return Container(
      height: 100.0,
      width: 100.0,
      color: color,
      child: Center(child: Icon(icon, size: size, color: Colors.white)),
    );
  }
}
```

### 15.2、垂直弹性布局

把方向改为垂直，用 `Column` 结合 `Expanded` 实现按比例分配的纵向弹性布局：

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: Scaffold(
        appBar: AppBar(title: const Text("Flutter App")),
        body: const HomePage(),
      ),
    );
  }
}

class HomePage extends StatelessWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Expanded(flex: 2, child: IconContainer(Icons.home, color: Colors.red)),
        Expanded(
          flex: 1,
          child: IconContainer(Icons.search, color: Colors.orange),
        ),
      ],
    );
  }
}

class IconContainer extends StatelessWidget {
  Color color;
  double size;
  IconData icon;
  IconContainer(this.icon,
      {Key? key, this.color = Colors.red, this.size = 32.0})
      : super(key: key);
  @override
  Widget build(BuildContext context) {
    return Container(
      height: 100.0,
      width: 100.0,
      color: color,
      child: Center(child: Icon(icon, size: size, color: Colors.white)),
    );
  }
}
```

### 15.3、使用Row或Column结合Expanded实现弹性布局

原文该小节标题为「15.2、使用 Row 或 Column 结合Expanded实现下面示例」，此处延续上节编号。`Row`、`Column` 与 `Flex` 都可以配合 `Expanded`，按 `flex` 权重对剩余空间进行分配。原文中的示例代码在本分块末尾被截断（仅有 `main` 函数开头），完整写法可参考上文 15.1、15.2 的 `Row`/`Column` + `Expanded` 示例。

---

> 本分块承接上一章列表布局的完整页面示例（LoginPage 部分图片布局），先给出剩余代码。

```dart
class HomePage extends StatelessWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ListView(
      children: [
        Container(
          width: double.infinity,
          height: 200,
          color: Colors.black,
        ),
        const SizedBox(height: 10),
        Row(
          children: [
            Expanded(
              flex: 2,
              child: SizedBox(
                height: 180,
                child: Image.network(
                  "https://www.itying.com/images/flutter/2.png",
                  fit: BoxFit.cover),
              ),
            ),
            const SizedBox(width: 10),
            Expanded(
              flex: 1,
              child: SizedBox(
                height: 180,
                child: Column(
                  children: [
                    Expanded(
                      flex: 1,
                      child: SizedBox(
                        width: double.infinity,
                        child: Image.network(
                          "https://www.itying.com/images/flutter/3.png",
                          fit: BoxFit.cover),
                      ),
                    ),
                    const SizedBox(height: 10),
                    Expanded(
                      flex: 2,
                      child: SizedBox(
                        width: double.infinity,
                        child: Image.network(
                          "https://www.itying.com/images/flutter/4.png",
                          fit: BoxFit.cover),
                      ),
                    )
                  ],
                ),
              ),
            )
          ],
        )
      ],
    );
  }
}
```

---

## 十六、层叠布局（Stack、Align、Positioned）

Stack 表示"堆"的意思，可以用 `Stack`、`Stack` 结合 `Align`、或 `Stack` 结合 `Positioned` 来实现页面的定位布局。

### 16.1、Flutter Stack 组件

| 属性        | 说明                     |
| ----------- | ------------------------ |
| `alignment` | 配置所有子元素的显示位置 |
| `children`  | 子组件                   |

```dart
class HomePage extends StatelessWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Stack(
        alignment: Alignment.topLeft,
        children: <Widget>[
          Container(
            height: 400,
            width: 300,
            color: Colors.red,
          ),
          const Text('我是一个文本',
              style: TextStyle(fontSize: 40, color: Colors.white))
        ],
      ),
    );
  }
}
```

### 16.2、Flutter Stack Align

`Align` 组件可以调整子组件的位置，Stack 中结合 Align 组件可以单独控制每个子元素的显示位置。

| 属性        | 说明                 |
| ----------- | -------------------- |
| `alignment` | 配置子元素的显示位置 |
| `child`     | 子组件               |

#### 1. Align 结合 Container 的使用

FlutterLogo 是 Flutter SDK 提供的一个组件，内容就是 Flutter 的 Logo。下面的例子将 Logo 对齐到容器的右上角：

```dart
class HomePage extends StatelessWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 120.0,
      width: 120.0,
      color: Colors.blue.shade50,
      child: const Align(
        alignment: Alignment.topRight,
        child: FlutterLogo(
          size: 60,
        ),
      ),
    );
  }
}
```

#### 2. Align 结合 Alignment 参数

`Alignment` 以矩形中心点为坐标原点，即 `Alignment(0.0, 0.0)`。x、y 的值从 -1 到 1，分别代表矩形左边到右边、顶部到底部的距离，2 个水平（或垂直）单位等于矩形的宽（或高）。例如：

- `Alignment(-1.0, -1.0)`：左侧顶点
- `Alignment(1.0, 1.0)`：右侧底部终点
- `Alignment(1.0, -1.0)`：右侧顶点，即 `Alignment.topRight`

矩形的原点、四个顶点及四条边的终点在 Alignment 类中都已定义为静态常量。

坐标转换公式（将 Alignment 坐标转为子元素的具体偏移坐标）：

```
(Alignment.x * childWidth / 2 + childWidth / 2,
 Alignment.y * childHeight / 2 + childHeight / 2)
```

其中 `childWidth`、`childHeight` 为子元素的宽高。将 `Alignment(2, 0.0)` 带入公式（容器 120×120）：`(2*120/2+120/2, 0*120/2+120/2)`，可得 FlutterLogo 的实际偏移坐标为 `(180, 60)`。

```dart
class HomePage extends StatelessWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 120.0,
      width: 120.0,
      color: Colors.blue.shade50,
      child: const Align(
        alignment: Alignment(2, 0.0),
        child: FlutterLogo(
          size: 60,
        ),
      ),
    );
  }
}
```

#### 3. Center 与 Align 的关系

Center 继承自 Align，只是少了一个 `alignment` 参数。Align 构造函数中 `alignment` 默认为 `Alignment.center`，所以可以认为 Center 组件就是对齐方式确定为居中的 Align。

#### 4. Align 结合 Stack 组件

Stack 中可以用多个 Align 分别控制每个图标的位置：

```dart
class HomePage extends StatelessWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Container(
        height: 400,
        width: 300,
        color: Colors.red,
        child: Stack(
          // alignment: Alignment.center,
          children: const <Widget>[
            Align(
              alignment: Alignment(1, -0.2),
              child: Icon(Icons.home, size: 40, color: Colors.white),
            ),
            Align(
              alignment: Alignment.center,
              child: Icon(Icons.search, size: 30, color: Colors.white),
            ),
            Align(
              alignment: Alignment.bottomRight,
              child: Icon(Icons.settings_applications, size: 30,
                  color: Colors.white),
            )
          ],
        ),
      ),
    );
  }
}
```

### 16.3、Flutter Stack Positioned

Stack 中结合 `Positioned` 组件也可以控制每个子元素的显示位置。

| 属性     | 说明                                                             |
| -------- | ---------------------------------------------------------------- |
| `top`    | 子元素距离顶部的距离                                             |
| `bottom` | 子元素距离底部的距离                                             |
| `left`   | 子元素距离左侧的距离                                             |
| `right`  | 子元素距离右侧的距离                                             |
| `child`  | 子组件                                                           |
| `width`  | 组件的宽度（注意：宽高必须是固定值，不能使用 `double.infinity`） |
| `height` | 组件的高度                                                       |

```dart
class HomePage extends StatelessWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Container(
        height: 400,
        width: 300,
        color: Colors.red,
        child: Stack(
          // alignment: Alignment.center,
          children: const <Widget>[
            Positioned(
              left: 10,
              child: Icon(Icons.home, size: 40, color: Colors.white),
            ),
            Positioned(
              bottom: 0,
              left: 100,
              child: Icon(Icons.search, size: 30, color: Colors.white),
            ),
            Positioned(
              right: 0,
              child: Icon(Icons.settings_applications, size: 30,
                  color: Colors.white),
            )
          ],
        ),
      ),
    );
  }
}
```

### 16.4、Flutter MediaQuery 获取屏幕宽度和高度

在组件的 `build` 方法中可以通过 `MediaQuery.of(context).size` 获取屏幕尺寸：

```dart
Widget build(BuildContext context) {
  final size = MediaQuery.of(context).size;
  final width = size.width;
  final height = size.height;
}
```

### 16.5、Stack + Positioned 固定导航案例

用 `Stack` 叠放一个可滚动的 ListView 和一个 `Positioned` 固定在顶部的导航栏，实现"固定头部 + 滚动内容"的效果：

```dart
class HomePage extends StatelessWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final size = MediaQuery.of(context).size;
    return Stack(
      children: [
        ListView(
          padding: const EdgeInsets.only(top: 45),
          children: const [
            ListTile(
              title: Text("这是一个标题"),
            ),
            ListTile(
              title: Text("这是一个标题"),
            ),
            ListTile(
              title: Text("这是一个标题"),
            ),
            ListTile(
              title: Text("这是一个标题"),
            ),
            ListTile(
              title: Text("这是一个标题"),
            ),
            ListTile(
              title: Text("这是一个标题"),
            ),
            ListTile(
              title: Text("这是一个标题"),
            ),
            ListTile(
              title: Text("这是一个标题"),
            ),
            ListTile(
              title: Text("这是一个标题"),
            ),
            ListTile(
              title: Text("这是一个标题"),
            ),
            ListTile(
              title: Text("这是一个标题"),
            ),
            ListTile(
              title: Text("这是一个标题"),
            ),
            ListTile(
              title: Text("这是一个标题"),
            ),
            ListTile(
              title: Text("这是一个标题"),
            ),
            ListTile(
              title: Text("这是一个标题"),
            ),
            ListTile(
              title: Text("这是一个标题"),
            ),
            ListTile(
              title: Text("这是一个标题"),
            ),
            ListTile(
              title: Text("这是一个标题"),
            ),
            ListTile(
              title: Text("这是一个标题"),
            ),
            ListTile(
              title: Text("这是一个标题"),
            ),
            ListTile(
              title: Text("这是一个标题"),
            ),
            ListTile(
              title: Text("这是一个标题"),
            ),
            ListTile(
              title: Text("这是一个标题"),
            ),
          ],
        ),
        Positioned(
          top: 0,
          left: 0,
          height: 40,
          width: size.width,
          child: Container(
            alignment: Alignment.center,
            color: Colors.black,
            child: const Text(
              "你好Flutter",
              style: TextStyle(color: Colors.white),
            ),
          ),
        )
      ],
    );
  }
}
```

---

## 十七、Flutter AspectRatio

`AspectRatio` 的作用是根据设置的比率调整子元素 child 的宽高比。

- AspectRatio 首先会在布局限制条件允许的范围内尽可能扩展，widget 的高度由宽度和比率决定，类似于 `BoxFit` 中的 contain，按照固定比率尽量占满区域。
- 如果在满足所有限制条件后无法找到可行的尺寸，AspectRatio 会优先适应布局限制条件，而忽略所设置的比率。

| 属性          | 说明                                                                                             |
| ------------- | ------------------------------------------------------------------------------------------------ |
| `aspectRatio` | 宽高比，最终可能不会严格按这个值布局，要看综合因素——外层是否允许按这种比率布局，这只是一个参考值 |
| `child`       | 子组件                                                                                           |

```dart
class HomePage extends StatelessWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 200,
      color: Colors.yellow,
      child: AspectRatio(
        aspectRatio: 2.0 / 1.0,
        child: Container(
          color: Colors.red,
        ),
      ),
    );
  }
}

class LayoutDemo extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return AspectRatio(
      aspectRatio: 3.0 / 1.0,
      child: Container(
        color: Colors.red,
      ),
    );
  }
}
```

---

## 十八、Flutter Card 组件

Card 是卡片组件块，内容可以由大多数类型的 Widget 构成，Card 具有圆角和阴影，有立体感。

| 属性           | 说明                                                                                                                                                                                    |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `margin`       | 外边距                                                                                                                                                                                  |
| `child`        | 子组件                                                                                                                                                                                  |
| `elevation`    | 阴影值的深度                                                                                                                                                                            |
| `color`        | 背景颜色                                                                                                                                                                                |
| `shadowColor`  | 阴影颜色                                                                                                                                                                                |
| `clipBehavior` | 内容溢出的裁剪方式：`Clip.none` 不裁剪；`Clip.hardEdge` 裁剪但不应用抗锯齿；`Clip.antiAlias` 裁剪且抗锯齿；`Clip.antiAliasWithSaveLayer` 带抗锯齿的裁剪，并在裁剪之后立即保存 saveLayer |
| `shape`        | 卡片的形状，默认阴影效果为圆角的长方形边，例如：`shape: const RoundedRectangleBorder(borderRadius: BorderRadius.all(Radius.circular(10)))`                                              |

### 18.1、Card 实现一个通讯录的卡片

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: Scaffold(
        appBar: AppBar(title: const Text("Flutter App")),
        body: const LayoutDemo(),
      ),
    );
  }
}

class LayoutDemo extends StatelessWidget {
  const LayoutDemo({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ListView(
      children: <Widget>[
        Card(
          shape: const RoundedRectangleBorder(
              borderRadius: BorderRadius.all(Radius.circular(10))),
          elevation: 20,
          margin: const EdgeInsets.all(10),
          child: Column(
            children: const <Widget>[
              ListTile(
                title: Text("张三", style: TextStyle(fontSize: 28)),
                subtitle: Text("高级软件工程师"),
              ),
              Divider(),
              ListTile(
                title: Text("电话：1213214142"),
              ),
              ListTile(title: Text("地址：北京市海淀区"))
            ],
          ),
        ),
        Card(
          shape: const RoundedRectangleBorder(
              borderRadius: BorderRadius.all(Radius.circular(10))),
          // color: Colors.red,
          elevation: 20,
          margin: const EdgeInsets.all(10),
          child: Column(
            children: const <Widget>[
              ListTile(
                title: Text("李四", style: TextStyle(fontSize: 28)),
                subtitle: Text("高级软件工程师"),
              ),
              Divider(),
              ListTile(
                title: Text("电话：1213214142"),
              ),
              ListTile(title: Text("地址：北京市海淀区"))
            ],
          ),
        )
      ],
    );
  }
}
```

### 18.2、Card 实现一个图文列表卡片

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: Scaffold(
        appBar: AppBar(title: const Text("Flutter App")),
        body: const LayoutDemo(),
      ),
    );
  }
}

class LayoutDemo extends StatelessWidget {
  const LayoutDemo({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ListView(
      children: <Widget>[
        Card(
          elevation: 20,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(10),
          ),
          margin: const EdgeInsets.all(10),
          child: Column(
            children: <Widget>[
              AspectRatio(
                aspectRatio: 20 / 9,
                child: Image.network(
                  "https://www.itying.com/images/flutter/2.png",
                  fit: BoxFit.cover,
                ),
              ),
              ListTile(
                leading: ClipOval(
                  child: Image.network(
                    "https://www.itying.com/images/flutter/2.png",
                    fit: BoxFit.cover,
                    height: 60,
                    width: 60,
                  ),
                ),
                title: const Text("xxxx"),
                subtitle: const Text("xxxxxxx"),
              )
            ],
          ),
        ),
        Card(
          elevation: 20,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(10),
          ),
          margin: const EdgeInsets.all(10),
          child: Column(
            children: <Widget>[
              AspectRatio(
                aspectRatio: 20 / 9,
                child: Image.network(
                  "https://www.itying.com/images/flutter/3.png",
                  fit: BoxFit.cover,
                ),
              ),
              const ListTile(
                leading: CircleAvatar(
                  backgroundImage: NetworkImage(
                      'https://www.itying.com/images/flutter/3.png'),
                ),
                title: Text("xxxxxxxx"),
                subtitle: Text("xxxxxxxxxx"),
              )
            ],
          ),
        )
      ],
    );
  }
}
```

### 18.3、CircleAvatar 实现一个圆形图片

| 属性              | 说明           |
| ----------------- | -------------- |
| `radius`          | 圆形组件的半径 |
| `backgroundImage` | 背景图片       |

```dart
const CircleAvatar(
  radius: 200,
  backgroundImage:
      NetworkImage("https://www.itying.com/images/flutter/3.png"),
)
```

> **提示**：CircleAvatar 本身不提供设置边框的属性。可以将其包裹在一个半径更大、背景颜色不同的 CircleAvatar 中，以创建类似于边框的效果。

```dart
return const CircleAvatar(
  radius: 110,
  backgroundColor: Color(0xffFDCF09),
  child: CircleAvatar(
    radius: 100,
    backgroundImage:
        NetworkImage("https://www.itying.com/images/flutter/3.png"),
  ),
);
```

---

## 十九、Flutter 按钮组件

### 19.1、按钮组件的属性

| 属性        | 说明                                                                                     |
| ----------- | ---------------------------------------------------------------------------------------- |
| `onPressed` | 必填参数，按下按钮时触发的回调，接收一个方法；传 `null` 表示按钮禁用，会显示禁用相关样式 |
| `child`     | 子组件                                                                                   |
| `style`     | 通过 `ButtonStyle` 装饰                                                                  |

ButtonStyle 里常用的参数：

| 属性名称          | 值类型 | 属性值                                                                                                              |
| ----------------- | ------ | ------------------------------------------------------------------------------------------------------------------- |
| `foregroundColor` | Color  | 文本颜色                                                                                                            |
| `backgroundColor` | Color  | 按钮的颜色                                                                                                          |
| `shadowColor`     | Color  | 阴影颜色                                                                                                            |
| `elevation`       | double | 阴影的范围，值越大阴影范围越大                                                                                      |
| `padding`         | -      | 内边距                                                                                                              |
| `shape`           | -      | 设置按钮的形状：`shape: MaterialStateProperty.all(RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)))` |
| `side`            | -      | 设置边框：`MaterialStateProperty.all(BorderSide(width: 1, color: Colors.red))`                                      |

### 19.2、ElevatedButton

ElevatedButton 即"凸起"按钮，默认带有阴影和灰色背景，按下后阴影会变大。

```dart
ElevatedButton(
  onPressed: () {},
  child: const Text("普通按钮")
)
```

### 19.3、TextButton

TextButton 即文本按钮，默认背景透明并不带阴影，按下后会有背景色。

```dart
TextButton(
  child: const Text("文本按钮"),
  onPressed: () {},
)
```

### 19.4、OutlinedButton

OutlinedButton 默认有一个边框，不带阴影且背景透明。按下后边框颜色会变亮，同时出现背景和阴影。

```dart
OutlinedButton(
  child: const Text("边框按钮"),
  onPressed: () {},
)
```

### 19.5、IconButton

IconButton 是一个可点击的 Icon，不包括文字，默认没有背景，点击后会出现背景。

```dart
IconButton(
  icon: const Icon(Icons.thumb_up),
  onPressed: () {},
)
```

### 19.6、带图标的按钮

ElevatedButton、TextButton、OutlinedButton 都有一个 `.icon` 构造函数，通过它可以轻松创建带图标的按钮。

```dart
ElevatedButton.icon(
  icon: const Icon(Icons.send),
  label: const Text("发送"),
  onPressed: _onPressed,
),
OutlinedButton.icon(
  icon: const Icon(Icons.add),
  label: const Text("添加"),
  onPressed: _onPressed,
),
TextButton.icon(
  icon: const Icon(Icons.info),
  label: const Text("详情"),
  onPressed: _onPressed,
),
```

### 19.7、修改按钮的宽度高度

用 `SizedBox` 包裹按钮即可控制宽高：

```dart
SizedBox(
  height: 80,
  width: 200,
  child: ElevatedButton(
    style: ButtonStyle(
      backgroundColor: MaterialStateProperty.all(Colors.red),
      foregroundColor: MaterialStateProperty.all(Colors.black),
    ),
    onPressed: () {},
    child: const Text('宽度高度'),
  ),
)
```

### 19.8、自适应按钮

用 `Row` + `Expanded` 让按钮撑满一行：

```dart
Row(
  mainAxisAlignment: MainAxisAlignment.center,
  children: <Widget>[
    Expanded(
      child: Container(
        height: 60,
        margin: const EdgeInsets.all(10),
        child: ElevatedButton(
          child: const Text('自适应按钮'),
          onPressed: () {
            print("自适应按钮");
          },
        ),
      ),
    )
  ],
),
```

### 19.9、配置圆角、圆形按钮

圆角按钮：

```dart
ElevatedButton(
  style: ButtonStyle(
    backgroundColor: MaterialStateProperty.all(Colors.blue),
    foregroundColor: MaterialStateProperty.all(Colors.white),
    elevation: MaterialStateProperty.all(20),
    shape: MaterialStateProperty.all(
      RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
    ),
  ),
  onPressed: () {
    print("圆角按钮");
  },
  child: const Text('圆角'),
)
```

圆形按钮：

```dart
Container(
  height: 80,
  child: ElevatedButton(
    style: ButtonStyle(
      backgroundColor: MaterialStateProperty.all(Colors.blue),
      foregroundColor: MaterialStateProperty.all(Colors.white),
      elevation: MaterialStateProperty.all(20),
      shape: MaterialStateProperty.all(
        CircleBorder(side: BorderSide(color: Colors.white)),
      ),
    ),
    onPressed: () {
      print("圆形按钮");
    },
    child: const Text('圆形按钮'),
  ),
)
```

### 19.10、修改 OutlinedButton 边框

通过 `ButtonStyle` 的 `side` 参数修改边框颜色和宽度：

```dart
Row(
  mainAxisAlignment: MainAxisAlignment.center,
  children: <Widget>[
    Expanded(
      child: Container(
        margin: const EdgeInsets.all(20),
        height: 50,
        child: OutlinedButton(
          style: ButtonStyle(
            foregroundColor: MaterialStateProperty.all(Colors.black),
            side: MaterialStateProperty.all(
              const BorderSide(width: 1, color: Colors.red),
            ),
          ),
          onPressed: () {},
          child: const Text("注册 配置边框"),
        ),
      ),
    )
  ],
)
```

---

## 二十、Flutter Wrap 组件

Wrap 可以实现流式布局。单行的 Wrap 跟 Row 表现几乎一致，单列的 Wrap 则跟 Column 表现几乎一致。但 Row 与 Column 都是单行/单列的，Wrap 突破了这个限制——mainAxis 上空间不足时，会向 crossAxis 方向扩展显示。

| 属性                | 说明                                                                      |
| ------------------- | ------------------------------------------------------------------------- |
| `direction`         | 主轴的方向，默认水平                                                      |
| `alignment`         | 主轴的对齐方式                                                            |
| `spacing`           | 主轴方向上的间距                                                          |
| `textDirection`     | 文本方向                                                                  |
| `verticalDirection` | 定义 children 的摆放顺序，默认是 down（见 Flex 相关属性介绍）             |
| `runAlignment`      | run 的对齐方式。run 可以理解为新的一行或一列，水平方向布局时 run 就是一行 |
| `runSpacing`        | run 的间距                                                                |

### 20.1、自定义一个按钮组件

```dart
class LayoutDemo extends StatelessWidget {
  const LayoutDemo({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Button("第一集", onPressed: () {});
  }
}

class Button extends StatelessWidget {
  String text;
  void Function()? onPressed;

  Button(this.text, {Key? key, required this.onPressed}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      onPressed: onPressed,
      style: ButtonStyle(
        backgroundColor: MaterialStateProperty.all(
            const Color.fromARGB(255, 236, 233, 233)),
        foregroundColor: MaterialStateProperty.all(Colors.black45),
      ),
      child: Text(text),
    );
  }
}
```

### 20.2、Wrap 组件的使用

```dart
class LayoutDemo extends StatelessWidget {
  const LayoutDemo({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(3),
      child: Wrap(
        spacing: 5,
        runSpacing: 5,
        // direction: Axis.vertical,
        // alignment: WrapAlignment.start,
        // runAlignment: WrapAlignment.center,
        children: <Widget>[
          Button("第1集", onPressed: () {}),
          Button("第2集", onPressed: () {}),
          Button("第3集", onPressed: () {}),
          Button("第4集", onPressed: () {}),
          Button("第5集", onPressed: () {}),
          Button("第6集", onPressed: () {}),
          Button("第7集", onPressed: () {}),
          Button("第8集", onPressed: () {}),
          Button("第9集", onPressed: () {}),
          Button("第10集", onPressed: () {}),
          Button("第11集", onPressed: () {}),
          Button("第12集", onPressed: () {}),
          Button("第13集", onPressed: () {}),
          Button("第14集", onPressed: () {}),
          Button("第15集", onPressed: () {}),
          Button("第16集", onPressed: () {}),
          Button("第17集", onPressed: () {}),
          Button("第18集", onPressed: () {}),
        ],
      ),
    );
  }
}

class Button extends StatelessWidget {
  String text;
  void Function()? onPressed;

  Button(this.text, {Key? key, required this.onPressed}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      onPressed: onPressed,
      style: ButtonStyle(
        backgroundColor: MaterialStateProperty.all(
            const Color.fromARGB(255, 236, 233, 233)),
        foregroundColor: MaterialStateProperty.all(Colors.black45),
      ),
      child: Text(text),
    );
  }
}
```

### 20.3、Wrap 组件搜索页面布局

用 Wrap 排布热搜标签，Column + ListTile 显示历史记录：

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: Scaffold(
        appBar: AppBar(title: const Text("Flutter App")),
        body: const LayoutDemo(),
      ),
    );
  }
}

class LayoutDemo extends StatelessWidget {
  const LayoutDemo({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(10),
      child: ListView(children: [
        Row(
          children: [
            Text(
              "热搜",
              style: Theme.of(context).textTheme.headline6,
            )
          ],
        ),
        const Divider(),
        Wrap(
          spacing: 10,
          runSpacing: 12,
          children: [
            Button("女装", onPressed: () {}),
            Button("笔记本", onPressed: () {}),
            Button("玩具", onPressed: () {}),
            Button("文学", onPressed: () {}),
            Button("女装", onPressed: () {}),
            Button("时尚", onPressed: () {}),
            Button("女装", onPressed: () {}),
            Button("女装", onPressed: () {}),
          ],
        ),
        const SizedBox(height: 10),
        Row(
          children: [
            Text(
              "历史记录",
              style: Theme.of(context).textTheme.headline6,
            )
          ],
        ),
        const Divider(),
        Column(
          children: const [
            ListTile(
              title: Text("女装"),
            ),
            Divider(),
            ListTile(
              title: Text("时尚"),
            ),
            Divider(),
          ],
        ),
        const SizedBox(height: 40),
        Padding(
          padding: const EdgeInsets.all(20),
          child: OutlinedButton.icon(
            onPressed: () {},
            style: ButtonStyle(
              foregroundColor: MaterialStateProperty.all(Colors.black38),
            ),
            icon: const Icon(Icons.delete),
            label: const Text("清空历史记录"),
          ),
        )
      ]),
    );
  }
}

class Button extends StatelessWidget {
  String text;
  void Function()? onPressed;

  Button(this.text, {Key? key, required this.onPressed}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      onPressed: onPressed,
      style: ButtonStyle(
        backgroundColor: MaterialStateProperty.all(
            const Color.fromARGB(255, 236, 233, 233)),
        foregroundColor: MaterialStateProperty.all(Colors.black45),
      ),
      child: Text(text),
    );
  }
}
```

---

## 二十一、Flutter StatelessWidget、StatefulWidget

在 Flutter 中自定义组件其实就是一个类，这个类需要继承 StatelessWidget 或 StatefulWidget。

- **StatelessWidget**：无状态组件，状态不可变的 widget。
- **StatefulWidget**：有状态组件，持有的状态可能在 widget 生命周期内改变。

通俗地讲：如果想改变页面中的数据，就需要用到 StatefulWidget。

### 21.1、StatefulWidget 实现一个计数器功能

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: Scaffold(
        appBar: AppBar(title: const Text("Flutter App")),
        body: const HomePage(),
      ),
    );
  }
}

class HomePage extends StatefulWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  int countNum = 0;

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Column(
        children: [
          const SizedBox(height: 40),
          Text("$countNum",
              style: Theme.of(context).textTheme.titleLarge),
          const SizedBox(height: 100),
          ElevatedButton(
            onPressed: () {
              setState(() {
                countNum++;
              });
            },
            child: const Text("增加"),
          )
        ],
      ),
    );
  }
}
```

> **提示**：通过 `setState(() {...})` 修改状态数据后，Flutter 会重新执行 `build` 方法刷新页面。

### 21.2、StatefulWidget 实现一个动态列表

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: Scaffold(
        appBar: AppBar(title: const Text("Flutter App")),
        body: const HomePage(),
      ),
    );
  }
}

class HomePage extends StatefulWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  List<String> list = [];

  @override
  Widget build(BuildContext context) {
    return ListView(
      children: [
        Column(
          children: list.map((value) {
            return ListTile(
              title: Text(value),
            );
          }).toList(),
        ),
        const SizedBox(
          height: 40,
        ),
        Padding(
          padding: const EdgeInsets.all(40),
          child: ElevatedButton(
            onPressed: () {
              setState(() {
                list.add("新增一条数据");
              });
            },
            child: const Text("增加"),
          ),
        )
      ],
    );
  }
}
```

---

## 二十二、Scaffold 属性：BottomNavigationBar 自定义底部导航

### 22.1、BottomNavigationBar 组件介绍

BottomNavigationBar 是底部导航条，可以实现底部 Tab 切换，`bottomNavigationBar` 是 Scaffold 组件的参数。

| 属性名         | 说明                                                                 |
| -------------- | -------------------------------------------------------------------- |
| `items`        | List，底部导航条按钮集合                                             |
| `iconSize`     | icon 大小                                                            |
| `currentIndex` | 默认选中第几个                                                       |
| `onTap`        | 选中变化回调函数                                                     |
| `fixedColor`   | 选中的颜色                                                           |
| `type`         | `BottomNavigationBarType.fixed` / `BottomNavigationBarType.shifting` |

### 22.2、BottomNavigationBar 自定义底部导航

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: Scaffold(
        appBar: AppBar(title: const Text("Flutter App")),
        body: const Center(
          child: Text("我是一个文本"),
        ),
        bottomNavigationBar: BottomNavigationBar(
          items: const [
            BottomNavigationBarItem(
              icon: Icon(Icons.home),
              label: "首页",
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.category),
              label: "分类",
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.settings),
              label: "设置",
            ),
          ],
        ),
      ),
    );
  }
}
```

### 22.3、BottomNavigationBar 底部菜单选中

结合 StatefulWidget，通过 `currentIndex` 与 `onTap` 实现底部菜单的选中切换：

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: const Tabs(),
    );
  }
}

class Tabs extends StatefulWidget {
  const Tabs({super.key});

  @override
  State<Tabs> createState() => _TabsState();
}

class _TabsState extends State<Tabs> {
  int _currentIndex = 0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Flutter App")),
      body: const Center(
        child: Text("我是一个文本"),
      ),
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _currentIndex,
```

> **提示**：课件原文在本节代码处截断，后续实现思路为：在 `onTap` 回调中调用 `setState` 更新 `_currentIndex`，即可实现底部菜单的切换选中效果。

---

### 22.4、BottomNavigationBar 自定义底部导航实现页面切换

通过 `onTap` 回调结合 `setState` 更新 `_currentIndex`，即可在自定义底部导航中实现页面切换：

```dart
onTap: (v) {
  setState(() {
    _currentIndex = v;
  });
},
items: const [
  BottomNavigationBarItem(icon: Icon(Icons.home), label: "首页"),
  BottomNavigationBarItem(icon: Icon(Icons.category), label: "分类"),
  BottomNavigationBarItem(icon: Icon(Icons.settings), label: "设置"),
],
```

---

## 二十三、Scaffold属性 FloatingActionButton实现类似闲鱼App底部导航凸起按钮

### 23.1、FloatingActionButton详解

FloatingActionButton 简称 FAB，可以实现浮动按钮，也可以实现类似闲鱼 App 的底部凸起导航。

| 属性名称           | 属性值                              |
| ------------------ | ----------------------------------- |
| child              | 子视图，一般为 Icon，不推荐使用文字 |
| tooltip            | FAB 被长按时显示，也是无障碍功能    |
| backgroundColor    | 背景颜色                            |
| elevation          | 未点击的时候的阴影                  |
| highlightElevation | 点击时阴影值，默认 12.0             |
| onPressed          | 点击事件回调                        |
| shape              | 可以定义 FAB 的形状等               |
| mini               | 是否是 mini 类型，默认 false        |

### 23.2、实现类似闲鱼App底部导航凸起按钮

在 `Scaffold` 中通过 `floatingActionButton` 传入带白色圆形装饰的 `Container` 包裹的 FAB，并配合 `floatingActionButtonLocation: FloatingActionButtonLocation.centerDocked` 使其凸起在底部导航中间；点击 FAB 时切换到中间的页面，选中时改变其背景色。

```dart
import 'package:flutter/material.dart';
import './tabs/home.dart';
import './tabs/category.dart';
import './tabs/message.dart';
import './tabs/setting.dart';
import './tabs/user.dart';

class Tabs extends StatefulWidget {
  const Tabs({super.key});

  @override
  State<Tabs> createState() => _TabsState();
}

class _TabsState extends State<Tabs> {
  int _currentIndex = 0;
  final List<Widget> _pages = const [
    HomePage(),
    CategoryPage(),
    MessagePage(),
    SettingPage(),
    UserPage()
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Flutter App")),
      body: _pages[_currentIndex],
      bottomNavigationBar: BottomNavigationBar(
        fixedColor: Colors.red, // 选中的颜色
        // iconSize: 35, // 底部菜单大小
        currentIndex: _currentIndex, // 第几个菜单选中
        type: BottomNavigationBarType.fixed, // 底部有4个或4个以上菜单时需要配置这个参数
        onTap: (index) {
          // 点击菜单触发的方法
          setState(() {
            _currentIndex = index;
          });
        },
        items: const [
          BottomNavigationBarItem(icon: Icon(Icons.home), label: "首页"),
          BottomNavigationBarItem(icon: Icon(Icons.category), label: "分类"),
          BottomNavigationBarItem(icon: Icon(Icons.message), label: "消息"),
          BottomNavigationBarItem(icon: Icon(Icons.settings), label: "设置"),
          BottomNavigationBarItem(icon: Icon(Icons.people), label: "用户")
        ]),
      floatingActionButton: Container(
        height: 60,
        width: 60,
        padding: const EdgeInsets.all(4),
        margin: const EdgeInsets.only(top: 4),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(30)
        ),
        child: FloatingActionButton(
          backgroundColor: _currentIndex == 2 ? Colors.red : Colors.blue,
          onPressed: () {
            setState(() {
              _currentIndex = 2;
            });
          },
          child: const Icon(Icons.add),
        ),
      ),
      floatingActionButtonLocation: FloatingActionButtonLocation.centerDocked,
    );
  }
}
```

> **提示**：底部有 4 个及以上菜单时必须配置 `type: BottomNavigationBarType.fixed`，否则菜单会被折叠。

---

## 二十四、Scaffold属性 抽屉菜单Drawer

在 `Scaffold` 组件里传入 `drawer` 参数可以定义左侧边栏，传入 `endDrawer` 可以定义右侧边栏。侧边栏默认是隐藏的，可以通过手指滑动显示，也可以通过点击按钮显示。

```dart
return Scaffold(
  appBar: AppBar(
    title: Text("Flutter App"),
  ),
  drawer: Drawer(
    child: Text('左侧边栏'),
  ),
  endDrawer: Drawer(
    child: Text('右侧侧边栏'),
  ),
);
```

### 24.1、Flutter DrawerHeader

常见属性：

| 属性       | 描述             |
| ---------- | ---------------- |
| decoration | 设置顶部背景颜色 |
| child      | 配置子元素       |
| padding    | 内边距           |
| margin     | 外边距           |

在 `Drawer` 中用 `Column` 组合 `DrawerHeader` 头部与 `ListTile` 菜单项：

```dart
drawer: Drawer(
  child: Column(
    children: <Widget>[
      DrawerHeader(
        decoration: const BoxDecoration(
          color: Colors.yellow,
          image: DecorationImage(
            image: NetworkImage(
              "https://www.itying.com/images/flutter/2.png"),
            fit: BoxFit.cover)),
        child: ListView(
          children: <Widget>[Text('我是一个头部')],
        ),
      ),
      const ListTile(
        title: Text("个人中心"),
        leading: CircleAvatar(child: Icon(Icons.people)),
      ),
      const Divider(),
      const ListTile(
        title: Text("系统设置"),
        leading: CircleAvatar(child: Icon(Icons.settings)),
      )
    ],
  ))
```

### 24.2、Flutter UserAccountsDrawerHeader

| 属性                  | 描述                         |
| --------------------- | ---------------------------- |
| decoration            | 设置顶部背景颜色             |
| accountName           | 账户名称                     |
| accountEmail          | 账户邮箱                     |
| currentAccountPicture | 用户头像                     |
| otherAccountsPictures | 用来设置当前账户其他账户头像 |
| margin                | 外边距                       |

```dart
drawer: Drawer(
  child: Column(
    children: <Widget>[
      UserAccountsDrawerHeader(
        accountName: const Text("大地老师"),
        accountEmail: const Text("dadi@itying.com"),
        currentAccountPicture: const CircleAvatar(
          backgroundImage: NetworkImage(
            "https://www.itying.com/images/flutter/3.png"),
        ),
        decoration: const BoxDecoration(
          color: Colors.yellow,
          image: DecorationImage(
            image: NetworkImage(
              "https://www.itying.com/images/flutter/2.png"),
            fit: BoxFit.cover
          )
        ),
        otherAccountsPictures: <Widget>[
          Image.network("https://www.itying.com/images/flutter/4.png"),
          Image.network("https://www.itying.com/images/flutter/5.png"),
          Image.network("https://www.itying.com/images/flutter/6.png")
        ],
      ),
      const ListTile(
        title: Text("个人中心"),
        leading: CircleAvatar(
          child: Icon(Icons.people)
        ),
      ),
      const Divider(),
      const ListTile(
        title: Text("系统设置"),
        leading: CircleAvatar(
          child: Icon(Icons.settings)
        ),
      )
    ],
  )
)
```

---

## 二十五、Flutter AppBar TabBar TabBarView

### 25.1、AppBar自定义顶部按钮图标、颜色

| 属性            | 描述                                                                              |
| --------------- | --------------------------------------------------------------------------------- |
| leading         | 在标题前面显示的一个控件，在首页通常显示应用的 logo；在其他界面通常显示为返回按钮 |
| title           | 标题，通常显示为当前界面的标题文字，可以放组件                                    |
| actions         | 通常使用 IconButton 来表示，可以放按钮组                                          |
| bottom          | 通常放 TabBar，标题下面显示一个 Tab 导航栏                                        |
| backgroundColor | 导航背景颜色                                                                      |
| iconTheme       | 图标样式                                                                          |
| centerTitle     | 标题是否居中显示                                                                  |

```dart
AppBar(
  backgroundColor: Colors.red,
  leading: IconButton(
    icon: const Icon(Icons.menu),
    onPressed: () {
      print('menu Pressed');
    }
  ),
  title: const Text('FlutterDemo'),
  actions: <Widget>[
    IconButton(
      icon: const Icon(Icons.search),
      onPressed: () {
        print('Search Pressed');
      }
    ),
    IconButton(
      icon: const Icon(Icons.more_horiz),
      onPressed: () {
        print('more_horiz Pressed');
      }
    )
  ],
)
```

### 25.2、Flutter AppBar结合TabBar实现顶部Tab切换

TabBar 常见属性：

| 属性                 | 描述                                                                                                  |
| -------------------- | ----------------------------------------------------------------------------------------------------- |
| tabs                 | 显示的标签内容，一般使用 Tab 对象，也可以是其他的 Widget                                              |
| controller           | TabController 对象                                                                                    |
| isScrollable         | 是否可滚动                                                                                            |
| indicatorColor       | 指示器颜色                                                                                            |
| indicatorWeight      | 指示器高度                                                                                            |
| indicatorPadding     | 底部指示器的 Padding                                                                                  |
| indicator            | 指示器 decoration，例如边框等                                                                         |
| indicatorSize        | 指示器大小计算方式，`TabBarIndicatorSize.label` 跟文字等宽，`TabBarIndicatorSize.tab` 跟每个 tab 等宽 |
| labelColor           | 选中 label 颜色                                                                                       |
| labelStyle           | 选中 label 的 Style                                                                                   |
| labelPadding         | 每个 label 的 padding 值                                                                              |
| unselectedLabelColor | 未选中 label 颜色                                                                                     |
| unselectedLabelStyle | 未选中 label 的 Style                                                                                 |

### 25.3、TabBar TabBarView实现类似头条顶部导航

**1、混入 SingleTickerProviderStateMixin**

```dart
class _HomePageState extends State<HomePage>
    with SingleTickerProviderStateMixin {}
```

**2、定义 TabController**

```dart
late TabController _tabController;

void initState() {
  super.initState();
  _tabController = TabController(length: 8, vsync: this);
  _tabController.addListener(() {
    if (_tabController.animation!.value == _tabController.index) {
      print(_tabController.index); // 获取点击或滑动页面的索引值
    }
  });
}
```

**3、配置 TabBar 和 TabBarView**

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: const HomePage(),
    );
  }
}

class HomePage extends StatefulWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage>
    with SingleTickerProviderStateMixin {
  late TabController _tabController;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 3, vsync: this);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Flutter App"),
        bottom: TabBar(
          controller: _tabController,
          tabs: const [
            Tab(child: Text("热门")),
            Tab(child: Text("推荐")),
            Tab(child: Text("视频"))
          ],
        ),
      ),
      body: TabBarView(
        controller: _tabController,
        children: const [Text("热门"), Text("推荐"), Text("视频")]),
    );
  }
}
```

> **提示**：`TabBar` 和 `TabBarView` 必须使用同一个 `controller`，二者才能联动。

### 25.4、BottomNavigationBar的页面中使用TabBar

在 BottomNavigationBar 的页面中使用 TabBar 时，需要通过 `PreferredSize` 缩小 AppBar 高度，并用 `KeepAliveWrapper` 缓存页面，同时在 `dispose` 中释放 TabController：

```dart
import 'package:flutter/material.dart';
import '../../tools/KeepAliveWrapper.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage>
    with SingleTickerProviderStateMixin {
  late TabController _tabController;

  @override
  void dispose() { // 生命周期函数
    super.dispose();
    _tabController.dispose();
  }

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 8, vsync: this);
    _tabController.addListener(() {
      if (_tabController.animation!.value == _tabController.index) {
        print(_tabController.index); // 获取点击或滑动页面的索引值
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: PreferredSize(
        preferredSize: const Size.fromHeight(40),
        child: AppBar(
          backgroundColor: const Color.fromARGB(255, 253, 247, 247),
          elevation: 10,
          title: SizedBox(
            height: 30,
            child: TabBar(
              // isScrollable: true, // 如果多个按钮的话可以滑动
              indicatorColor: Colors.red,
              labelColor: Colors.red,
              unselectedLabelColor: Colors.white,
              indicatorSize: TabBarIndicatorSize.label,
              controller: _tabController, // 注意
              tabs: const [
                Tab(
                  child: Text("热销",
                    style: TextStyle(color: Colors.black))),
                Tab(
                  child: Text("推荐",
                    style: TextStyle(color: Colors.black)))
              ]),
          ),
        ),
      ),
      body: TabBarView(
        controller: _tabController, // 注意
        children: [
          KeepAliveWrapper(
            child: ListView(
              children: const <Widget>[
                ListTile(title: Text("第一个tab")),
                ListTile(title: Text("第一个tab")),
                ListTile(title: Text("最后一个tab")),
              ],
            ),
          ),
          KeepAliveWrapper(
            child: ListView(
              children: const <Widget>[
                ListTile(title: Text("第二个tab")),
                ListTile(title: Text("第二个tab")),
                ListTile(title: Text("第二个tab"))
              ],
            )
          )
        ]),
    );
  }
}
```

```dart [lib/tools/keepAliveWrapper.dart]
import 'package:flutter/material.dart';

class KeepAliveWrapper extends StatefulWidget {
  final Widget child;
  final bool keepAlive;
  const KeepAliveWrapper(
      {super.key, required this.child, this.keepAlive = true});

  @override
  State<KeepAliveWrapper> createState() => _KeepAliveWrapperState();
}

class _KeepAliveWrapperState extends State<KeepAliveWrapper>
    with AutomaticKeepAliveClientMixin {
  @override
  Widget build(BuildContext context) {
    super.build(context);
    return widget.child;
  }

  @override
  bool get wantKeepAlive => widget.keepAlive;

  @override
  void didUpdateWidget(covariant KeepAliveWrapper oldWidget) {
    if (oldWidget.keepAlive != widget.keepAlive) {
      // keepAlive 状态需要更新，实现在 AutomaticKeepAliveClientMixin 中
      updateKeepAlive();
    }
    super.didUpdateWidget(oldWidget);
  }
}
```

> **提示**：示例中重复的 `ListTile` 已精简，实际列表项可按需增加；`KeepAliveWrapper` 的实现见 25.6 节。

### 25.5、PreferredSize组件

`PreferredSize` 可以改变 appBar 的高度：

```dart
Scaffold(
  appBar: PreferredSize(
    preferredSize: Size.fromHeight(50),
    child: AppBar(
      ...
    )
  ),
  body: Test(),
)
```

### 25.6、自定义KeepAliveWrapper缓存页面

`AutomaticKeepAliveClientMixin` 可以快速实现页面缓存功能，但通过混入的方式实现不是很优雅，所以有必要对其进行封装：

```dart
import 'package:flutter/material.dart';

class KeepAliveWrapper extends StatefulWidget {
  const KeepAliveWrapper(
      {Key? key, @required this.child, this.keepAlive = true})
      : super(key: key);
  final Widget? child;
  final bool keepAlive;

  @override
  State<KeepAliveWrapper> createState() => _KeepAliveWrapperState();
}

class _KeepAliveWrapperState extends State<KeepAliveWrapper>
    with AutomaticKeepAliveClientMixin {
  @override
  Widget build(BuildContext context) {
    return widget.child!;
  }

  @override
  bool get wantKeepAlive => widget.keepAlive;

  @override
  void didUpdateWidget(covariant KeepAliveWrapper oldWidget) {
    if (oldWidget.keepAlive != widget.keepAlive) {
      // keepAlive 状态需要更新，实现在 AutomaticKeepAliveClientMixin 中
      updateKeepAlive();
    }
    super.didUpdateWidget(oldWidget);
  }
}
```

### 25.7、监听TabController改变事件

```dart
void initState() {
  super.initState();
  _tabController = TabController(length: 8, vsync: this);
  // 监听_tabController的改变事件
  _tabController.addListener(() {
    if (_tabController.animation!.value == _tabController.index) {
      print(_tabController.index); // 获取点击或滑动页面的索引值
    }
  });
}
```

### 25.8、MaterialApp去掉debug图标

```dart
return MaterialApp(
  debugShowCheckedModeBanner: false, // 去掉debug图标
  home: Tabs(),
  ...
);
```

---

## 二十六、Flutter中的路由

### 26.1、Flutter路由介绍

Flutter 中的路由通俗地讲就是页面跳转。在 Flutter 中通过 `Navigator` 组件管理路由导航，并提供了管理堆栈的方法，如 `Navigator.push` 和 `Navigator.pop`。Flutter 提供了两种配置路由跳转的方式：1、基本路由；2、命名路由。

### 26.2、Flutter中的普通路由使用

比如从 HomePage 组件跳转到 SearchPage 组件。

**1、需要在 HomePage 中引入 SearchPage.dart**

```dart
import '../SearchPage.dart';
```

**2、在 HomePage 中通过下面方法跳转**

```dart
Center(
  child: ElevatedButton(onPressed: () {
    Navigator.of(context).push(
      MaterialPageRoute(builder: (context) {
        return const SearchPage();
      })
    );
  }, child: const Text("跳转到搜索页面")),
)
```

### 26.3、Flutter中的普通路由跳转传值

跳转传值和调用组件传值的实现方法是一样的。

**1、定义一个 SearchPage 接收传值**

```dart
import 'package:flutter/material.dart';

class SearchPage extends StatefulWidget {
  final String title;
  const SearchPage({super.key, this.title = "Search Page"});

  @override
  State<SearchPage> createState() => _SearchPageState();
}

class _SearchPageState extends State<SearchPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
        centerTitle: true,
      ),
      body: const Center(
        child: Text("组件居中"),
      ),
    );
  }
}
```

**2、跳转页面实现传值**

```dart
Center(
  child: ElevatedButton(onPressed: () {
    Navigator.of(context).push(
      MaterialPageRoute(builder: (context) {
        return const SearchPage(title: "搜索页面");
      })
    );
  }, child: const Text("跳转到搜索页面")),
)
```

### 26.4、Flutter中的命名路由

**1、main.dart 中配置路由**

```dart
import 'package:flutter/material.dart';
import './pages/tabs.dart';
import './pages/search.dart';
import './pages/form.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      // home: const Tabs(),
      routes: {
        '/': (contxt) => const Tabs(),
        '/search': (contxt) => const SearchPage(),
        '/form': (context) => const FormPage(),
      },
    );
  }
}
```

**2、跳转路由**

```dart
ElevatedButton(
  onPressed: () {
    Navigator.pushNamed(context, '/form');
  },
  child: const Text("跳转到form页面")
)
```

### 26.5、Flutter中的命名路由传值

官方文档：https://flutter.dev/docs/cookbook/navigation/navigate-with-arguments

#### 26.5.1、配置onGenerateRoute

```dart
import 'package:flutter/material.dart';
import './pages/tabs.dart';
import './pages/search.dart';
import './pages/form.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  // 1、定义Map类型的routes
  Map routes = {
    '/': (contxt) => const Tabs(),
    '/search': (contxt) => const SearchPage(),
    '/form': (context, {arguments}) => FormPage(arguments: arguments),
  };

  MyApp({Key? key}) : super(key: key);

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      initialRoute: '/',
      // 2、调用onGenerateRoute处理
      onGenerateRoute: (RouteSettings settings) {
        // 统一处理
        final String? name = settings.name;
        final Function? pageContentBuilder = routes[name];
        if (pageContentBuilder != null) {
          if (settings.arguments != null) {
            final Route route = MaterialPageRoute(
              builder: (context) =>
                pageContentBuilder(context, arguments: settings.arguments));
            return route;
          } else {
            final Route route = MaterialPageRoute(
              builder: (context) => pageContentBuilder(context));
            return route;
          }
        }
        return null;
      },
    );
  }
}
```

#### 26.5.2、定义页面接收arguments传参

```dart
import 'package:flutter/material.dart';

class FormPage extends StatefulWidget {
  final Map arguments;
  const FormPage({super.key, required this.arguments});

  @override
  State<FormPage> createState() => _FormPageState();
}

class _FormPageState extends State<FormPage> {
  @override
  void initState() {
    super.initState();
    print(widget.arguments);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("我是一个Form表单演示页面"),
      ),
    );
  }
}
```

#### 26.5.3、跳转页面实现传参

```dart
ElevatedButton(
  onPressed: () {
    Navigator.pushNamed(context, '/form', arguments: {
      "title": "搜索页面",
    });
  },
  child: const Text("form")
)
```

### 26.6、Flutter中的命名路由单独抽离到一个文件

#### 26.6.1、新建routers/routers.dart配置路由

```dart
import 'package:flutter/material.dart';
import '../pages/tabs.dart';
import '../pages/search.dart';
import '../pages/form.dart';

final Map<String, Function> routes = {
  '/': (contxt) => const Tabs(),
  '/search': (contxt) => const SearchPage(),
  '/form': (context, {arguments}) => FormPage(arguments: arguments),
};

var onGenerateRoute = (RouteSettings settings) {
  // 统一处理
  final String? name = settings.name;
  final Function? pageContentBuilder = routes[name];
  if (pageContentBuilder != null) {
    if (settings.arguments != null) {
      final Route route = MaterialPageRoute(
        builder: (context) =>
          pageContentBuilder(context, arguments: settings.arguments));
      return route;
    } else {
      final Route route =
        MaterialPageRoute(builder: (context) => pageContentBuilder(context));
      return route;
    }
  }
  return null;
};
```

#### 26.6.2、修改main.dart

```dart
import 'package:flutter/material.dart';
import './routers/routers.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      initialRoute: '/',
      onGenerateRoute: onGenerateRoute,
    );
  }
}
```

#### 26.6.3、实现页面跳转传值

```dart
ElevatedButton(
  onPressed: () {
    Navigator.pushNamed(context, '/form', arguments: {
      "title": "搜索页面",
    });
  },
  child: const Text("form")
)
```

### 26.7、Flutter返回上一级路由

```dart
Navigator.of(context).pop();
```

### 26.8、Flutter中替换路由

比如从用户中心页面跳转到了 registerFirst 页面，然后从 registerFirst 页面通过 `pushReplacementNamed` 跳转到了 registerSecond 页面。这时点击 registerSecond 的返回按钮，会直接返回到用户中心（registerFirst 已被替换出栈）。

```dart
Navigator.of(context).pushReplacementNamed('/registerSecond');
```

### 26.9、Flutter返回到根路由

比如从用户中心跳转到 registerFirst 页面，再跳转到 registerSecond、registerThird 页面。想让 registerThird 注册成功后直接返回到用户中心，就用到了返回到根路由的方法：

```dart
Navigator.of(context).pushAndRemoveUntil(
  MaterialPageRoute(builder: (BuildContext context) {
    return const Tabs();
  }), (route) => false);
```

### 26.10、Flutter Android和iOS使用同样风格的路由跳转

`MaterialPageRoute` 使用和平台风格一致的路由切换动画：在 iOS 上左右滑动切换，在 Android 上上下滑动切换。`CupertinoPageRoute` 是 Cupertino 组件库提供的 iOS 风格路由切换组件，如果想在 Android 上也使用左右切换风格，可以使用 `CupertinoPageRoute`。

**1、routers.dart 中引入 cupertino.dart**

```dart
import 'package:flutter/cupertino.dart';
```

**2、MaterialPageRoute 改为 CupertinoPageRoute**

```dart
import 'package:flutter/cupertino.dart';
import '../pages/tabs.dart';
import '../pages/shop.dart';
import '../pages/user/login.dart';
import '../pages/user/registerFirst.dart';
import '../pages/user/registerSecond.dart';
import '../pages/user/registerThird.dart';

// 1、配置路由
Map routes = {
  "/": (contxt) => const Tabs(),
  "/login": (contxt) => const LoginPage(),
  "/registerFirst": (contxt) => const RegisterFirstPage(),
  "/registerSecond": (contxt) => const RegisterSecondPage(),
  "/registerThird": (contxt) => const RegisterThirdPage(),
  "/shop": (contxt, {arguments}) => ShopPage(arguments: arguments),
};

// 2、配置onGenerateRoute 固定写法 这个方法相当于一个中间件，这里可以做权限判断
var onGenerateRoute = (RouteSettings settings) {
  final String? name = settings.name;
  final Function? pageContentBuilder = routes[name];
  if (pageContentBuilder != null) {
    if (settings.arguments != null) {
      final Route route = CupertinoPageRoute(
        builder: (context) =>
          pageContentBuilder(context, arguments: settings.arguments));
      return route;
    } else {
      final Route route =
        CupertinoPageRoute(builder: (context) => pageContentBuilder(context));
      return route;
    }
  }
  return null;
};
```

### 26.11、全局配置主题

```dart
return MaterialApp(
  debugShowCheckedModeBanner: false,
  title: 'Flutter Demo',
  theme: ThemeData(
    primarySwatch: Colors.blue,
    appBarTheme: const AppBarTheme(
      centerTitle: true,
    )
  ),
  initialRoute: "/",
  onGenerateRoute: onGenerateRoute,
);
```

---

## 二十七、Flutter Dialog

### 27.1、AlertDialog

```dart
_alertDialog() async {
  var result = await showDialog(
    barrierDismissible: false, // 表示点击灰色背景的时候是否消失弹出框
    context: context,
    builder: (context) {
      return AlertDialog(
        title: const Text("提示信息!"),
        content: const Text("您确定要删除吗?"),
        actions: <Widget>[
          TextButton(
            child: const Text("取消"),
            onPressed: () {
              print("取消");
              Navigator.pop(context, 'Cancle');
            },
          ),
          TextButton(
            child: const Text("确定"),
            onPressed: () {
              print("确定");
              Navigator.pop(context, "Ok");
            },
          )
        ],
      );
    });
  print(result);
}
```

> **提示**：`showDialog` 返回 Future，可通过 `await` 获取 `Navigator.pop` 传回的结果。

### 27.2、SimpleDialog、SimpleDialogOption

```dart
_simpleDialog() async {
  var result = await showDialog(
    barrierDismissible: true, // 表示点击灰色背景的时候是否消失弹出框
    context: context,
    builder: (context) {
      return SimpleDialog(
        title: const Text("请选择内容"),
        children: <Widget>[
          SimpleDialogOption(
            child: const Text("Option A"),
            onPressed: () {
              print("Option A");
              Navigator.pop(context, "A");
            },
          ),
          const Divider(),
          SimpleDialogOption(
            child: const Text("Option B"),
            onPressed: () {
              print("Option B");
              Navigator.pop(context, "B");
            },
          ),
          const Divider(),
          SimpleDialogOption(
            child: const Text("Option C"),
            onPressed: () {
              print("Option C");
              Navigator.pop(context, "C");
            },
          ),
        ],
      );
    });
  print(result);
}
```

### 27.3、showModalBottomSheet

```dart
_modelBottomSheet() async {
  var result = await showModalBottomSheet(
    context: context,
    builder: (context) {
      return SizedBox(
        height: 220,
        child: Column(
          children: <Widget>[
            ListTile(
              title: const Text("分享 A"),
              onTap: () {
                Navigator.pop(context, "分享 A");
              },
            ),
            const Divider(),
            ListTile(
              title: const Text("分享 B"),
              onTap: () {
                Navigator.pop(context, "分享 B");
              },
            ),
            const Divider(),
            ListTile(
              title: const Text("分享 C"),
              onTap: () {
                Navigator.pop(context, "分享 C");
              },
            )
          ],
        ),
      );
    });
  print(result);
}
```

### 27.4、Flutter Toast

#### 27.4.1、fluttertoast的使用

插件地址：https://pub.dev/packages/fluttertoast

```bash
# add this line to your dependencies
fluttertoast: ^8.0.9
```

```dart
import 'package:fluttertoast/fluttertoast.dart';

Fluttertoast.showToast(
  msg: "提示信息",
  toastLength: Toast.LENGTH_SHORT,
  gravity: ToastGravity.BOTTOM,
  timeInSecForIosWeb: 1,
  backgroundColor: Colors.black,
  textColor: Colors.white,
  fontSize: 16.0
);
```

#### 27.4.2、ftoast的使用

支持 LINUX、MACOS、WEB、WINDOWS 的另一个插件，插件地址：https://pub.dev/packages/ftoast

```bash
dependencies:
  ftoast: ^2.0.0
```

```dart
import 'package:ftoast/ftoast.dart';

FToast.toast(
  context,
  msg: "This is Msg",
  subMsg: "Welcome to use FToast. This is subMsg!",
  subMsgStyle: const TextStyle(color: Colors.white, fontSize: 13),
);
```

### 27.5、自定义Flutter Dialog、Material组件、InkWell组件

自定义 Dialog 对象需要继承 `Dialog` 类。尽管 Dialog 提供了 `child` 参数可以用来写视图界面，但往往达不到想要的效果，因为默认的 Dialog 背景框是满屏的。如果想完全自定义界面，就需要重写 `build` 函数。

#### 27.5.1、自定义一个提示的Dialog

**1、新建 myDialog.dart**

```dart
import 'dart:async';
import 'package:flutter/material.dart';

// ignore: must_be_immutable
class MyDialog extends Dialog {
  String title;
  String content;
  Function()? onClosed;

  MyDialog({Key? key, required this.title, required this.onClosed, this.content = ""})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Material(
      type: MaterialType.transparency,
      child: Center(
        child: Container(
          height: 300,
          width: 300,
          color: Colors.white,
          child: Column(
            children: <Widget>[
              Padding(
                padding: const EdgeInsets.all(10),
                child: Stack(
                  children: <Widget>[
                    Align(
                      alignment: Alignment.center,
                      child: Text(title),
                    ),
                    Align(
                      alignment: Alignment.centerRight,
                      child: InkWell(
                        onTap: onClosed,
                        child: const Icon(Icons.close),
                      ),
                    )
                  ],
                ),
              ),
              const Divider(),
              Container(
                padding: const EdgeInsets.all(10),
                width: double.infinity,
                child: Text(content, textAlign: TextAlign.left),
              )
            ],
          ),
        )),
    );
  }
}
```

**2、调用 MyDialog**

```dart
void _myDialog() async {
  await showDialog(
    barrierDismissible: true, // 表示点击灰色背景的时候是否消失弹出框
    context: context,
    builder: (context) {
      return MyDialog(
        title: '标题',
        onClosed: () {
          print("关闭");
          Navigator.of(context).pop();
        },
        content: "我是一个内容");
    });
}
```

> **提示**：外层使用 `Material(type: MaterialType.transparency)` 包裹可以去掉 Dialog 默认的满屏背景，实现自定义尺寸的弹窗。

#### 27.5.2、Flutter定时器 让dialog自动关闭

**Flutter 定时器**

```dart
const timeout = Duration(seconds: 3);
var t = Timer.periodic(timeout, (timer) {
  print('afterTimer=' + DateTime.now().toString());
  // timer.cancel(); // 取消定时器
});
t.cancel(); // 取消定时器
```

组件销毁的时候取消定时器：

```dart
void dispose() {
  super.dispose();
  t.cancel();
}
```

**MyDialog 过几秒后自动关闭**

```dart
import 'dart:async';
import 'package:flutter/material.dart';

// ignore: must_be_immutable
class MyDialog extends Dialog {
  String title;
  String content;
  Function()? onClosed;

  MyDialog({Key? key, required this.title, required this.onClosed, this.content = ""})
      : super(key: key);

  _showTimer(context) {
    Timer.periodic(
      Duration(milliseconds: 3000), (t) {
        print('关闭');
        Navigator.of(context).pop();
        t.cancel();
      });
  }

  @override
  Widget build(BuildContext context) {
    _showTimer(context);
    return Material(
      type: MaterialType.transparency,
      child: Center(
        ...
      ),
    );
  }
}
```

> **提示**：在 `build` 中启动 `Timer.periodic`，3 秒后执行 `pop` 关闭弹窗并 `cancel` 定时器；更推荐在 `initState` 中启动定时器、`dispose` 中取消，避免重复触发。

---

> 上一章（自定义 Dialog 组件）示例的结尾部分：Dialog 内容区域使用 `Column` 布局，顶部标题居中、右上角关闭按钮，`Divider` 分隔后显示正文内容。

```dart
child: Container(
  height: 300,
  width: 300,
  color: Colors.white,
  child: Column(
    children: <Widget>[
      Padding(
        padding: const EdgeInsets.all(10),
        child: Stack(
          children: <Widget>[
            Align(
              alignment: Alignment.center,
              child: Text(title),
            ),
            Align(
              alignment: Alignment.centerRight,
              child: InkWell(
                onTap: onClosed,
                child: const Icon(Icons.close),
              ),
            )
          ],
        ),
      ),
      const Divider(),
      Container(
        padding: const EdgeInsets.all(10),
        width: double.infinity,
        child: Text(content, textAlign: TextAlign.left),
      )
    ],
  ),
)),
```

---

## 二十八、Flutter PageView

Flutter 中的轮播图以及抖音上下滑页切换视频等功能，都可以通过 `PageView` 轻松实现。

PageView 常见属性：

| 属性                     | 描述                                                 |
| ------------------------ | ---------------------------------------------------- |
| `scrollDirection`        | `Axis.horizontal` 水平方向，`Axis.vertical` 垂直方向 |
| `children`               | 配置子元素                                           |
| `allowImplicitScrolling` | 缓存当前页面的前后两页                               |
| `onPageChanged`          | page 改变的时候触发                                  |

### 28.1、PageView 的使用

```dart
import 'package:flutter/material.dart';

class PageViewPage extends StatefulWidget {
  const PageViewPage({super.key});

  @override
  State<PageViewPage> createState() => _PageViewPageState();
}

class _PageViewPageState extends State<PageViewPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("pageview演示"),
      ),
      body: PageView(
        // scrollDirection: Axis.vertical, // 滑动方向为垂直方向
        children: [
          Center(
            child: Text("1", style: Theme.of(context).textTheme.headline1),
          ),
          Center(
            child: Text("2", style: Theme.of(context).textTheme.headline1),
          ),
          Center(
            child: Text("3", style: Theme.of(context).textTheme.headline1),
          ),
          Center(
            child: Text("4", style: Theme.of(context).textTheme.headline1),
          ),
          Center(
            child: Text("5", style: Theme.of(context).textTheme.headline1),
          ),
          Center(
            child: Text("6", style: Theme.of(context).textTheme.headline1),
          )
        ],
      ),
    );
  }
}
```

### 28.2、PageView.builder

```dart
import 'package:flutter/material.dart';

class PageViewPage extends StatefulWidget {
  const PageViewPage({super.key});

  @override
  State<PageViewPage> createState() => _PageViewPageState();
}

class _PageViewPageState extends State<PageViewPage> {
  int itemCount = 10;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("pageview演示"),
      ),
      body: PageView.builder(
        scrollDirection: Axis.vertical, // 滑动方向为垂直方向
        itemBuilder: (BuildContext context, int index) {
          return MyPage(text: "$index");
        },
        itemCount: 10,
      ),
    );
  }
}

class MyPage extends StatefulWidget {
  final String text;
  const MyPage({super.key, required this.text});

  @override
  State<MyPage> createState() => _MyPageState();
}

class _MyPageState extends State<MyPage> {
  @override
  Widget build(BuildContext context) {
    return Center(
      child: Text(widget.text, style: Theme.of(context).textTheme.headline1),
    );
  }
}
```

### 28.3、PageView 上拉无限加载的实现思路

思路：在 `onPageChanged` 中判断当前滑到的位置，当接近列表末尾（如 `index + 2 == _list.length`）时，通过 `setState` 向列表中追加新的页面。

```dart
import 'package:flutter/material.dart';

class PageViewPage extends StatefulWidget {
  const PageViewPage({super.key});

  @override
  State<PageViewPage> createState() => _PageViewPageState();
}

class _PageViewPageState extends State<PageViewPage> {
  final List<Widget> _list = [];

  @override
  void initState() {
    super.initState();
    for (var i = 0; i < 10; i++) {
      _list.add(MyPage(text: "$i"));
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("pageview演示"),
      ),
      body: PageView(
        scrollDirection: Axis.vertical, // 滑动方向为垂直方向
        onPageChanged: (index) {
          print(index);
          print(_list.length);
          if (index + 2 == _list.length) {
            setState(() {
              for (var i = 0; i < 10; i++) {
                _list.add(MyPage(text: "$i"));
              }
            });
          }
        },
        children: _list,
      ),
    );
  }
}

class MyPage extends StatefulWidget {
  final String text;
  const MyPage({super.key, required this.text});

  @override
  State<MyPage> createState() => _MyPageState();
}

class _MyPageState extends State<MyPage> {
  @override
  Widget build(BuildContext context) {
    return Center(
      child: Text(widget.text, style: Theme.of(context).textTheme.headline1),
    );
  }
}
```

### 28.4、PageView 实现一个无限轮播的轮播图

通过 `PageView.builder` 的 `itemCount` 设置一个很大的值，并用索引取模的方式循环复用页面，配合底部指示器即可实现无限轮播。

```dart
import 'package:flutter/material.dart';

class PageViewPage extends StatefulWidget {
  const PageViewPage({super.key});

  @override
  State<PageViewPage> createState() => _PageViewPageState();
}

class _PageViewPageState extends State<PageViewPage> {
  List<Widget> pageList = [];

  @override
  void initState() {
    List listData = [
      {"imageUrl": 'https://www.itying.com/images/flutter/1.png'},
      {"imageUrl": 'https://www.itying.com/images/flutter/2.png'},
      {"imageUrl": 'https://www.itying.com/images/flutter/3.png'}
    ];
    for (int i = 0; i < listData.length; ++i) {
      pageList.add(PicturePage(url: listData[i]["imageUrl"]));
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("pageview演示"),
      ),
      body: ListView(
        children: [Swiper(pageList: pageList)],
      ),
    );
  }
}

// Swiper组件
class Swiper extends StatefulWidget {
  final double width;
  final double height;
  final List<Widget> pageList;
  const Swiper(
      {super.key,
      this.width = double.infinity,
      this.height = 200,
      required this.pageList});

  @override
  State<Swiper> createState() => _SwiperState();
}

class _SwiperState extends State<Swiper> {
  int _currentPageIndex = 0;

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        SizedBox(
          width: double.infinity,
          height: 200,
          child: PageView.builder(
            onPageChanged: (int index) {
              setState(() {
                _currentPageIndex = index % (widget.pageList.length);
              });
            },
            itemCount: 10000,
            itemBuilder: (context, index) {
              return widget.pageList[index % (widget.pageList.length)];
            },
          ),
        ),
        Positioned(
          bottom: 10,
          left: 0,
          right: 0,
          child: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: List.generate(widget.pageList.length, (i) {
              return Container(
                margin: const EdgeInsets.fromLTRB(2, 0, 2, 0),
                width: 10,
                height: 10,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  color: _currentPageIndex == i ? Colors.blue : Colors.grey,
                ),
              );
            }).toList(),
          ),
        ),
      ],
    );
  }
}

// PicturePage 图片页面
class PicturePage extends StatefulWidget {
  final String url;
  final double width;
  final double height;
  const PicturePage(
      {super.key,
      required this.url,
      this.width = double.infinity,
      this.height = 200});

  @override
  State<PicturePage> createState() => _PicturePageState();
}

class _PicturePageState extends State<PicturePage> {
  @override
  Widget build(BuildContext context) {
    print(widget.url);
    return SizedBox(
      width: widget.width,
      height: widget.height,
      child: Image.network(widget.url, fit: BoxFit.cover),
    );
  }
}
```

要点：

- `itemCount: 10000` 配合 `index % pageList.length` 取模，实现页面的循环复用。
- 底部指示器通过 `Stack` + `Positioned` 叠加在轮播图上，当前页高亮显示。

### 28.5、Flutter 定时器

使用 `Timer.periodic` 创建周期性定时器，调用 `cancel()` 取消：

```dart
const timeout = Duration(seconds: 3);
var t = Timer.periodic(timeout, (timer) {
  print('afterTimer=' + DateTime.now().toString());
});
// timer.cancel(); // 也可以在回调中取消当前定时器
t.cancel(); // 取消定时器
```

组件销毁的时候取消定时器：

```dart
void dispose() {
  super.dispose();
  t.cancel();
}
```

> **提示**：定时器必须在组件销毁（`dispose`）时取消，否则会造成内存泄漏。

### 28.6、PageController animateToPage 自动切换页面

结合定时器和 `PageController.animateToPage`，让轮播图每隔 3 秒自动切换到下一页。

```dart
import 'dart:async';
import 'package:flutter/material.dart';

class PageViewPage extends StatefulWidget {
  const PageViewPage({super.key});

  @override
  State<PageViewPage> createState() => _PageViewPageState();
}

class _PageViewPageState extends State<PageViewPage> {
  List<Widget> pageList = [];

  @override
  void initState() {
    List listData = [
      {"imageUrl": 'https://www.itying.com/images/flutter/1.png'},
      {"imageUrl": 'https://www.itying.com/images/flutter/2.png'},
      {"imageUrl": 'https://www.itying.com/images/flutter/3.png'}
    ];
    for (int i = 0; i < listData.length; ++i) {
      pageList.add(PicturePage(url: listData[i]["imageUrl"]));
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("pageview演示"),
      ),
      body: ListView(
        children: [Swiper(pageList: pageList)],
      ),
    );
  }
}

// Swiper组件
class Swiper extends StatefulWidget {
  final double width;
  final double height;
  final List<Widget> pageList;
  const Swiper(
      {super.key,
      this.width = double.infinity,
      this.height = 200,
      required this.pageList});

  @override
  State<Swiper> createState() => _SwiperState();
}

class _SwiperState extends State<Swiper> {
  late PageController _pageController;
  int _currentPageIndex = 0;
  late Timer timer;

  @override
  void initState() {
    super.initState();
    _pageController = PageController(initialPage: 0);
    const timeout = Duration(seconds: 3);
    timer = Timer.periodic(timeout, (timer) {
      // 跳转
      _pageController.animateToPage(
        (_currentPageIndex + 1) % (widget.pageList.length),
        curve: Curves.linear,
        duration: const Duration(milliseconds: 200),
      );
    });
  }

  void dispose() {
    super.dispose();
    timer.cancel();
    _pageController.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        SizedBox(
          width: double.infinity,
          height: 200,
          child: PageView.builder(
            controller: _pageController,
            onPageChanged: (int index) {
              setState(() {
                _currentPageIndex = index % (widget.pageList.length);
              });
            },
            itemCount: 10000,
            itemBuilder: (context, index) {
              return widget.pageList[index % (widget.pageList.length)];
            },
          ),
        ),
        Positioned(
          bottom: 10,
          left: 0,
          right: 0,
          child: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: List.generate(widget.pageList.length, (i) {
              return Container(
                margin: const EdgeInsets.fromLTRB(2, 0, 2, 0),
                width: 10,
                height: 10,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  color: _currentPageIndex == i ? Colors.blue : Colors.grey,
                ),
              );
            }).toList(),
          ),
        ),
      ],
    );
  }
}

// PicturePage 图片页面
class PicturePage extends StatefulWidget {
  final String url;
  final double width;
  final double height;
  const PicturePage(
      {super.key,
      required this.url,
      this.width = double.infinity,
      this.height = 200});

  @override
  State<PicturePage> createState() => _PicturePageState();
}

class _PicturePageState extends State<PicturePage> {
  @override
  Widget build(BuildContext context) {
    print(widget.url);
    return SizedBox(
      width: widget.width,
      height: widget.height,
      child: Image.network(widget.url, fit: BoxFit.cover),
    );
  }
}
```

要点：

- `initState` 中创建 `PageController` 和定时器，定时回调里调用 `_pageController.animateToPage` 切换到下一页。
- `dispose` 中务必执行 `timer.cancel()` 和 `_pageController.dispose()` 释放资源。

### 28.7、AutomaticKeepAliveClientMixin 缓存 PageView 页面

上面的例子中，每次滑动都会触发子组件的 `build` 方法（会反复打印 `print(widget.url)`），可见 `PageView` 默认并没有缓存功能，一旦页面滑出屏幕它就会被销毁。实际项目开发中对页面进行缓存是很常见的需求，可以使用 `AutomaticKeepAliveClientMixin` 缓存页面。

> **提示**：使用时一定要注意是否必要，因为对所有列表项都缓存会导致更多的内存消耗。

```dart
import 'package:flutter/material.dart';
import '../res/listData.dart';

class PageViewPage extends StatefulWidget {
  const PageViewPage({super.key});

  @override
  State<PageViewPage> createState() => _PageViewPageState();
}

class _PageViewPageState extends State<PageViewPage> {
  List<Widget> children = <Widget>[];

  @override
  void initState() {
    super.initState();
    for (int i = 0; i < listData.length; ++i) {
      children.add(PicturePage(url: listData[i]["imageUrl"]));
    }
  }

  @override
  Widget build(BuildContext context) {
    print("build ");
    return Scaffold(
      appBar: AppBar(
        title: const Text("pageview演示"),
      ),
      body: ListView(
        children: [
          AspectRatio(
            aspectRatio: 16 / 9,
            child: PageView(
              // scrollDirection: Axis.vertical, // 滑动方向为垂直方向
              children: children,
            ),
          ),
          const Text("text组件")
        ],
      ),
    );
  }
}

// PicturePage子页面
class PicturePage extends StatefulWidget {
  final String url;
  const PicturePage({super.key, required this.url});

  @override
  State<PicturePage> createState() => _PicturePageState();
}

class _PicturePageState extends State<PicturePage>
    with AutomaticKeepAliveClientMixin {
  @override
  Widget build(BuildContext context) {
    print(widget.url);
    return Center(
      child: AspectRatio(
        aspectRatio: 16 / 9,
        child: Image.network(widget.url, fit: BoxFit.cover),
      ),
    );
  }

  @override
  bool get wantKeepAlive => true;
}
```

要点：子组件的 State 混入 `AutomaticKeepAliveClientMixin`，并重写 `wantKeepAlive` 返回 `true` 即可实现页面缓存。

### 28.8、自定义 KeepAliveWrapper 缓存页面

`AutomaticKeepAliveClientMixin` 可以快速实现页面缓存功能，但通过混入的方式实现不是很优雅，所以有必要对其进行封装：

```dart
import 'package:flutter/material.dart';

class KeepAliveWrapper extends StatefulWidget {
  const KeepAliveWrapper(
      {Key? key, @required this.child, this.keepAlive = true})
      : super(key: key);
  final Widget? child;
  final bool keepAlive;

  @override
  State<KeepAliveWrapper> createState() => _KeepAliveWrapperState();
}

class _KeepAliveWrapperState extends State<KeepAliveWrapper>
    with AutomaticKeepAliveClientMixin {
  @override
  Widget build(BuildContext context) {
    return widget.child!;
  }

  @override
  bool get wantKeepAlive => widget.keepAlive;

  @override
  void didUpdateWidget(covariant KeepAliveWrapper oldWidget) {
    if (oldWidget.keepAlive != widget.keepAlive) {
      // keepAlive 状态需要更新，实现在 AutomaticKeepAliveClientMixin 中
      updateKeepAlive();
    }
    super.didUpdateWidget(oldWidget);
  }
}
```

> **提示**：这里使用了 `covariant` 协变关键字，感兴趣可以研究一下 Dart 的 covariant。

---

## 二十九、Flutter Key 详解

我们平时接触过很多 Widget，比如 `Container`、`Row`、`Column` 等。几乎每个 Widget 的构造函数中都有一个共同的、通常位于参数列表第一位的参数——Key。

在 Flutter 中，Key 是不能重复使用的，所以 Key 一般用来做唯一标识。组件在更新的时候，其状态的保存主要是通过判断组件的类型或 key 值是否一致。当各组件的类型不同的时候，类型已经足够用来区分不同的组件，此时可以不必使用 key；但如果同时存在多个同一类型的控件，类型已经无法作为区分条件，就需要使用到 key。

### 29.1、没有 Key 会发生什么奇怪现象

定义了一个 StatefulWidget 的 Box，点击 Box 的时候可以改变 Box 里面的数字，但当我们对 Box 重新排序时，Flutter 无法识别到 Box 的变化。

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: const MyHomePage(),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key});

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  List<Widget> list = [
    Box(color: Colors.blue),
    Box(color: Colors.red),
    Box(color: Colors.orange)
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          setState(() {
            list.shuffle(); // 打乱list的顺序
          });
        },
        child: const Icon(Icons.refresh),
      ),
      appBar: AppBar(
        title: const Text('Title'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: list,
        ),
      ),
    );
  }
}

class Box extends StatefulWidget {
  Color color;
  Box({super.key, required this.color});

  @override
  State<Box> createState() => _BoxState();
}

class _BoxState extends State<Box> {
  int _count = 0;

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: 100,
      width: 100,
      child: ElevatedButton(
        style: ButtonStyle(
            backgroundColor: MaterialStateProperty.all(widget.color)),
        onPressed: () {
          setState(() {
            _count++;
          });
        },
        child: Center(
          child: Text("$_count"),
        ),
      ),
    );
  }
}
```

运行后我们发现：改变 list 中 Widget 的顺序后，Widget 的颜色会变化，但每个 Widget 里面的文本内容并没有变化。原因是：当 List 重新排序后，Flutter 检测到了 Widget 的顺序变化，所以重新绘制 List Widget；但 Flutter 发现 List Widget 里面的元素（类型和参数）没有变化，所以不会改变 Widget 里面的内容。

如果把 List 里面 Box 的颜色改成一样的，重新排序后虽然执行了 `setState`，但代码和以前是一样的，Flutter 也不会重构 List Widget 里面的内容——Flutter 没法通过 Box 传入的参数来识别 Box 是否改变。要让 Flutter 能识别到 List Widget 子元素的改变，就需要给每个 Box 指定一个 key：

```dart
List<Widget> list = [
  Box(color: Colors.blue),
  Box(color: Colors.blue),
  Box(color: Colors.blue)
];
```

### 29.2、Flutter key：LocalKey、GlobalKey

在 Flutter 中，Key 不能重复使用，一般用来做唯一标识。组件更新时，状态的保存主要通过判断组件的类型或 key 值是否一致。当组件类型各不相同时，类型已足够区分，不必使用 key；当同时存在多个同一类型的控件时，就需要使用 key。

Flutter key 的子类包含 LocalKey 和 GlobalKey：

- **局部键（LocalKey）**：`ValueKey`、`ObjectKey`、`UniqueKey`
- **全局键（GlobalKey）**：`GlobalKey`、`GlobalObjectKey`

- **`ValueKey`（值 key）**：把一个值作为 key
- **`UniqueKey`（唯一 key）**：程序生成唯一的 Key，当我们不知道如何指定 ValueKey 时就可以使用 UniqueKey
- **`ObjectKey`（对象 key）**：把一个对象实例作为 key
- **`GlobalKey`（全局 key）**：GlobalObjectKey 与 ObjectKey 有点类似，但作用域是全局的

#### 29.1.1、LocalKey 改造上面的例子

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: const MyHomePage(),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key});

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  List<Widget> list = [
    Box(
      key: const ValueKey(1),
      color: Colors.blue,
    ),
    Box(
      key: ObjectKey(Box(color: Colors.red)),
      color: Colors.red,
    ),
    Box(
      key: UniqueKey(), // 程序自动生成一个key
      color: Colors.orange,
    )
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          setState(() {
            list.shuffle(); // 打乱list的顺序
          });
        },
        child: const Icon(Icons.refresh),
      ),
      appBar: AppBar(
        title: const Text('Title'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: list,
        ),
      ),
    );
  }
}

class Box extends StatefulWidget {
  Color color;
  Box({super.key, required this.color});

  @override
  State<Box> createState() => _BoxState();
}

class _BoxState extends State<Box> {
  int _count = 0;

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: 100,
      width: 100,
      child: ElevatedButton(
        style: ButtonStyle(
            backgroundColor: MaterialStateProperty.all(widget.color)),
        onPressed: () {
          setState(() {
            _count++;
          });
        },
        child: Center(
          child: Text("$_count"),
        ),
      ),
    );
  }
}
```

#### 29.1.2、GlobalKey 的使用

如果把 LocalKey 比作局部变量，GlobalKey 就类似于全局变量。

下面使用了 LocalKey，当屏幕状态改变时把 `Column` 换成了 `Row`，Box 的状态就会丢失：

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: const MyHomePage(),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key});

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  List<Widget> list = [
    Box(
      key: const ValueKey(1),
      color: Colors.blue,
    ),
    Box(
      key: ObjectKey(Box(color: Colors.red)),
      color: Colors.red,
    ),
    Box(
      key: UniqueKey(), // 程序自动生成一个key
      color: Colors.orange,
    )
  ];

  @override
  Widget build(BuildContext context) {
    print(MediaQuery.of(context).orientation);
    return Scaffold(
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          setState(() {
            list.shuffle(); // 打乱list的顺序
          });
        },
        child: const Icon(Icons.refresh),
      ),
      appBar: AppBar(
        title: const Text('Title'),
      ),
      body: Center(
        child: MediaQuery.of(context).orientation == Orientation.portrait
            ? Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: list,
              )
            : Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: list,
              ),
      ),
    );
  }
}

class Box extends StatefulWidget {
  Color color;
  Box({super.key, required this.color});

  @override
  State<Box> createState() => _BoxState();
}

class _BoxState extends State<Box> {
  int _count = 0;

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: 100,
      width: 100,
      child: ElevatedButton(
        style: ButtonStyle(
            backgroundColor: MaterialStateProperty.all(widget.color)),
        onPressed: () {
          setState(() {
            _count++;
          });
        },
        child: Center(
          child: Text("$_count"),
        ),
      ),
    );
  }
}
```

前面介绍过，Widget 状态的保存主要通过判断组件的类型或 key 值是否一致。LocalKey 只在当前的组件树有效，所以把 `Column` 换成 `Row` 的时候 Widget 的状态就丢失了。为了解决这个问题可以使用 GlobalKey。

GlobalKey 优化：把 LocalKey 换成 GlobalKey，如下：

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: const MyHomePage(),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key});

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  List<Widget> list = [];
  final GlobalKey _key1 = GlobalKey();
  final GlobalKey _key2 = GlobalKey();
  final GlobalKey _key3 = GlobalKey();

  @override
  void initState() {
    super.initState();
    list = [
      Box(
        key: _key1,
        color: Colors.blue,
      ),
      Box(
        key: _key2,
        color: Colors.red,
      ),
      Box(
        key: _key3,
        color: Colors.orange,
      )
    ];
  }

  @override
  Widget build(BuildContext context) {
    print(MediaQuery.of(context).orientation);
    return Scaffold(
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          setState(() {
            list.shuffle(); // 打乱list的顺序
          });
        },
        child: const Icon(Icons.refresh),
      ),
      appBar: AppBar(
        title: const Text('Title'),
      ),
      body: Center(
        child: MediaQuery.of(context).orientation == Orientation.portrait
            ? Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: list,
              )
            : Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: list,
              ),
      ),
    );
  }
}

class Box extends StatefulWidget {
  Color color;
  Box({super.key, required this.color});

  @override
  State<Box> createState() => _BoxState();
}

class _BoxState extends State<Box> {
  int _count = 0;

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: 100,
      width: 100,
      child: ElevatedButton(
        style: ButtonStyle(
            backgroundColor: MaterialStateProperty.all(widget.color)),
        onPressed: () {
          setState(() {
            _count++;
          });
        },
        child: Center(
          child: Text("$_count"),
        ),
      ),
    );
  }
}
```

### 29.3、GlobalKey 获取子组件

- `globalKey.currentState` 可以获取子组件的状态，执行子组件的方法
- `globalKey.currentWidget` 可以获取子组件的属性
- `globalKey.currentContext!.findRenderObject()` 可以获取渲染的属性

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: const HomePage(),
    );
  }
}

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  final GlobalKey _globalKey = GlobalKey();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      floatingActionButton: FloatingActionButton(
        child: const Icon(Icons.add),
        onPressed: () {
          // 1、获取子组件的状态 调用子组件的属性
          var state = (_globalKey.currentState as _BoxState);
          setState(() {
            state._count++;
          });

          // 2、获取子组件的属性
          var box = (_globalKey.currentWidget as Box);
          print(box.color);

          // 3、获取子组件渲染的属性
          var renderBox =
              (_globalKey.currentContext!.findRenderObject() as RenderBox);
          print(renderBox.size);
        },
      ),
      appBar: AppBar(
        title: const Text('Title'),
      ),
      body: Center(
        child: Box(
          key: _globalKey,
          color: Colors.red,
        ),
      ),
    );
  }
}

class Box extends StatefulWidget {
  final Color color;
  const Box({Key? key, required this.color}) : super(key: key);

  @override
  State<Box> createState() => _BoxState();
}

class _BoxState extends State<Box> {
  int _count = 0;

  run() {
    print("run");
  }

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: 100,
      width: 100,
      child: ElevatedButton(
        style: ButtonStyle(
            backgroundColor: MaterialStateProperty.all(widget.color)),
        onPressed: () {
          setState(() {
            _count++;
          });
        },
        child: Center(
          child: Text("$_count"),
        ),
      ),
    );
  }
}
```

### 29.4、Widget Tree、Element Tree 和 RenderObject Tree

Flutter 应用是由 Widget Tree、Element Tree 和 RenderObject Tree 组成的。Widget 可以理解成一个类，Element 可以理解成 Widget 的实例，Widget 与 Element 的关系可以是一对多，一份配置可以创造多个 Element 实例。

| 概念         | 描述                                                                                                |
| ------------ | --------------------------------------------------------------------------------------------------- |
| Widget       | 就是一个类，是 Element 的配置信息。与 Element 的关系可以是一对多，一份配置可以创造多个 Element 实例 |
| Element      | Widget 的实例化，内部持有 Widget 和 RenderObject                                                    |
| RenderObject | 负责渲染绘制                                                                                        |

默认情况下，当 Flutter 中同一个 Widget 的大小、顺序变化时，Flutter 不会改变 Widget 的 state。

---

## 三十、AnimatedList 实现动态列表

### 30.1、AnimatedList 实现动画

`AnimatedList` 和 `ListView` 的功能大体相似，不同的是，`AnimatedList` 可以在列表中插入或删除节点时执行一个动画，在需要添加或删除列表项的场景中会提高用户体验。

`AnimatedList` 是一个 StatefulWidget，它对应的 State 类型为 `AnimatedListState`，添加和删除元素的方法位于 `AnimatedListState` 中：

```dart
void insertItem(int index, {Duration duration = _kDuration});
void removeItem(int index, AnimatedListRemovedItemBuilder builder,
    {Duration duration = _kDuration});
```

AnimatedList 常见属性：

| 属性               | 描述                                                             |
| ------------------ | ---------------------------------------------------------------- |
| `key`              | globalKey，如 `final globalKey = GlobalKey();`                   |
| `initialItemCount` | 子元素数量                                                       |
| `itemBuilder`      | 方法 `(BuildContext context, int index, Animation animation) {}` |

> **提示**：每个 Widget 都对应一个 Element，我们可以直接对 Widget 进行操作，但是无法直接操作 Widget 对应的 Element。而 GlobalKey 就是那把直接访问 Element 的钥匙，通过 GlobalKey 可以获取到 Widget 对应的 Element。

### 30.2、AnimatedList 增加列表 FadeTransition、ScaleTransition

FadeTransition Demo：

```dart
import 'package:flutter/material.dart';

class AnimatedListPage extends StatefulWidget {
  const AnimatedListPage({super.key});

  @override
  State<AnimatedListPage> createState() => _AnimatedListPageState();
}

class _AnimatedListPageState extends State<AnimatedListPage> {
  final globalKey = GlobalKey<AnimatedListState>();
  List<String> list = ["第一条数据", "第二条数据"];

  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          list.add("这是一个数据");
          globalKey.currentState!.insertItem(list.length - 1);
        },
        child: const Icon(Icons.add),
      ),
      appBar: AppBar(
        title: const Text("AppBar组件"),
      ),
      body: AnimatedList(
        key: globalKey,
        initialItemCount: list.length,
        itemBuilder: (context, index, animation) {
          return FadeTransition(
            opacity: animation,
            child: ListTile(
              title: Text(list[index]),
              trailing: Icon(Icons.delete),
            ),
          );
        },
      ),
    );
  }
}
```

ScaleTransition Demo：

```dart
import 'package:flutter/material.dart';

class AnimatedListPage extends StatefulWidget {
  const AnimatedListPage({super.key});

  @override
  State<AnimatedListPage> createState() => _AnimatedListPageState();
}

class _AnimatedListPageState extends State<AnimatedListPage> {
  final globalKey = GlobalKey<AnimatedListState>();
  List<String> list = ["第一条数据", "第二条数据"];

  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          list.add("这是一个数据");
          globalKey.currentState!.insertItem(list.length - 1);
        },
        child: const Icon(Icons.add),
      ),
      appBar: AppBar(
        title: const Text("AppBar组件"),
      ),
      body: AnimatedList(
        key: globalKey,
        initialItemCount: list.length,
        itemBuilder: (context, index, animation) {
          print(animation);
          return ScaleTransition(
            scale: animation,
            child: ListTile(
              title: Text(list[index]),
              trailing: Icon(Icons.delete),
            ),
          );
        },
      ),
    );
  }
}
```

要点：点击 FloatingActionButton 时通过 `globalKey.currentState!.insertItem()` 插入新列表项，`itemBuilder` 中的 `animation` 分别传入 `FadeTransition`（淡入）或 `ScaleTransition`（缩放）实现不同的插入动画。

### 30.3、AnimatedList 删除列表

```dart
import 'dart:async';
import 'package:flutter/material.dart';

class AnimatedListPage extends StatefulWidget {
  const AnimatedListPage({super.key});

  @override
  State<AnimatedListPage> createState() => _AnimatedListPageState();
}

class _AnimatedListPageState extends State<AnimatedListPage> {
  final globalKey = GlobalKey<AnimatedListState>();
  bool flag = true;
  List<String> list = ["第一条数据", "第二条数据"];

  @override
  void initState() {
    super.initState();
  }

  Widget _buildItem(context, index) {
    return ListTile(
      key: ValueKey(index),
      title: Text(list[index]),
      trailing: IconButton(
        icon: Icon(Icons.delete),
        // 点击时删除
        onPressed: () => _deleteItem(context, index),
      ),
    );
  }

  _deleteItem(context, index) {
    if (flag == true) {
      flag = false;
      print(index);
      // 注意：删除后需要重新setState
      setState(() {
        // 删除过程执行的是反向动画，animation.value 会从1变为0
        globalKey.currentState!.removeItem(index, (context, animation) {
          // 注意先build然后再去删除
          var item = _buildItem(context, index);
          list.removeAt(index);
          return FadeTransition(
            opacity: animation,
            child: item,
          );
        }, duration: Duration(milliseconds: 500));
      });
      // 解决快速删除bug 重置flag
      const timeout = Duration(milliseconds: 600);
      Timer.periodic(timeout, (timer) {
        flag = true;
        timer.cancel();
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          // 增加 animation.value 会从0变为1
          list.add("这是一个数据");
          globalKey.currentState!.insertItem(list.length - 1);
        },
        child: const Icon(Icons.add),
      ),
      appBar: AppBar(
        title: const Text("AppBar组件"),
      ),
      body: AnimatedList(
        key: globalKey,
        initialItemCount: list.length,
        itemBuilder: (context, index, animation) {
          return FadeTransition(
            opacity: animation,
            child: _buildItem(context, index),
          );
        },
      ),
    );
  }
}
```

要点：

- 删除时通过 `globalKey.currentState!.removeItem()` 执行反向动画（`animation.value` 从 1 变为 0），回调中先构建要删除的 item，再从 `list` 中 `removeAt` 移除数据。
- 使用 `flag` 标记配合延时重置，避免快速连续点击删除导致的 bug。
