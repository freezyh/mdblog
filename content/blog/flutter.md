---
title: flutter常见问题
description: flutter常见问题
date: 2026-10-26 17:33:08
year: 2026
---

## Flutter在windows环境下vscode 按F5的时候构建慢问题，三步骤处理

#### 1. E:\study\demoflutter\android\gradle\wrapper\gradle-wrapper.properties

```bash
distributionUrl=https\://mirrors.cloud.tencent.com/gradle/gradle-8.3-all.zip
```

#### 2. E:\study\demoflutter\android\settings.gradle

```bash
repositories {
       maven { url "https://maven.aliyun.com/repository/google" }
       maven { url "https://maven.aliyun.com/repository/gradle-plugin" }
       maven { url "https://maven.aliyun.com/repository/public" }
       google()
       mavenCentral()
       gradlePluginPortal()
}
```

#### 3. E:\study\demoflutter\android\build.gradle

```bash
allprojects {
    repositories {
        maven { url "https://maven.aliyun.com/repository/google" }
        maven { url "https://maven.aliyun.com/repository/public" }
        google()
        mavenCentral()
    }
}
```
