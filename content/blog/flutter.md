---
title: Flutter在windows环境下vscode 按F5调试构建慢问题
description: flutter常见问题
date: 2026-10-26
year: 2026
moddifyDate: 2026-11-6 14:18:01
---

# Flutter在windows环境下vscode 按F5调试构建慢问题

#### 1.E:\study\demoflutter\android\settings.gradle.kts

```bash
repositories {
       maven { url = uri("https://maven.aliyun.com/repository/gradle-plugin") }
       maven { url = uri("https://maven.aliyun.com/repository/google") }
       maven { url = uri("https://maven.aliyun.com/repository/public") }
       google()
       mavenCentral()
       gradlePluginPortal()
   }
```

#### 2.E:\study\demoflutter\android\build.gradle.kts

```bash
allprojects {
    repositories {
        maven { url = uri("https://maven.aliyun.com/repository/google") }
        maven { url = uri("https://maven.aliyun.com/repository/public") }
        google()
        mavenCentral()
    }
}
```

### 如果vscode启动的模拟器一直黑屏

C:\Users\Administrator\.android\avd\Pixel_7.avd\config.ini

```bash
- hw.gpu.mode = swiftshader_indirect
+ hw.gpu.mode = host
```
