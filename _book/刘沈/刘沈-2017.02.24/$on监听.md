# 关于$on监听

### 事件的发布
&#8194;&#8194;&#8194;&#8194;我们可以通过$emit()以及$broadcast()来发布事件   
&#8194;&#8194;&#8194;&#8194;1) $emit(name, args)  
```
$emit() : 发布的事件，会从子作用域发送到父作用域。  
    name : 发布的事件名称   
    args : 会作为对象传递到事件的监听器中   
 ```
&#8194;&#8194;&#8194;&#8194;$emit()实例

    $scope.$emit('comparewatch', result_all);

&#8194;&#8194;&#8194;&#8194;2) $broadcast(name, args)   
```
$broadcast() ： 从父作用域到子作用域。
    与$emit的参数获取相同
    name ： 事件的名字，
    args ： 监听器接受的参数。
```

&#8194;&#8194;&#8194;&#8194;$broadcast()实例   

    scope.$broadcast('compare', comparedata);

### 事件的监听
&#8194;&#8194;&#8194;&#8194;事件发布了，我们要监听事件，才会对事件进行响应，可以通过$on()方法来监听事件。
   
    $scope.$on(name, listenerFn)
      
&#8194;&#8194;&#8194;&#8194;当以name为事件名的事件被触发之后，listenerFn事件就会被执行。   
&#8194;&#8194;&#8194;&#8194;$on实例

    $scope.$on('compare',function(d,data){

### 事件对象
&#8194;&#8194;&#8194;&#8194;所有的事件监听器第一个参数都代表了事件对象，该对象有以下属性：   
```
    targetScope       : 作用域对象，发送事件的作用域    
    currentScope      : 当前处理事件的作用域    
    name              : 当前事件的事件的名称    
    stopPropagation   : 取消$emit触发的事件进一步的传播    
    preventDefaul     : 把defaultPreevented标志设置为true，告诉子作用域可以无需处理该事件。    
    defaultPreevented : 布尔值
```

### angular内置事件   
- $includeContentLoaded($emit事件) :    
&#8194;&#8194;&#8194;&#8194;ngInclude内容重新加载的时候，从ngInclude指令触发。   
- $includeContentRequested($emit事件) :   
&#8194;&#8194;&#8194;&#8194;从调用ngInclude的作用域上发送，每次ngInclude的内容被请求的时候，都会发布该事件。   
- $viewContentLoaded($emit事件) :    
&#8194;&#8194;&#8194;&#8194;当ngView内容被重新加载时，从ngView作用域上发布。   
- $locationChangeStart($broadcast事件) :    
&#8194;&#8194;&#8194;&#8194;通过$location服务对浏览器的地址更新时会触发$locationChangeStart事件。   
- $locationChangeSuccess($broadcast事件) :    
&#8194;&#8194;&#8194;&#8194;当浏览器的地址成功变更时触发。   
- $routeChangeStart($broadcast事件) :   
&#8194;&#8194;&#8194;&#8194;在路由变更发生之前，该事件从$rootScope发布。
