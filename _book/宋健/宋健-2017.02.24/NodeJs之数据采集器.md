# NodeJs数据采集器(request和cheerio)

## 写在之前

&#8194;&#8194;&#8194;&#8194;很多人都有做数据采集的需求，用不同的语言，不同的方式都能实现，主要还是发送各类请求和正则解析数据比较繁琐些，总体来说没啥不好的，就是效率要差一些。    

&#8194;&#8194;&#8194;&#8194;用nodejs写采集程序还是比较有效率(但个人觉得python也很快)，今天主要用一个示例来说一下使用nodejs实现数据采集器，主要使用到request和cheerio。    

## 采集器
&#8194;&#8194;&#8194;&#8194;采集器需要用npm安装request和cheerio支持    
&#8194;&#8194;&#8194;&#8194;[request :用于http请求](https://github.com/request/request)    

&#8194;&#8194;&#8194;&#8194;[cheerio:用于提取request返回的html中需要的信息(和jquery用法一致)](https://github.com/cheeriojs/cheerio)

```
    npm install request -g
    npm install cheerio -g
```
&#8194;&#8194;&#8194;&#8194;新建工程代码 app.js
```js
/*
 * 功能:   数据采集
 * 创建人: songjian
 * 时间:   2017-02-24
 */
var request = require('request'),
    cheerio = require('cheerio'),
    URL_36KR = 'http://36kr.com/';            //36氪

/* 开启数据采集器 */
function dataCollectorStartup() {
    dataRequest(URL_36KR);
}

/* 数据请求 */
function dataRequest(dataUrl)
{
    request({
        url: dataUrl,
        method: 'GET'
    }, function(err, res, body) {
        if (err) {
            console.log(dataUrl)
            console.error('[ERROR]Collection' + err);
            return;
        }
        
        switch(dataUrl)
        {
            case URL_36KR:
                
                dataParse36Kr(body);
                
                break;
        }
        
        
    });
}

/* 36kr 数据解析 */
function dataParse36Kr(body)
{
    console.log('======================================');
    console.log('======================36kr============');
    console.log('======================================');
    
    var $ = cheerio.load(body);
    var articles = $('articles');
    for (var i = 0; i < articles.length; i++) {
        var article = articles[i];
        var descDoms = $(article).find('.desc');
        
        if(descDoms.length == 0)
        {
            continue;
        }
        
        var coverDom = $(article).children().first();
        var titleDom = $(descDoms).find('.hot_article');
        var timeDom = $(descDoms).find('.timeago');
        
        var titleVal =  titleDom.text();
        var urlVal = titleDom.attr('href');
        var timeVal = timeDom.attr('title');
        var coverUrl = coverDom.attr('data-lazyload');
        
        //处理时间
        var timeDateSecs = new Date(timeVal).getTime() / 1000;
        console.log('------------urlVal----------'+urlVal);
        if(urlVal != undefined)
        {
            console.info('--------------------------------');
            console.info('标题：' + titleVal);
            console.info('地址：' + urlVal);
            console.info('时间：' + timeDateSecs);
            console.info('封面：' + coverUrl);
            console.info('--------------------------------');
        }
    };
}

dataCollectorStartup();
```

## 测试结果
![node test recult](./node.png) 

&#8194;&#8194;&#8194;&#8194;这个采集器就完成了，其实就是request一个get请求，请求回调中会返回body即HTML代码，通过cheerio库以jquery库语法一样操作解析，取出想要的数据！
 
## 加入代理
&#8194;&#8194;&#8194;&#8194;做一个采集器DEMO上面就基本完成了。如果需要长期使用为了防止网站屏蔽，还是需要加入一个代理列表
 
&#8194;&#8194;&#8194;&#8194;为示例我从网上的免费代理中提出一些做示例，制作成proxylist.js，其中提供一个随机取一条代理的函数
 ```js
 var PROXY_LIST = [{"ip":"111.1.55.136","port":"55336"},{"ip":"111.1.54.91","port":"55336"},{"ip":"111.1.56.19","port":"55336"}
                     ,{"ip":"112.114.63.16","port":"55336"},{"ip":"106.58.63.83","port":"55336"},{"ip":"119.188.133.54","port":"55336"}
                     ,{"ip":"106.58.63.84","port":"55336"},{"ip":"183.95.132.171","port":"55336"},{"ip":"11.12.14.9","port":"55336"}
                     ,{"ip":"60.164.223.16","port":"55336"},{"ip":"117.185.13.87","port":"8080"},{"ip":"112.114.63.20","port":"55336"}
                     ,{"ip":"188.134.19.102","port":"3129"},{"ip":"106.58.63.80","port":"55336"},{"ip":"60.164.223.20","port":"55336"}
                     ,{"ip":"106.58.63.78","port":"55336"},{"ip":"112.114.63.23","port":"55336"},{"ip":"112.114.63.30","port":"55336"}
                     ,{"ip":"60.164.223.14","port":"55336"},{"ip":"190.202.82.234","port":"3128"},{"ip":"60.164.223.15","port":"55336"}
                     ,{"ip":"60.164.223.5","port":"55336"},{"ip":"221.204.9.28","port":"55336"},{"ip":"60.164.223.2","port":"55336"}
                     ,{"ip":"139.214.113.84","port":"55336"} ,{"ip":"112.25.49.14","port":"55336"},{"ip":"221.204.9.19","port":"55336"}
                     ,{"ip":"221.204.9.39","port":"55336"},{"ip":"113.207.57.18","port":"55336"} ,{"ip":"112.25.62.15","port":"55336"}
                     ,{"ip":"60.5.255.143","port":"55336"},{"ip":"221.204.9.18","port":"55336"},{"ip":"60.5.255.145","port":"55336"}
                     ,{"ip":"221.204.9.16","port":"55336"},{"ip":"183.232.82.132","port":"55336"},{"ip":"113.207.62.78","port":"55336"}
                     ,{"ip":"60.5.255.144","port":"55336"} ,{"ip":"60.5.255.141","port":"55336"},{"ip":"221.204.9.23","port":"55336"}
                     ,{"ip":"157.122.96.50","port":"55336"},{"ip":"218.61.39.41","port":"55336"} ,{"ip":"221.204.9.26","port":"55336"}
                     ,{"ip":"112.112.43.213","port":"55336"},{"ip":"60.5.255.138","port":"55336"},{"ip":"60.5.255.133","port":"55336"} 
                     ,{"ip":"221.204.9.25","port":"55336"},{"ip":"111.161.35.56","port":"55336"},{"ip":"111.161.35.49","port":"55336"}
                     ,{"ip":"183.129.134.226","port":"8080"} ,{"ip":"58.220.10.86","port":"80"},{"ip":"183.87.117.44","port":"80"}
                     ,{"ip":"211.23.19.130","port":"80"},{"ip":"61.234.249.107","port":"8118"},{"ip":"200.20.168.140","port":"80"}
                     ,{"ip":"111.1.46.176","port":"55336"},{"ip":"120.203.158.149","port":"8118"},{"ip":"70.39.189.6","port":"9090"} 
                     ,{"ip":"210.6.237.191","port":"3128"},{"ip":"122.155.195.26","port":"8080"}];
         
 
 module.exports.GetProxy = function () {
         
     var randomNum = parseInt(Math.floor(Math.random() * PROXY_LIST.length));    
     var proxy = PROXY_LIST[randomNum];
 
     return 'http://' + proxy.ip + ':' + proxy.port;
 }
 ```
&#8194;&#8194;&#8194;&#8194;对app.js代码做如下修改
```js
 var request = require('request'),
     cheerio = require('cheerio'), 
     URL_36KR = 'http://36kr.com/',            //36氪
     Proxy = require('./proxylist.js'); 
 
 ...
 
 /* 数据请求 */
 function dataRequest(dataUrl)
 {
     request({
         url: dataUrl,    
         proxy: Proxy.GetProxy(),
         method: 'GET'
     }, function(err, res, body) { 
 ...
         }
 
 }
 
 ...
 
 dataCollectorStartup()
 setInterval(dataCollectorStartup, 10000);     
 ```
&#8194;&#8194;&#8194;&#8194;这样就改造完成，加入代码，并且加了setInterval进行定间隔执行！
## 请求https
&#8194;&#8194;&#8194;&#8194;上面示例中采集http请求，如果换成https呢？
 
&#8194;&#8194;&#8194;&#8194;新建app2.js，代码如下
```js
 /*
 * 功能:   请求HTTPS
 * 创建人: songjian
 * 时间:   2017-02-24
 */
 var request = require('request'),   
     URL_INTERFACELIFE = 'https://interfacelift.com/wallpaper/downloads/date/wide_16:10/';
 
 /* 开启数据采集器 */
  function dataCollectorStartup() {         
      dataRequest(URL_INTERFACELIFE);
  }
 
 /* 数据请求 */
 function dataRequest(dataUrl)
 {
     request({
         url: dataUrl,    
         method: 'GET',
         headers: {
             'User-Agent': 'songjian'
         }
     }, function(err, res, body) { 
         if (err) {            
             console.log(dataUrl)
             console.error('[ERROR]Collection' + err);        
             return;            
         }    
 
         console.info(body);
         
     });    
 }
 
 dataCollectorStartup();
 ```
