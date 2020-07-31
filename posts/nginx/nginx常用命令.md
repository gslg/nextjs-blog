---
title: "Nginx 常用命令"
date: "2020-06-07"
---

## 概述
在**linux**上,一般可以通过`man name`命令来查看某个程序的操作手册，或者一般应用程序都会提供自己的帮助命令进行查看。例如，对于nginx,我们可以通过`man nginx` 或者 `nginx -h` 查看帮助手册。

![nginx help](/home/liuguo/js_workspace/nextjs-blog/public/images/nginx/nginx-h.png)

## NGINX命令

### NGINX命令一览
| 命令 | 参数                               | 说明                                      |
|------|------------------------------------|-------------------------------------------|
|  -h  |                  -                 | 帮助手册                                  |
|  -v  |                  -                 | nginx版本                                 |
|  -V  |                  -                 | nginx版本以及配置项                       |
|  -t  |                  -                 | 测试配置文件正确性                        |
|  -T  |                  -                 | 测试配置，并输出配置                      |
|  -q  |                  -                 | 测试配置期间忽略非错误信息                |
|  -s  | signal | 向主线程发送信号                          |
|  -p  |               prefix               | 设置前缀路径 (默认: /usr/share/nginx/)    |
|  -c  |              filename              | 设置配置文件(默认: /etc/nginx/nginx.conf) |
|  -g  |             directives             | 设置全局指令                              |
### NGINX常用命令

#### 帮助手册
```shell 
nginx -h
```
#### 查看nginx版本
```shell 
nginx -v
```
#### 检查配置文件正确性
```shell
nginx -t
```
#### 向主进程发送信号
```shell
nginx -s <SIGNAL>
```
**<SIGNAL\>** 支持以下选项:
- **quit** 优雅的关闭(Shut down gracefully),也就是执行完正在执行的请求后关闭。
- **reload** 重新加载配置。修改配置后，使用该命令不需要重启nginx即可实现配置更新。
- **reopen** 重新打开日志文件。
- **stop** 立即关闭(fast shutdown)。

**nginx -s reload注意事项** 

该命令首先会检查配置文件的正确性，如果存在错误，就会输出错误信息并且不会重新加载配置文件,NGINX仍然使用之前在内存中的配置，这样保证了该命令的安全性。

如果配置文件正确，NGINX会向Linux内核发送**SIGHUP**信号，内核收到该信号会创建新的进程(pid)。

该命令不会丢失任何正在处理中的请求，**Master**进程会使用新的配置**fork**一些新**work**进程来处理新的连接，旧的**work**进程在完成它们的任务后关闭。

