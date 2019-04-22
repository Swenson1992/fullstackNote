# $scope

&nbsp;&nbsp;&nbsp;&nbsp;Scope(作用域) 是应用在 HTML (视图) 和 JavaScript (控制器)之间的纽带。Scope 是一个对象，有可用的方法和属性。Scope 可应用在视图和控制器上。当在控制器中添加 $scope 对象时，视图 (HTML) 可以获取了这些属性。视图中，你不需要添加 $scope 前缀, 只需要添加属性名即可，如： {{carname}}。

## 1.1 根作用域$rootScope

&nbsp;&nbsp;&nbsp;&nbsp;所有的应用都有一个 $rootScope，它可以作用在 ng-app 指令包含的所有 HTML 元素中。$rootScope 可作用于整个应用中。是各个 controller 中 scope 的桥梁。用 rootscope 定义的值，可以在各个 controller 中使用。   
例：  
```js
<div ng-app="myApp" ng-controller="myCtrl">

<h1>{{lastname}} 家族成员:</h1>

<ul>
    <li ng-repeat="x in names">{{x}} {{lastname}}</li>
</ul>

</div>

<script>
  var app = angular.module('myApp', []);

  app.controller('myCtrl', function($scope, $rootScope) {
      $scope.names = ["Emil", "Tobias", "Linus"];
      $rootScope.lastname = "Refsnes";
  });
</script>
```

## 1.2 $scope 生命周期(作用域)
#### &nbsp;&nbsp;&nbsp;&nbsp;1.2.1 $scope 的生命周期有4个阶段:
1. 创建   
&nbsp;&nbsp;&nbsp;&nbsp;ng-controller指令是作用域创建指令, 当在DOM树中遇到作用域创建指令时,AngularJs都会创建Scope类的新实例$scope.

2. 监视器注册阶段   
&nbsp;&nbsp;&nbsp;&nbsp;模板链接阶段为在模板中表示的作用域中的值注册监视器。这些监视器自动将模型的更改传播到DOM元素。也可以利用$watch()方法在一个作用域值上注册你自己的监视函数。   
例:   
```js
$scope.watchedItem = 'myItem';
$scope.counter = 0;
$scope.$watch('name',function(newValue, oldValue){
  $scope.watchedItem = $scope.counter+1;
})
```
3. 变化阶段   
&nbsp;&nbsp;&nbsp;&nbsp;该阶段发生在该作用域内的数据发生变化时。   
&nbsp;&nbsp;&nbsp;&nbsp;当你在angularJS代码进行更改时，一个名为$apply()的作用域函数更新模型，并调用$digest()函数来更新DOM和监视器。

4. 销毁   
&nbsp;&nbsp;&nbsp;&nbsp;$destroy()方法从浏览器内存中删除作用域。在作用域不再需要时angularJS库自动调用此方法。
