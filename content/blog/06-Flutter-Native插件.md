---
title: 06 · Flutter Native（原生专属能力 + 常用插件）
description: Flutter Native（原生专属能力 + 常用插件）
date: 2026-11-6
year: 2026
moddifyDate: "2026-11-6 10:27:53"
---

# 06 · Flutter Native（原生专属能力 + 常用插件）

> 大纲第 5 部分：原生 Api、解析 Html、WebView、拍照上传、二维码、网络检测、定位、文件、升级、视频、存储、浏览器/电话/短信、屏幕适配、Dialog/Toast、分享、Getx、表单验证等。

---

## 1. 读取设备信息（device_info_plus）

```yaml
dependencies: { device_info_plus: ^9.1.0 }
```

```dart
import 'dart:io';
import 'package:device_info_plus/device_info_plus.dart';

Future<void> getDeviceInfo() async {
  final info = DeviceInfoPlugin();
  if (Platform.isAndroid) {
    var android = await info.androidInfo;
    print('型号: ${android.model}, 系统: ${android.version.release}');
  } else if (Platform.isIOS) {
    var ios = await info.iosInfo;
    print('机型: ${ios.name}, 版本: ${ios.systemVersion}');
  }
}
```

---

## 2. 解析 HTML（html 包）

**用法**：爬取/解析网页内容或富文本数据。

```yaml
dependencies: { html: ^0.15.4 }
```

```dart
import 'package:html/parser.dart' as htmlParser;

var res = await dio.get('https://example.com/list');
var document = htmlParser.parse(res.data);
var titles = document.querySelectorAll('.item-title')
    .map((e) => e.text.trim()).toList();
print(titles);
```

---

## 3. WebView 内嵌网页（webview_flutter）

```yaml
dependencies: { webview_flutter: ^4.4.0 }
```

```dart
import 'package:webview_flutter/webview_flutter.dart';

class WebViewPage extends StatefulWidget {
  final String url;
  const WebViewPage({super.key, required this.url});

  @override
  State<WebViewPage> createState() => _WebViewPageState();
}

class _WebViewPageState extends State<WebViewPage> {
  late final WebViewController _controller;

  @override
  void initState() {
    super.initState();
    _controller = WebViewController()
      ..setJavaScriptMode(JavaScriptMode.unrestricted)
      ..loadRequest(Uri.parse(widget.url));
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('活动页')),
      body: WebViewWidget(controller: _controller),
    );
  }
}
```

---

## 4. 拍照 / 相册选图 / 上传图片（image_picker + dio）

```yaml
dependencies:
  image_picker: ^1.0.4
  dio: ^5.4.0
```

```dart
import 'dart:io';
import 'package:image_picker/image_picker.dart';

final picker = ImagePicker();

// 拍照
Future<void> takePhoto() async {
  var photo = await picker.pickImage(source: ImageSource.camera, imageQuality: 80);
  if (photo != null) setState(() => File(photo.path));   // XFile -> File 直接显示
}

// 相册选图（多选）
Future<void> pickImages() async {
  var images = await picker.pickMultiImage(imageQuality: 80);
  print(images.map((e) => e.path));
}

// 上传（FormData + MultipartFile，头像/商品图上传通用）
Future<void> upload(String filePath) async {
  var form = FormData.fromMap({
    'file': await MultipartFile.fromFile(filePath, filename: 'avatar.jpg'),
  });
  var res = await dio.post('/api/upload', data: form);
  print(res.data['url']);     // 服务器返回的图片地址
}
```

---

## 5. 二维码：扫描（mobile_scanner）与生成（qr_flutter）

```yaml
dependencies:
  mobile_scanner: ^3.5.0
  qr_flutter: ^4.1.0
```

```dart
// 1) 扫码页面
import 'package:mobile_scanner/mobile_scanner.dart';

MobileScanner(
  onDetect: (capture) {
    final code = capture.barcodes.first.rawValue;
    if (code != null) {
      Navigator.pop(context, code);    // 扫码充电桩/商品码后返回
    }
  },
)

// 2) 生成二维码（会员码、支付码）
QrImageView(
  data: 'https://example.com/pay?order=1001',
  size: 200,
  backgroundColor: Colors.white,
)
```

---

## 6. 检测网络状态（connectivity_plus）

```dart
import 'package:connectivity_plus/connectivity_plus.dart';

Future<void> checkNetwork() async {
  var results = await Connectivity().checkConnectivity();
  if (results.contains(ConnectivityResult.wifi)) {
    print('WiFi');
  } else if (results.contains(ConnectivityResult.mobile)) {
    print('移动网络');
  } else {
    print('无网络');   // 提示检查网络
  }
}

// 监听网络变化（视频 App 弱网提示常用）
Connectivity().onConnectivityChanged.listen((r) {
  if (r.contains(ConnectivityResult.none)) showNoNetworkTip();
});
```

---

## 7. 位置定位（geolocator）

```yaml
dependencies: { geolocator: ^10.1.0 }
```

```dart
import 'package:geolocator/geolocator.dart';

Future<Position> getLocation() async {
  var permission = await Geolocator.requestPermission();
  var position = await Geolocator.getCurrentPosition(
    desiredAccuracy: LocationAccuracy.high);
  print('经度:${position.longitude} 纬度:${position.latitude}');
  return position;
}

// 计算两点距离（门店距离显示）
double m = Geolocator.distanceBetween(22.5, 114.0, 22.6, 114.1);   // 米
```

> 百度定位/地图见第 07 章。

---

## 8. 手机文件读写（path_provider）

```yaml
dependencies:
  path_provider: ^2.1.1
  dio: ^5.4.0
```

```dart
import 'dart:io';
import 'package:path_provider/path_provider.dart';

// 下载文件到本地（升级包、视频缓存）
Future<File> downloadFile(String url, String filename) async {
  var dir = await getTemporaryDirectory();          // 缓存目录
  var savePath = '${dir.path}/$filename';
  await dio.download(url, savePath);
  return File(savePath);
}

// 应用文档目录（存用户文件）
var docDir = await getApplicationDocumentsDirectory();
```

---

## 9. App 自动升级（版本对比 + 下载安装）

**用法**：启动时请求版本接口 → 与本地版本比较 → 提示下载 apk → 安装（open_filex）。

```yaml
dependencies:
  package_info_plus: ^4.1.0
  open_filex: ^4.4.0
```

```dart
Future<void> checkUpdate() async {
  var info = await PackageInfo.fromPlatform();
  var localVersion = info.version;                       // 如 1.0.0

  var res = await dio.get('/api/app/version');
  var remoteVersion = res.data['version'];               // 如 1.1.0

  if (remoteVersion != localVersion) {
    var ok = await showDialog(...);                      // 弹窗提示新版本
    if (ok == true) {
      var file = await downloadFile(res.data['apkUrl'], 'update.apk');
      await OpenFilex.open(file.path);                   // 唤起系统安装（Android）
    }
  }
}
```

> iOS 不能自更新，升级弹窗改为跳 App Store 链接。

---

## 10. 视频播放（video_player + chewie）

```yaml
dependencies:
  video_player: ^2.8.0
  chewie: ^1.7.0
```

```dart
import 'package:chewie/chewie.dart';
import 'package:video_player/video_player.dart';

class VideoPage extends StatefulWidget {
  final String url;
  const VideoPage({super.key, required this.url});

  @override
  State<VideoPage> createState() => _VideoPageState();
}

class _VideoPageState extends State<VideoPage> {
  late VideoPlayerController _player;
  late ChewieController _chewie;

  @override
  void initState() {
    super.initState();
    _player = VideoPlayerController.networkUrl(Uri.parse(widget.url));
    _chewie = ChewieController(
      videoPlayerController: _player,
      autoPlay: true,
      looping: false,
      aspectRatio: 16 / 9,
    );
    _player.initialize();
  }

  @override
  Widget build(BuildContext context) => Chewie(controller: _chewie);

  @override
  void dispose() {
    _player.dispose();
    _chewie.dispose();
    super.dispose();
  }
}
```

---

## 11. 本地存储（shared_preferences）

**用法**：轻量 KV 存储（token、用户设置）；复杂数据用 sqflite/Realm（见 07 章）。

```dart
final sp = await SharedPreferences.getInstance();
await sp.setString('token', 'xxx');
await sp.setInt('cartCount', 3);
await sp.setBool('darkMode', true);

String? token = sp.getString('token');
await sp.remove('token');
await sp.clear();
```

---

## 12. 打开外部浏览器 / 拨打电话 / 发短信（url_launcher）

```yaml
dependencies: { url_launcher: ^6.2.0 }
```

```dart
import 'package:url_launcher/url_launcher.dart';

launchUrl(Uri.parse('https://m.example.com'));       // 浏览器
launchUrl(Uri.parse('tel:10086'));                   // 拨打电话
launchUrl(Uri.parse('sms:10086?body=查询话费'));       // 发短信
launchUrl(Uri.parse('mailto:support@example.com'));  // 发邮件
```

---

## 13. 屏幕适配（flutter_screenutil）

```yaml
dependencies: { flutter_screenutil: ^5.9.0 }
```

```dart
// 设计稿 750x1334
ScreenUtilInit(
  designSize: const Size(750, 1334),
  builder: (context, child) => MaterialApp(home: HomePage()),
);

// 使用：按设计稿像素写，自动缩放
Container(
  width: 200.w, height: 88.w,
  margin: EdgeInsets.all(24.w),
  child: Text('标题', style: TextStyle(fontSize: 32.sp)),
);
```

---

## 14. Dialog / Toast（fluttertoast）

```yaml
dependencies: { fluttertoast: ^8.2.0 }
```

```dart
Fluttertoast.showToast(
  msg: '网络请求失败',
  toastLength: Toast.LENGTH_SHORT,
  gravity: ToastGravity.CENTER,
  backgroundColor: Colors.black54,
);

// 加载框
showDialog(
  barrierDismissible: false,
  context: context,
  builder: (_) => const Center(child: CircularProgressIndicator()),
);
Navigator.pop(context);   // 关闭
```

---

## 15. 微信好友 / 朋友圈分享（fluwx，思路）

**用法**：接入微信 OpenSDK 插件，需要微信开放平台 AppID。

```yaml
dependencies: { fluwx: ^4.5.0 }
```

```dart
await registerWxApi(appId: 'wx1234567890', universalLink: 'https://xxx');

shareToWeChat(WeChatShareTextModel('分享文案', scene: WeChatScene.SESSION));   // 好友
shareToWeChat(WeChatShareImageModel(image, scene: WeChatScene.TIMELINE));     // 朋友圈
```

> 需在微信开放平台配置应用签名和 universalLink（iOS）。

---

## 16. GetX 状态管理（计数器 / 跨页面共享 / 路由）

**用法**：`Get.put` 注入控制器，`GetBuilder`/`Obx` 刷新；`Get.toNamed` 免 context 路由。

```yaml
dependencies: { get: ^4.6.6 }
```

```dart
class CounterController extends GetxController {
  var count = 0.obs;                       // .obs 可观察变量
  void add() => count++;
}

// 页面
final c = Get.put(CounterController());
Obx(() => Text('${c.count.value}')),

// 免 context 路由
Get.toNamed('/goods', arguments: {'id': 1});
Get.back();
// 弹窗
Get.snackbar('标题', '内容');
Get.dialog(AlertDialog(title: Text('提示')));
```

---

## 17. 表单验证（Form / TextFormField）

**用法**：登录注册表单校验的通用模板。

```dart
final _formKey = GlobalKey<FormState>();
TextEditingController phoneCtrl = TextEditingController();

Form(
  key: _formKey,
  child: Column(children: [
    TextFormField(
      controller: phoneCtrl,
      keyboardType: TextInputType.phone,
      decoration: const InputDecoration(hintText: '请输入手机号', icon: Icon(Icons.phone)),
      validator: (v) {
        if (v == null || v.isEmpty) return '手机号不能为空';
        if (!RegExp(r'^1[3-9]\d{9}$').hasMatch(v)) return '手机号格式不正确';
        return null;      // 校验通过
      },
    ),
    TextFormField(
      obscureText: true,
      decoration: const InputDecoration(hintText: '请输入密码'),
      validator: (v) => (v?.length ?? 0) < 6 ? '密码至少6位' : null,
    ),
    ElevatedButton(
      onPressed: () {
        if (_formKey.currentState!.validate()) {
          doLogin(phoneCtrl.text);       // 全部校验通过
        }
      },
      child: const Text('登录'),
    ),
  ]),
)
```

---

## 18. 平台判断（Platform）

```dart
import 'dart:io';

if (Platform.isAndroid) {
  // 走 Android 特有逻辑（如 MethodChannel 调原生）
} else if (Platform.isIOS) {
  // iOS 逻辑
}

// UI 层判断（iOS 导航栏风格）
TargetPlatform p = Theme.of(context).platform;
```

---

## 19. 生物认证（指纹 / 人脸，local_auth）

```yaml
dependencies: { local_auth: ^2.1.7 }
```

```dart
import 'package:local_auth/local_auth.dart';

final auth = LocalAuthentication();

Future<void> authLogin() async {
  bool canCheck = await auth.canCheckBiometrics;
  if (canCheck) {
    bool ok = await auth.authenticate(
      localizedReason: '请验证指纹/人脸以进入应用',
      options: const AuthenticationOptions(biometricOnly: true, stickyAuth: true),
    );
    if (ok) Navigator.pushReplacementNamed(context, '/home');
  } else {
    Fluttertoast.showToast(msg: '设备不支持生物识别');
  }
}
```

---

## 20. 获取运营商手机号一键登录（思路）

**用法**：接入中国移动/联通/电信一键登录 SDK（如极光、阿里云号码认证），流程：初始化 SDK → 预取号（拿到掩码手机号）→ 用户确认 → 换取 token → 服务端校验。

- Flutter 侧一般没有现成官方插件，需自定义 **MethodChannel** 调原生 SDK（参考第 05 章的 Channel 模板）。
- 兜底：失败后降级到短信验证码登录。

---

## 21. Flutter 百度 AI：拍照识别文字（OCR，思路）

**用法**：拍照（image_picker）→ 图片 base64 → 调百度 AI 通用文字识别接口。

```dart
import 'dart:convert';
import 'dart:io';
import 'package:http/http.dart' as http;

Future<String> ocrImage(String filePath) async {
  var bytes = await File(filePath).readAsBytes();
  var res = await http.post(
    Uri.parse('https://aip.baidubce.com/rest/2.0/ocr/v1/general_basic?access_token=$baiduToken'),
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    body: {'image': base64Encode(bytes)},
  );
  var words = jsonDecode(res.body)['words_result'];
  return words.map((w) => w['words']).join('\n');
}
```

> access_token 需先用 API Key + Secret Key 换取（可放服务端做，避免泄露密钥）。
