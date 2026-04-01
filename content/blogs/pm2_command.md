---
title: pm2常用命令
description: pm2常用命令
date: 2025-10-21 11:13:41
year: 2025
---

## pm2常用命令

```bash [重命名进程/应用]
pm2 start app.js --name 名称
```

```bash [添加进程]
pm2 start 序号/名称
```

```bash [结束进程]
pm2 stop 序号/名称
```

```bash [结束所有进程]
pm2 stop all
```

```bash [删除进程]
pm2 delete 序号/名称
```

```bash [删除所有进程]
pm2 delete all
```

```bash [列出所有进程]
pm2 list
```

```bash [查看某个进程具体情况]
pm2 describe 序号/名称
```

<Alert type="danger">和[pm2 show 序号/名称]的命令一样，重点是可以查看日志保存的详细目录</Alert>

```bash [查看进程的资源消耗情况]
pm2 monit
```

```bash [查看pm2的日志]
pm2 logs 序号/名称
```

```bash [重新启动进程]
pm2 restart 序号/名称
```

```bash [重新启动所有进程]
pm2 restart all
```
