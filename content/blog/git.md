---
title: git常见问题
description: git常见处理
date: 2025-10-21
year: 2025
---

# Failed to connect to github.com port 443 after 21115 ms: Timed out 报错解决
```bash
 git config --global https.proxy http://127.0.0.1:xxxxx
 
 git config --global http.proxy http://127.0.0.1:xxxxx

 ipconfig /flushdns
```
