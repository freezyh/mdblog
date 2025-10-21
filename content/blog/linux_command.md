---
title: linux常用命令
description: linux常用命令
date: 2025-10-21 17:10:25
year: 2025
---

## linux常用命令

```bash [查看使用的端口号]
netstat -tuln
```

<Alert type="danger">部署Nuxt项目的时候，可以通过查看端口号来排查项目是否启动成功</Alert>

```bash [查看nginx的安装目录]
ps -ef | grep nginx
```

<Alert type="danger">通过查看安装目录可以找到相应的配置文件所在目录，执行后显示`/usr/local/nginx/sbin/nginx`那么sbin前面的目录下可以查看配置，如果需要更改nginx的一些配置，此方法可以快速找到配置来更改，更改完以后需要重新加载服务：`/usr/local/nginx/sbin/nginx -s reload` 可能安装的目录不是/usr/local/nginx/sbin/nginx那就按实际的</Alert>

```bash [创建 test 目录]
mkdir test
```

```bash [删除 test 目录]
rm -rf test
```

```bash [进入 test 目录]
cd test
```

```bash [把 test 目录改成 test2 名称]
mv test test2
```
