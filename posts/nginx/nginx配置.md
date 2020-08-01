---
title: "Nginx 配置"
date: "2020-06-08"
---

## 概述
通过在conf文件中配置指令我们可以控制NGINX的行为。例如，在配置反向代理时，使用*proxy_pass*指令来表示将客户端的请求发送至指定的服务端。
Nginx配置文件大致分为:

- *nginx.conf* : 主配置文件，只有一个，一般位于 **/etc/nginx/nginx.conf**，不同包管理器可能有不同的位置，例如 **/usr/local/nginx/conf**或者 **/usr/local/etc/nginx**下
- *conf.d/\*.conf* : 为了便于维护，可以按特定功能将配置文件划分为不同的组，每一个配置文件分别负责不同的功能或者应用。这些配置文件通过*nginx.conf*中**include**指令引入。 

## 指令（Directives）

指令就是控制NGINX行为的语句，单个指令以 **;** 结尾,多个指令使用 **{}** 组合在一起，称为块,类似编程中的语句和语句块。

NGINX配置文件就是由指令构成的。

![nginx context](/home/liuguo/js_workspace/nextjs-blog/public/images/nginx/nginx-block.png)

#### 简单指令示例
```shell
user             nobody;
error_log        logs/error.log notice;
worker_processes 1;
```

#### 块指令示例
```shell
server {
    listen 8081;
    server_name localhost;
    root /var/nginx/html;
    access_log /var/log/nginx/es.access.log;
    error_log /var/log/nginx/es.error.log;
}
```
#### include指令示例
```shell
include /etc/nginx/conf.d/*.conf;
```

## 配置上下文（Contexts）

上下文是指令的容器

根据不同的流量(traffic)类型，NGINX有以下顶级上下文指令:

- events – General connection processing
- http – HTTP traffic
- mail – Mail traffic
- stream – TCP and UDP traffic

上述四种上下文将支持不同流量类型的指令组合在一起。这些上下文之外的指令位于**Main**上下文中，上述上下文属于**Main**的子上下文。

![nginx context](/home/liuguo/js_workspace/nextjs-blog/public/images/nginx/nginx-context.png)


- NGINX上下文是继承的。子上下文可以继承父上下文的指令。
- 子上下文可以覆盖父上下文的指令
- 最佳实践是尽可能将指令配置到较高的上下文中，这样可以最小化重复配置和降低缺少配置的风险。对于例外情况，子上下文可以根据需要添加配置以覆盖继承的配置

### Main Context

Main上下文是根上下文

#### 常见指令:
- **user**: 工作进程使用的用户和用户组(可省略)，默认为nobody nobody
- **worker_processes**: nginx工作进程数，默认为1
- **pid**:  进程id文件
- **error_log**: 错误日志文件路径

### Events Context
影响连接处理的指令上下文

#### 常见指令:
- **worker_connections** worker进程同时处理的最大连接数，默认值512

### Http Context
处理**HTTP**和**HTTPS**连接的指令上下文

#### 常见指令
- **upstream** 配置一组后台服务，用于负载均衡
- **server** 配置虚拟服务器

[NGINX HTTP 负载均衡](https://docs.nginx.com/nginx/admin-guide/load-balancer/http-load-balancer/)

### Stream Context
处理第3、4层网络协议的指令上下文
- TCP
- UDP

[NGINX TCP and UDP 负载均衡](https://docs.nginx.com/nginx/admin-guide/load-balancer/tcp-udp-load-balancer/)
### Mail Context
代理邮件服务协议的上下文
- IMAP
- POP3 
- SMTP

[NGINX Mail Proxy](https://docs.nginx.com/nginx/admin-guide/mail-proxy/mail-proxy/)

### Server Context

#### 虚拟服务器(Virtual Server)

在HTTP,Stream,Mail上下文中，都包括一个或多个**Server**块来定义控制请求处理的虚拟服务器。根据流量类型不同，Server可以包含不同的指令。

对于HTTP(HTTP上下文)，Server块的指令控制对特定域名或IP地址上的资源请求的处理，Server块上下文中的一个或多个**location**上下文定义了如何处理特定的uri集合。

对于邮件和TCP/UDP通信流(邮件和Stream上下文)，Server块的指令控制到达特定TCP端口或UNIX套接字的通信流的处理。

- 配置ip端口
- 配置域名
- 配置Unix socket

### Location Context
根据请求的URI决定如何响应。

```nginx
location /one {
    # configuration for processing URIs starting with '/one'
} 
```

### Upstream Context
定义一组后台应用服务，用于负载均衡
```nginx
upstream myServers {
    server 127.0.0.1:8081;
    server 127.0.0.1:8082;
    server 127.0.0.1:8083;
}
```

### 多上下文示例
```nginx
user nobody; # a directive in the 'main' context

events {
    # configuration of connection processing
}

http {
    # Configuration specific to HTTP and affecting all virtual servers  

    server {
        # configuration of HTTP virtual server 1       
        location /one {
            # configuration for processing URIs starting with '/one'
        }
        location /two {
            # configuration for processing URIs starting with '/two'
        }
    } 
    
    server {
        # configuration of HTTP virtual server 2
    }
}

stream {
    # Configuration specific to TCP/UDP and affecting all virtual servers
    server {
        # configuration of TCP virtual server 1 
    }
}
```

## 参考

- [nginx configuration files](https://docs.nginx.com/nginx/admin-guide/basic-functionality/managing-configuration-files/)
- [nginx directives](https://nginx.org/en/docs/ngx_core_module.html#directives)
- [nginx指令列表](https://nginx.org/en/docs/dirindex.html?_ga=2.147185844.222430574.1596171905-1734275440.1596171905)
