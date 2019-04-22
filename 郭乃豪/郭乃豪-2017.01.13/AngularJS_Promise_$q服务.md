# AngularJS Promise -- $q 服务   
## 什么是Promise    
承诺是一种着眼于未来将发生的事的注册方式，比如Ajax请求的响应从服务器发出。承诺并不是AngularJS独有。   
```
$http({
               url:urlcpuFanAlarmIp,
               method:'GET'
           }).success(function(data, header, config, status){
               console.log(1);
           }).error(function (data, header, config, status) {//处理响应失败
                if(header == 500){
                    //es 查询失败
                }
                //待完善
            });
```
Promise就是一种对执行结果不确定的一种预先定义，如果成功，就xxxx；如果失败，就xxxx，就像事先给出了一些承诺。   
比如，小白在上学时很懒，平时总让舍友带饭，并且事先跟他说好了，如果有韭菜鸡蛋就买这个菜，否则就买西红柿炒鸡蛋；无论买到买不到都要记得带包烟。   
```
小白让舍友带饭()
.then(韭菜鸡蛋，西红柿炒鸡蛋)
.finally(带包烟)
```
## $q服务  
q服务是AngularJS中自己封装实现的一种Promise实现。
先介绍一下$q常用的几个方法：

1. defer() 创建一个deferred对象，这个对象可以执行几个常用的方法，比如resolve,reject,notify等。
resolve (result),带有指定值的延迟活动完成信号。   
reject(result),延迟活动失败了或由于指定原因将不完成的信号。   
notify(result),提供来自延迟活动的临时结果。   
2. all() 传入Promise的数组，批量执行，返回一个promise对象
3. when() 传入一个不确定的参数，如果符合Promise标准，就返回一个promise对象。   
基本的使用是获取deferred对象，然后使用活动结果作为信号调用的resolve或reject方法。   
**例 defer()： **    

```js
.directive("promiseWorker", function($q) {
            var deferred = $q.defer();
            return {
                link: function(scope, element, attrs) {
                    element.find("button").on("click", function (event) {
                        var buttonText = event.target.innerText;
                        if (buttonText == "Abort") {
                            deferred.reject("Aborted");
                        } else {
                            deferred.resolve(buttonText);
                        }
                    });
                },
                controller: function ($scope, $element, $attrs) {
                    this.promise = deferred.promise;
                }
            }
        })
```
我们调用$q.defer方法获取新的deferred对象，连接函数用jqLite(AngularJS 所使用的裁剪版的jQuery)定位button元素并为click事件注册了处理器函数。在收到的事件中，检查被点击元素的文本并调用deferred对象的resolve方法或者reject方法两者之一。控制器定义promise属性来映射deferred对象的promise属性，通过控制器暴露该属性。    
**例 all():**   
```html
<!DOCTYPE html>
<html ng-app="exampleApp">
<head>
    <title>Promises</title>
    <script src="angular.js"></script>
    <link href="bootstrap.css" rel="stylesheet" />
    <link href="bootstrap-theme.css" rel="stylesheet" />
    <script>
        angular.module("exampleApp", [])
        .directive("promiseWorker", function ($q) {
            var deferred = [$q.defer(), $q.defer()];
            var promises = [deferred[0].promise, deferred[1].promise];
            return {
                link: function (scope, element, attrs) {
                    element.find("button").on("click", function (event) {
                        var buttonText = event.target.innerText;
                        var buttonGroup = event.target.getAttribute("data-group");
                        if (buttonText == "Abort") {
                            deferred[buttonGroup].reject("Aborted");
                        } else {
                            deferred[buttonGroup].resolve(buttonText);
                        }
                    });
                },
                controller: function ($scope, $element, $attrs) {
                    this.promise = $q.all(promises).then(function (results) {
                        return results.join();
                    });
                }
            }
        })
        .directive("promiseObserver", function () {
            return {
                require: "^promiseWorker",
                link: function (scope, element, attrs, ctrl) {
                    ctrl.promise.then(function (result) {
                        element.text(result);
                    }, function (reason) {
                        element.text(reason);
                    });
                }
            }
        })
        .controller("defaultCtrl", function ($scope) {

        });
    </script>
</head>
<body ng-controller="defaultCtrl">
    <div class="well" promise-worker>
        <div class="btn-group">
            <button class="btn btn-primary" data-group="0">Heads</button>
            <button class="btn btn-primary" data-group="0">Tails</button>
            <button class="btn btn-primary" data-group="0">Abort</button>
        </div>
        <div class="btn-group">
            <button class="btn btn-primary" data-group="1">Yes</button>
            <button class="btn btn-primary" data-group="1">No</button>
            <button class="btn btn-primary" data-group="1">Abort</button>
        </div>
        Outcome: <span promise-observer></span>
    </div>
</body>
</html>

```   
这个例子中有五个承诺：
1. 当用户选择Heads或Tails时承诺被解决。
2. 当用户选择Yes或No时承诺被解决。
3. 当承诺(1)和(2)被解决时承诺被解决
4. 回调的承诺使用join方法连接结果
5. 回调的承诺在HTML元素中显示连接的结果   



**例 all()的测试： **  
```js
$q.all([
 $http({
 url: urlCpuFan,
 method: 'GET'
 }).success(function (data, header, config, status) {//响应成功
 console.log(3);
 }),
 $http({
 url:urlcpuFanAlarmIp,
 method:'GET'
 }).success(function(data, header, config, status){
 console.log(1);
 }),
 $http({
 url:urlcpuFanAlarmIp,
 method:'GET'
 }).success(function(data, header, config, status){*
 console.log(4);
 })
 ]).then(function (result) {
 console.log("~~~~~~~~~~~~~~~~~~~~~ ： " + JSON.stringify(result));
 })
```   
**测试结果：**   
```
3
1
4
~~~~~~~~~~~~~~~~~~~~~[{"data":{"total":0,"rows":[]},
"status":200,"config":{"method":"GET","transformRequest":[null],
"transformResponse":[null],
"url":"getData?t=SearchCpuFanAlarmInfo&ip=全部&date=undefined&endDate=undefined&warningLevels=全部&searchDetails=&offset=0&limit=20&sortName=time&sortOrder=desc",
"headers":{"Accept":"application/json, text/plain, */*"}},"statusText":"OK"},
{"data":[],"status":200,"config":{"method":"GET","transformRequest":[null],"transformResponse":[null],"url":"getData?t=CpuFanAlarmDeviceInfo","headers":{"Accept":"application/json, text/plain, */*"}},"statusText":"OK"},
{"data":[],"status":200,"config":{"method":"GET","transformRequest":[null],"transformResponse":[null],"url":"getData?t=CpuFanAlarmDeviceInfo","headers":{"Accept":"application/json, text/plain, */*"}},"statusText":"OK"}]
```
