---
title: "Nginx 如何服务请求"
date: "2020-06-09"
---

## NGINX选择哪个server处理请求？

NGINX根据**Server**块中**listen**和**server_name**指令选择虚拟服务器。

#### listen指令
| 指令                   | NGINX实际值    |
|------------------------|----------------|
| listen 80;             | 0.0.0.0:80     |
| listen 127.0.0.1:8080; | 127.0.0.1:8080 |
| listen 127.0.0.2;      | 127.0.0.2:80   |
| 无                     | 0.0.0.0:80     |


listen 指令定义了虚拟服务器(virtual server)监听的ip地址和端口，当该指令缺失时，nginx会使用默认值。当nginx处理请求时，nginx会根据请求的IP和端口进行查找匹配的Server块。

![nginx context](/home/liuguo/js_workspace/nextjs-blog/public/images/nginx/nginx-server.png)

#### server_name指令

当根据ip和端口决定不了选择哪个服务器时，nginx会继续根据server_name进行匹配。

server_name指令对应于请求头中的"Host"。

##### server_name优先级
1. 精确匹配
2. *通配符开头的
3. *通配符结尾的
4. 正则匹配



