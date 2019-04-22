# angularjs里this与$scope的比较
### 从引用方式，作用范围，对象对比三个方面做两者的比较：
#### 1.引用方式
 1) $scope 只需要在注入中声明即可    

控制器部分代码：
````
var app = angular.module('App',[]);
app.controller('parentController', ['$scope',function($scope){
  $scope.a = '111';
}]);
````     
html部分代码：
````
<div ng-controller="parentController">
  {{a}}
</div>
````   
2) this 则采用了controller as(需要版本为ng 1.2+)写法：
控制器部分代码：
````
var app = angular.module('App',[]);
app.controller('childController', [function(){
  this.a = '111';
}]);
````     
html部分代码：
````
<div ng-controller="childController as childCtrl">
  {{childCtrl.a}}
</div>
````   
#### 2.作用范围
 1) $scope 上级控制器中的变量或数据对象可以在下级控制器中被获取到.当父子控制器同时存在相同的变量时,父子控制器各自范围内的值不会被覆盖,父控制器里的变量会在子控制器里隐藏.    
2) this中的变量则只适用于当前控制器,模板html中只可以拿到当前控制器下声明的变量.
#### 3.对象对比

控制器部分代码：
````
console.log($scope);
console.log(this);
$scope: {
            ...,
            this: Constructor,
            ...
        }
````
1)$scope当控制器在写法上形成父子级关系时，子级没有的变量或方法父级会自动强加在子级身上，子级可以任意获取到当前父级的变量或方法，该种形式是不可逆的，即父级无法通过$scope获取到子级的任意变量或方法.    
2)this则像一个独立的个体，所有东西都是由自己管理，也就不存在父子级变量混淆关系了.

[demo](http://localhost:4000/王利银/王利银-2017.02.17/demo.html)