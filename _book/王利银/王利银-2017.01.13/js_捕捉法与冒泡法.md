# js 捕捉法与冒泡法
假设我们有一个链接，它被嵌套在一个无序列表标签内，例如：
```
<body>
  <ul>
    <li><a href="http://phpied.com">my blog</a></li>
  </ul>
</body>
```
当我们点击该链接时，实际上我们也点击了列表项li、列表ul、body乃至于整个document对象，这种行为称之为传播(propagation)。换句话说，对该链接的单击也可以看作对document对象的单击。事件传播过程通常有两种方式：
1. 事件捕捉：单击首先发生在document上，然后依次传递给body、列表、列表项，并最终到达该链接，称为捕捉法。
2. 事件冒泡：单击首先发生在该链接上，然后逐层向上冒泡，直至document对象，称为冒泡法。  
## 历史发展概述
事件传播也叫做事件流，它描述的是从页面中接收事件的顺序。从历史上来说，IE和Netscape(美国网景公司)(当时业界并没有一个统一的标准可以遵循)的相关实现是高度不统一的。IE使用冒泡法，而Netscape则只使用捕捉法。
## addEventListener() 方法
```
element.addEventListener(event, function, useCapture);
```        
 - 第一个参数是事件的类型 (如 "click" 或 "mousedown").
 - 第二个参数是事件触发后调用的函数。
 - 第三个参数是个布尔值用于描述事件是冒泡还是捕获。该参数是可选的。默认值为 false, 即冒泡传递，当值为 true 时, 事件使用捕获传递。    
 - 注意:不要使用 "on" 前缀。 例如，使用 "click" ,而不是使用 "onclick"。
### 第一部分：事件冒泡
如何阻止事件冒泡？      
实际上，事件的对象有一个stopPropagation()方法可以阻止事件冒泡，我们只需要把上个例子中button的事件处理程序修改如下：
```
document.getElementById("button").addEventListener("click",function(event){
       alert("button");
       event.stopPropagation();  
 },false);
```
### 第二部分：事件捕获
如何阻止事件捕获？    
那么我们如何才能阻止事件的捕获呢？使用event.stopPropagation()方法吗？答案是否定的，这里要知道，stopPropagation()方法只能阻止事件的冒泡，而不能阻止事件捕获。    
##### 但是我们可以使用DOM3级新增事件stopImmediatePropagation()方法来阻止事件捕获，另外此方法还可以阻止事件冒泡。应用如下：
```
document.getElementById("second").addEventListener("click",function(event){
       alert("second");
       event.stopImmediatePropagation();  
 },true);
```
