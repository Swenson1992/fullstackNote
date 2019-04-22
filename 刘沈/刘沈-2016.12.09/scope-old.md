# $scope
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$scope 的使用贯穿整个 AngularJS App 应用,它与数据模型相关联,同时也是表达式执行的上下文.有了 $scope 就在视图和控制器之间建立了一个通道,基于作用域视图在修改数据时会立刻更新 $scope,同样的 $scope 发生改变时也会立刻重新渲染视图.（相当于作用域、控制范围）    

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;有了 $scope 这样一个桥梁,应用的业务代码可以都在 controller 中,而数据都存放在controller 的 $scope 中.


## $rootScope   
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;AngularJS 应用启动并生成视图时,会将根 ng-app 元素与 $rootScope 进行绑定.$rootScope 是所有 $scope 的最上层对象,可以理解为一个 AngularJS应用中得全局作用域对象,所以为它附加太多逻辑或者变量并不是一个好主意,和污染 Javascript 全局作用域是一样的.



## $scope 的作用
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$scope 对象在 AngularJS 中充当数据模型的作用,也就是一般 MVC 框架中Model得角色.但又不完全与通常意义上的数据模型一样,因为 $scope 并不处理和操作数据,它只是建立了视图和 HTML 之间的桥梁,让视图和 Controller 之间可以友好的通讯.   

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;再进一步系统的划分它的作用和功能:
   
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1.提供了观察者可以监听数据模型的变化   

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2.可以将数据模型的变化通知给整个 App   

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3.可以进行嵌套,隔离业务功能和数据   

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.给表达式提供上下文执行环境   

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在 Javascript 中创建一个新的执行上下文,实际就是用函数创建了一个新的本地上下文,在 AngularJS 中当为子 DOM 元素创建新的作用域时,其实就是为子 DOM 元素创建了一个新的执行上下文.


## $scope 生命周期(作用域)

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;AngularJS 中也有一个'事件'的概念,比如当一个绑定了 ng-model 的 input 值发生变化时,或者一个 ng-click 的 button 被点击时,AngularJS 的事件循环就会启动.事件循环是 AngularJS 中非常非常核心的一个概念,因为不是本文主旨所以不多说,感兴趣的可以自己看看资料.这里事件就在 AngularJS 执行上下文中处理,$scope 就会对定义的表达式求值.此时事件循环被启动, AngularJS 会监控应用程序内所有对象,脏值检查循环也会启动.   

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$scope 的生命周期有4个阶段:   

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1. 创建   

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;控制器或者指令创建时, AngularJS 会使用 $injector 创建一个新的作用域,然后在控制器或指令运行时,将作用域传递进去.  

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2. 链接   

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;AngularJS 启动后会将所有 $scope 对象附加或者说链接到视图上,所有创建 $scope 对象的函数也会被附加到视图上.这些作用域将会注册当 AngularJS 上下文发生变化时需要运行的函数.也就是 $watch 函数, AngularJS 通过这些函数或者何时开始事件循环.$
$scope.$watch   

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3. 更新   

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;一旦事件循环开始运行,就会开始执行自己的脏值检测.一旦检测到变化,就会触发 $scope 上指定的回调函数$http,$timeout,$interval   

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4. 销毁   

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;通常来讲如果一个 $scope 在视图中不再需要, AngularJS 会自己清理它.当然也可以通过 $destroy() 函数手动清理.
