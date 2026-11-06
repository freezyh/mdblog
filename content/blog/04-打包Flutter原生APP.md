---
title: 04 · 打包 Flutter 原生 APP（Android / iOS）+ assets 静态资源
description: 打包 Flutter 原生 APP（Android / iOS）+ assets 静态资源
date: 2026-11-6
year: 2026
---

# 04 · 打包 Flutter 原生 APP（Android / iOS）+ assets 静态资源

---

## 1. Android：Flutter 安装配置 & 真机调试

**用法**：配置应用包名、版本号、权限等在 Android 原生工程里修改。

**关键文件**：`android/app/build.gradle`、`android/app/src/main/AndroidManifest.xml`

```groovy
// android/app/build.gradle
android {
    namespace "com.example.myapp"
    compileSdk flutter.compileSdkVersion

    defaultConfig {
        applicationId "com.itying.myapp"     // 应用唯一包名（上架用）
        minSdkVersion 21
        targetSdkVersion flutter.targetSdkVersion
        versionCode 1                        // 内部版本号，每次发版 +1
        versionName "1.0.0"                  // 用户看到的版本名
    }
    signingConfigs {
        release {
            keyAlias 'mykey'
            keyPassword '123456'
            storeFile file('my-release-key.jks')
            storePassword '123456'
        }
    }
    buildTypes {
        release {
            signingConfig signingConfigs.release    // 打正式包必须配置签名
        }
    }
}
```

```xml
<!-- AndroidManifest.xml：网络、相机等权限 -->
<uses-permission android:name="android.permission.INTERNET"/>
<uses-permission android:name="android.permission.CAMERA"/>
```

**真机调试**：

```bash
adb devices              # 确认设备已连接（需开启 USB 调试）
flutter run -d <设备id>   # 指定设备运行
flutter logs             # 查看日志
```

---

## 2. Android：打包 apk / aab

**用法**：先生成签名文件，再打包。

```bash
# 1) 生成签名密钥（keytool 是 JDK 自带的）
keytool -genkey -v -keystore my-release-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias mykey

# 2) 打 release apk（默认所有架构合一）
flutter build apk --release

# 3) 按架构分包（包更小）
flutter build apk --split-per-abi     # 产物在 build/app/outputs/flutter-apk/

# 4) 打 aab（上架 Google Play 用）
flutter build appbundle
```

---

## 3. iOS：打包（Xcode）

**用法**：iOS 只能在 Mac 上打包。`flutter build ipa` 生成签名包，再通过 Xcode / Transporter 上传。

```bash
flutter build ipa --release          # 产物: build/ios/archive/*.xcarchive → 导出 ipa
open ios/Runner.xcworkspace          # 用 Xcode 打开工程做签名配置
```

Xcode 中需要配置：

1. **Signing & Capabilities**：Team（登录 Apple 开发者账号）、Bundle Identifier（唯一包名）。
2. **App Icons**：`ios/Runner/Assets.xcassets/AppIcon.appiconset` 放各种尺寸图标。
3. **Launch Screen**：`Assets.xcassets/LaunchImage.imageset` 配置启动图。
4. **Info.plist**：配置权限描述（相机、定位等，缺了直接闪退）：

```xml
<key>NSCameraUsageDescription</key>
<string>需要使用相机扫描二维码</string>
<key>NSLocationWhenInUseUsageDescription</key>
<string>需要获取位置推荐附近商品</string>
```

---

## 4. 上传 App Store

**用法**：打包 ipa → TestFlight 内测 → 提审。

```bash
# 方式1：命令行校验并上传
xcrun altool --validate-app -f Runner.ipa -t ios -u 账号 -p 密码
xcrun altool --upload-app -f Runner.ipa -t ios -u 账号 -p 密码
```

- 方式2：Xcode → Product → Archive → Distribute App。
- 方式3：Transporter App 拖入 ipa 上传。
- 上传后在 App Store Connect 提交审核（截图、描述、隐私政策必填）。

---

## 5. assets 静态资源（图片、字体、json）

**用法**：在 `pubspec.yaml` 声明，代码用 `Image.asset` / `rootBundle` 读取。

```yaml
flutter:
  uses-material-design: true
  assets:
    - images/logo.png       # 单个文件
    - images/               # 整个目录（不含子目录）
  fonts:
    - family: CustomFont
      fonts:
        - asset: fonts/custom.ttf
```

```dart
Image.asset('images/logo.png', width: 100),
TextStyle(fontFamily: 'CustomFont'),

// 读取 json 资源（如城市数据）
String raw = await rootBundle.loadString('assets/data/city.json');
var list = jsonDecode(raw);
```

改完 pubspec.yaml 记得 `flutter pub get`。

---

## 6. App 连接网络（权限 + dio 最小示例）

**用法**：Android 需 INTERNET 权限（release 包默认有）；iOS 需在 Info.plist 允许 HTTP 的话配 `NSAppTransportSecurity`。

```dart
import 'package:dio/dio.dart';

final dio = Dio(BaseOptions(
  baseUrl: 'https://api.example.com',
  connectTimeout: const Duration(seconds: 10),
  headers: {'Authorization': 'Bearer $token'},
));

Future<List> getGoods() async {
  var res = await dio.get('/api/goods', queryParameters: {'page': 1});
  return res.data['result'];     // 按后端结构取
}
```

> HTTPS 证书问题：debug 可以忽略，release 请使用合法证书。

---

## 7. 发布检查清单（常见坑）

| 项目   | Android                    | iOS                             |
| ------ | -------------------------- | ------------------------------- |
| 包名   | applicationId              | Bundle Identifier               |
| 版本号 | versionCode / versionName  | pubspec.yaml `version: 1.0.0+1` |
| 签名   | jks + build.gradle         | Xcode Team 证书                 |
| 权限   | AndroidManifest.xml        | Info.plist                      |
| 图标   | ic_launcher                | AppIcon.appiconset              |
| 启动图 | drawable/splash            | LaunchImage                     |
| 混淆   | proguard（可配）           | 一般不需要                      |
| 上架   | 各大应用市场 / Google Play | App Store Connect               |

> 提示：`pubspec.yaml` 里的 `version: 1.0.0+1` 会同步到两端，`+` 后面是 build 号。
