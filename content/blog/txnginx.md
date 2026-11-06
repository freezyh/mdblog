---
title: nginx 安装
description: 腾讯云服务器nginx
date: "\"2026-10-30 11:56:36\""
year: 2026
moddifyDate: 2026-11-6 13:57:10
---

# nginx 安装

#### 1.安装nginx

```bash
sudo dnf install -y nginx
sudo systemctl start nginx
sudo systemctl enable nginx  # 设置开机自启
```

#### 2.查看进程

```bash
ps -ef | grep nginx
```

可以看到nginx进程

```bash
root      718318       1  0 11:51 ?        00:00:00 nginx: master process /usr/sbin/nginx
nginx     718319  718318  0 11:51 ?        00:00:00 nginx: worker process
nginx     718320  718318  0 11:51 ?        00:00:00 nginx: worker process
nginx     718321  718318  0 11:51 ?        00:00:00 nginx: worker process
nginx     718322  718318  0 11:51 ?        00:00:00 nginx: worker process
root      906823  153830  0 11:58 pts/0    00:00:00 grep --color=auto nginx
```

#### 3.查看nginx配置文件

运行 /usr/sbin/nginx -V 知道--conf-path 的路径 /etc/nginx/nginx.conf

```bash
nginx version: nginx/1.29.8
built by gcc 12.3.1 20230912 (TencentOS 12.3.1.8-6) (Tencent Compiler 12.3.1.8)
built with OpenSSL 3.0.12 24 Oct 2023
TLS SNI support enabled
configure arguments: --prefix=/usr/share/nginx --sbin-path=/usr/sbin/nginx --modules-path=/usr/lib64/nginx/modules --conf-path=/etc/nginx/nginx.conf --error-log-path=/var/log/nginx/error.log --http-log-path=/var/log/nginx/access.log --http-client-body-temp-path=/var/lib/nginx/tmp/client_body --http-proxy-temp-path=/var/lib/nginx/tmp/proxy --http-fastcgi-temp-path=/var/lib/nginx/tmp/fastcgi --http-uwsgi-temp-path=/var/lib/nginx/tmp/uwsgi --http-scgi-temp-path=/var/lib/nginx/tmp/scgi --pid-path=/run/nginx.pid --lock-path=/run/lock/subsys/nginx --user=nginx --group=nginx --with-compat --with-debug --with-file-aio --with-http_addition_module --with-http_auth_request_module --with-http_dav_module --with-http_degradation_module --with-http_flv_module --with-http_gunzip_module --with-http_gzip_static_module --with-http_image_filter_module=dynamic --with-http_mp4_module --with-http_perl_module=dynamic --with-http_random_index_module --with-http_realip_module --with-http_secure_link_module --with-http_slice_module --with-http_ssl_module --with-http_stub_status_module --with-http_sub_module --with-http_v2_module --with-http_xslt_module=dynamic --with-mail=dynamic --with-mail_ssl_module --with-openssl-opt=enable-ktls --with-pcre --with-pcre-jit --with-stream=dynamic --with-stream_realip_module --with-stream_ssl_module --with-stream_ssl_preread_module --with-threads --add-dynamic-module=../nginx-dav-ext-module-3.0.0 --add-dynamic-module=../headers-more-nginx-module-0.37 --with-cc-opt='-O2 -flto=auto -ffat-lto-objects -fexceptions -g -grecord-gcc-switches -pipe -Wall -Werror=format-security -Wp,-D_FORTIFY_SOURCE=2 -Wp,-D_GLIBCXX_ASSERTIONS -specs=/usr/lib/rpm/TencentOS/TencentOS-hardened-cc1 -fstack-protector-strong -m64 -march=x86-64-v2 -mtune=generic -fasynchronous-unwind-tables -fstack-clash-protection -fcf-protection' --with-ld-opt='-Wl,-z,relro -Wl,--as-needed -Wl,-z,now -specs=/usr/lib/rpm/TencentOS/TencentOS-hardened-ld -Wl,--build-id=sha1 -Wl,-E'
```

#### 4.修改nginx配置文件后验证是否正常

```bash
sudo nginx -t
```

#### 5.重启nginx

```bash
sudo nginx -s reload
```
