# HTML5 form表单 autocomplete 属性
### 定义和用法
autocomplete 属性规定表单是否应该启用自动完成功能。  

自动完成允许浏览器预测对字段的输入。当用户在字段开始键入时，浏览器基于之前键入过的值，应该显示出在字段中填写的选项。

注释：autocomplete 属性适用于form,以及下面的 input 类型：text, search,url,telephone,email,password,datepickers,range 以及 color.如果type属性的值是hidden,checkbox,radio,file或为按钮类型(button,submit,reset,image),则本属性被忽略.

###### 提示：在某些浏览器中，您可能需要手动启用自动完成功能。

### HTML 4.01 与 HTML 5 之间的差异
autocomplete 属性是 HTML5 中的新属性。

### 语法

````
<form autocomplete="on|off">
````     
### 属性值
on 默认,规定启用自动完成功能。    
off 规定禁用自动完成功能

### 延伸
#### HTML5 中的新属性autocomplete="off"失效的解决方法
浏览器自动填充机制是满足：页面里有一个type=password的input且这个input【前面】有一个type=text的input并input的值都为空的时候就会进行自动填充。    
firefox和360浏览器的处理方式是：只要检测到页面里有满足填充机制的，不管是不是display：none 的，只要检测到就直接往里填充。而且是有几个符合条件的就填充几个。而chrome版本略有不同：满足上面的条件且页面里只有一个type=password 的input。才会自动给第一个type=text 的input填充账号，给type=password 的input填充密码。
#### 最优解决办法
在不需要默认填写的input[type=password]框中设置 autocomplete="new-password",作用是设置一个新密码.163邮箱的登录注册是这么用的.

[demo](http://localhost:4000/王利银/王利银-2017.03.03/demo.html)