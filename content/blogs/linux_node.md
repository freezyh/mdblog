---
title: linux安装node
description: linux常用命令
date: 2025-10-21 18:37:29
year: 2025
---

## linux安装node

版本 Node20+ 安装包里面没有 bin 目录，目前没有找到手动安装的方法，采用 nvm 安装

下载https://github.com/nvm-sh/nvm/archive/refs/tags/v0.39.7.tar.gz
上传到/usr/software 然后解压 tar -zxvf nvm-0.39.7.tar.gz

配置环境

```bash
vim ~/.bashrc
```

按键 i 进入编辑模式，把如下命令插入末尾，注意 NVM_DIR 路径

```bash
export NVM_DIR="/usr/software/nvm-0.39.7"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
```

粘贴完毕后，按下 esc 键，再按:wq 回车

使用配置还需要执行 source ~/.bashrc

nvm list 查看

nvm install 20.5.0

nvm use 20.5.0

npm install pm2 -g // 在根目录安装
