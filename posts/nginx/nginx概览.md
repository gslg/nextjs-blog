---
title: "Nginx 概览"
date: "2020-06-06"
---

## Nginx是什么？

**NGINX** 是一个开源软件，可以用于Web服务，反向代理，缓存，负载均衡，流媒体等. 它最初是为最大性能和稳定性而设计的Web服务器. 除了HTTP服务器功能外，NGINX还可以充当电子邮件的代理服务器（IMAP,POP3和SMTP）以及*HTTP*,*TCP*和*UDP*服务器的反向代理和负载均衡。

## Nginx安装

[Install Nginx]('http://nginx.org/en/docs/install.html')

## Nginx反向代理

<img src="/Users/guoliu/nextjs-blog/public/images/nginx/reverse-proxy.png" alt="reverse-proxy"  />

NGINX可以用作高效的反向代理服务器。

反向代理服务器通常位于专用网络中防火墙后面，并将客户端请求定向到适当的后端服务器。反向代理提供了更高级别的抽象和控制，以确保客户端和服务器之间网络流量的顺畅流动。

我们可以将反向代理看作网站的“公开面孔”。它的地址是在网站上发布的地址，位于网站网络的边缘，可以接受来自Web浏览器和移动应用程序对网站上托管内容的请求。

用作反向代理服务器的好处有：

- 首先，反向代理增加了安全性，因为关于后端服务器的信息在内部网络之外是不可见的。这意味着恶意客户端无法直接访问你的后端服务器以利用任何漏洞。例如，NGINX可以配置拒绝来自特定客户端IP地址的流量或限制每个客户端可以接受的连接数来帮助保护后端服务器免受分布式拒绝服务（DDoS）攻击。

- 其次反向代理可以提高灵活性( *flexibility*)和可伸缩性(*scalability*)。由于客户端只能看到反向代理的IP地址，因此我们可以自由更改后端基础结构的配置。如果后端IP地址经常更改，这将非常有用。

## Nginx网关

![api-gateway](/Users/guoliu/nextjs-blog/public/images/nginx/api-gateway.png)

API网关是客户端请求接口的唯一入口点。
NGINX API网关为多个API提供了单一的、一致的入口，而不用关心它们在后端是如何实现或部署的。

NGINX API网关提供了以下优点:

- 执行请求路由，并根据请求URI将客户端路由到正确的API端点。

- 通过缓存常用的响应来减少API端点的负载来提高性能。

- 很容易管理和保护api。



此外，NGINX使用JWT(*JSON Web token*) 进行API认证。API网关还可以通过速率限制来保护API免受请求和带宽限制的困扰。 最后，NGINX是可定制的，可以使用nginScript或Lua模块进行服务器端脚本编写，以自定义NGINX满足独特的需求。

## Nginx负载均衡

![load-balance](/Users/guoliu/nextjs-blog/public/images/nginx/load-balance.png)

NGINX也可以用作高性能的负载均衡服务器。负载均衡将工作负载分布到多个服务器上。对于Web应用程序，这意味着在应用程序服务池中分发HTTP请求。
负载均衡提供了两个主要好处:

- 负载均衡使我们可以扩展web应用程序，使其超出单台服务器所能处理的范围

- 负载均衡提供了冗余，因此如果一个服务器出现故障，其他服务器会介入以保持我们的应用程序正常运行。

## Nginx内容缓存

<img src="/Users/guoliu/nextjs-blog/public/images/nginx/cache.png" alt="cache" style="zoom:50%;" />

NGINX内容缓存可提高后端服务器的效率，可用性和容量。

设置缓存后，NGINX会检查是否可以从缓存中满足对可缓存内容的请求。 如果缓存中有可用的内容，则NGINX可以处理请求，而不必连接到后端服务器来检索内容。 否则，NGINX向后端服务器请求内容，将其添加到缓存中以备将来使用，然后将请求的内容提供给客户端。

内容缓存通过减少后端服务器的负载来缩短网页的加载时间。 缓存的内容可以与静态内容相同的速度提供。

缓存还可以提高内容可用性，因为如果原始服务器发生故障或停止响应，则可以将缓存的内容用作备份。

最后，缓存通过从后端服务器上减少重复的任务来增加站点的容量。 这样可以释放后端来完成更多任务。