# 什么是Node.js
1、Node.js就是运行在服务端的JavaScrip。   

2、Node.js是一个基于Chrome JavaScrip运行时简历的一个平台。  

3、Node.js是一个非阻塞I/O服务端JavaScript环境，基于Google的V8引擎，V8引擎执行Javascript的速度非常快。

看下官网的介绍：

Node.js is a platform built on Chrome’s JavaScript runtime for easily building fast, 
scalable network applications. Node.js uses an event-driven, non-blocking I/O model
that makes it lightweight and efficient, perfect for data-intensive real-time 
applications that run across distributed devices.

# Node.js的使用场景   
在看他的使用场景之前先了解下Node js 的优缺点吧   
 
## 一、Node js特点  
        1、他是一个JavaScript运行环境

        2、依赖于Chrome V8引擎进行代码解析

        3、事件驱动非阻塞I/O

        4、轻量、可伸缩、适用于实时数据交互应用

        5、单进程，单线程   
## 二、Node js优、缺点　　　
### 优点：
1、并发高是选择Node js重要的优点 
  
2、适合I/O密集型应用
### 缺点：  
 1、不适合CPU密集型应用；CPU密集型应用给Node带来的挑战主要是：由于JavaScript单线程的原因，
    如果有长时间运行的计算（比如大循环），将会导致CPU时间片不能释放，使得后续I/O无法发起；

 解决方案：分解大型运算任务为多个小任务，使得运算能够适时释放，不阻塞I/O调用的发起。

 2、因为是单进程单线程的只能使用一个CPU，不能充分使用CPU导致资源的浪费

 3、可靠性低、一呆代码某个环节崩溃，整个系统都将会崩溃
    原因：他是单线程、但单进程的

    解决方法：

        3.1、Nginx反向代理负载均衡开多个进程，绑定多个端口

        3.2、开多个进程监听同一个端口，使用cluster模块

  4、开源组件库质量参差不齐，更新快，向下不兼容

  5、Debug不方便，错误没有stack trace
## 三、适合Node js的场景

### 1、Restful API
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;这是NodeJS最理想的应用场景，可以处理数万条连接，本身没有太多的逻辑，只需要请求API，组织数据进行返回即可。它本质上只是从某个数据库中查找一些值并将它们组成一个响应。由于响应是少量文本，入站请求也是少量的文本，因此流量不高，一台机器甚至也可以处理最繁忙的公司的API需求。
### 2、统一Web应用的UI层
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;目前MVC的架构，在某种意义上来说，Web开发有两个UI层，一个是在浏览器里面我们最终看到的，另一个在server端，负责生成和拼接页面。  
 
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;不讨论这种架构是好是坏，但是有另外一种实践，面向服务的架构，更好的做前后端的依赖分离。如果所有的关键业务逻辑都封装成REST调用，就意味着在上层只需要考虑如何用这些REST接口构建具体的应用。那些后端程序员们根本不操心具体数据是如何从一个页面传递到另一个页面的，他们也不用管用户数据更新是通过Ajax异步获取的还是通过刷新页面。
### 3、大量的Ajax请求
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;例如个性化应用，每个用户看到的页面都不一样，缓存失效，需要在页面加载的时候发起Ajax请求，或者弹幕系统大量的用户同时通过评论，NodeJS能响应大量的并发请求。

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;总而言之，NodeJS适合运用在高并发、I/O密集、少量业务逻辑的场景。
# Node js安装配置
### 1、下载源码 更多版本：https://nodejs.org/en/download/
```shell
cd /work/app/
wget http://nodejs.org/dist/v0.10.24/node-v0.10.24.tar.gz
```
### 2、解压源码
```shell
tar -zxvf node-v0.10.24.tar.gz
```
### 3、编译安装
```shell
cd node-v0.10.24
./configure --prefix=/work/app
make
make install
```
### 4、配置NODE_HOME，进入profile编辑环境变量
```shell
vim /etc/profile
```
设置nodejs环境变量，在 export PATH USER LOGNAME MAIL HOSTNAME HISTSIZE HISTCONTROL 一行的上面添加如下内容
```js
export NODE_HOME=/work/app/node/0.10.24
export PATH=$NODE_HOME/bin:$PATH

:wq 保存并退出，编译/etc/profile 使配置生效

source /etc/profile 验证是否安装配置成功

node -v 输出 v0.10.24 表示配置成功

npm模块安装路径

/work/app/node/0.10.24/lib/node_modules
```
