### 用$watch 观察模型变化
也许所有的 scope 功能函数中使用最多的就是$watch 函数，因为当你的模型发生改变
时能够通知。你可以监视单个对象属性或者计算结果（或函数），事实上，可以是任何
能被访问的属性或者可以计算结果的 JavaScript 函数。这个函数签名：  

    $watch(watchFn, watchAction, deepWatch)

每个参数的详细内容如下：
#### watchFn
  这个参数是一个 Angular 表达式字符串或是一个返回监控的模型的当前值的函数。如果你传递一个字符串
方式的 Angular 表达式，它将会在被调用的 scope 上用对象执行。
#### watchAction
这是一个函数或者表达式，当 watchFn 变化时将调用他们。函数形式而言，它有 watchFn
的新旧值以及一个 scope 引用，函数签名是 function(newValue,oldValue,scope)
#### deepWatch
这是一个可选的布尔参数，如果设置成 true，Angular 将检查在被监视对象中每个属性
的每次变化。如果你希望监视数组中的私有元素或者对象中的属性，而不是仅仅一个简单的
值时，你应该使用这个参数。  
[例子](http://localhost:4000/%E5%88%98%E6%B2%88/%E5%88%98%E6%B2%88-2017.02.10/watch.html)

watch.js代码
```js
var app = angular.module("app", []);
app.controller('watchController',function($scope){
    $scope.text = '初始值';
    $scope.count1 = '多监听1';
    $scope.count2 = '多监听2';
    $scope.array = [{name:'张三'},{name:'李四'},{name:'王五'}];
    $scope.old = '旧值';

    /**
     * 单个监听
     * */
    $scope.$watch('text',function warningResult(){
        alert('单个监听已经改变');
    })

    /*
    * 同时监听多个变量
    * */
    $scope.$watch('count1+count2',function warningResult(){
        alert('多个监听已经改变');
    })

    /*
    * 对象或数组监听
    * */
    $scope.$watch('array',function warningResult(){
        alert('监听数组或者对象已经改变');
    },true)


    /*
    * 观察新旧值
    * */
    $scope.$watch('old',function warningResult(newValue,oldValue,scope){
        alert(newValue);
        alert(oldValue);
        alert('scope:'+scope.text);
    })
})
```
watch.html 代码
```html
<!DOCTYPE html>
<html ng-app="app">
<head lang="en">
    <meta charset="UTF-8">
    <title></title>
</head>
<script src="jquery-2.2.3.js"></script>
<script src="angular.js"></script>
<script src="watch.js"></script>
<body>
<div ng-controller="watchController">
    <form>
        单个监听：<input ng-model="text">
        <p>
            多个监听1：<input ng-model="count1">
            多个监听2：<input ng-model="count2">
        </p>
        <p ng-repeat="nameA in array">
            名称：<input ng-model="nameA.name">
        </p>
        新旧值：<input ng-model="old">
    </form>


</div>
</body>
</html>
```