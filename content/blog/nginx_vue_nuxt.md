---
title: Nginx配置打包的Vue项目并配置Nuxt重构的路由
description: Nginx配置打包的Vue项目并配置Nuxt重构的路由
date: 2025-10-22 14:58:34
year: 2025
---

## Nginx配置打包的Vue项目并配置Nuxt重构的路由

配置的vue2项目域名为 www.test.com 映射的端口8088，重构的页面需要使用服务端渲染，nuxt启动的端口为8089，并且旧项目需要保留，域名也要保留，可以通过nginx配置匹配访问路径进行转发，比如首页 通过 `/` 精准匹配，nuxt的静态资源通过 `^~ /_nuxt/` ，其中 `/cms` 是nuxt项目的子路由，可以根据实际来的，如果nuxt使用到了api前缀转发，这里也需要配置

```bash [nginx.conf]
 server {
    listen       8088;
    server_name www.test.com;

    location = / {
        add_header Cache-Control no-cache;
        proxy_set_header   Cookie $http_cookie;
        proxy_pass	http://127.0.0.1:8089;
    }

    location ^~ /_nuxt/ {
        add_header Cache-Control no-cache;
        proxy_set_header   Cookie $http_cookie;
        proxy_pass	http://127.0.0.1:8089;
    }

    location /cms {
        add_header Cache-Control no-cache;
        proxy_set_header   Cookie $http_cookie;
        proxy_pass	http://127.0.0.1:8089;
    }

    location /api {
        add_header Cache-Control no-cache;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Cookie $http_cookie;
        proxy_pass http://127.0.0.1:8089;
    }

    location / {
        root   /www/test/h5/dist;
        index  index.html index.htm;
        try_files $uri $uri/ /index.html;
        add_header Cache-Control no-cache;
        proxy_set_header   Cookie $http_cookie;
    }

    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   html;
    }
}
```
