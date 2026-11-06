---
title: git常见处理
description: git常见处理
date: 2025-10-21
year: 2025
moddifyDate: 2026-11-6 13:57:12
---

# git常见处理

## Failed to connect to github.com port 443 after 21115 ms: Timed out 报错解决

```bash
 git config --global https.proxy http://127.0.0.1:xxxxx

 git config --global http.proxy http://127.0.0.1:xxxxx

 ipconfig /flushdns
```

```bash
git config --global http.sslVerify false
```

```bash [看全局]
git config --global -l
```

```bash [删除全局git]
git config --global --unset user.name
git config --global --unset user.email
```
