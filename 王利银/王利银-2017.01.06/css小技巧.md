# CSS小技巧汇总
## 1.清除图片下方出现几像素的空白间隙
方法1：
```
img{display:block;}    
```  
方法2：
````
img{vertical-align:top;}
````
除了top值，还可以设置为text-top | middle | bottom | text-bottom，甚至特定的length和percentage值都可以   

方法3:
````
#test{font-size:0;line-height:0;}
````
 #test为img的父元素  
## 2.让文本垂直对齐文本输入框
````
input{vertical-align:middle;}
````
## 3.让单行文本在容器内垂直居中
````
#test{height:25px;line-height:25px;}
````
只需设置文本的行高等于容器的高度即可

## 4.让超链接访问后和访问前的颜色不同且访问后仍保留hover和active效果
````
a:link{color:#03c;}
a:visited{color:#666;}
a:hover{color:#f30;}
a:active{color:#c30;}
````

按L-V-H-A的顺序设置超链接样式即可，可速记为LoVe（喜欢）HAte（讨厌）
## 5.为什么Standard mode下IE无法设置滚动条的颜色？
````
html{
  scrollbar-3dlight-color:#999;
  scrollbar-darkshadow-color:#999;
  scrollbar-highlight-color:#fff;
  scrollbar-shadow-color:#eee;
  scrollbar-arrow-color:#000;
  scrollbar-face-color:#ddd;
  scrollbar-track-color:#eee;
  scrollbar-base-color:#ddd;
}
````
将原来设置在body上的滚动条颜色样式定义到html标签选择符上即可
## 6.使文本溢出边界不换行强制在一行内显示
```
#test{width:150px;white-space:nowrap;}
```
## 7.使文本溢出边界显示为省略号
方法（此方法Firefox5.0尚不支持）：
````
#test{width:150px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
````
首先需设置将文本强制在一行内显示，然后将溢出的文本通过overflow:hidden截断，并以text-overflow:ellipsis方式将截断的文本显示为省略号。
## 8.使连续的长字符串自动换行
````
#test{width:150px;word-wrap:break-word;}
````
word-wrap的break-word值允许单词内换行
## 9.清除浮动
方法1：
```
#test{clear:both;}
#test为浮动元素的下一个兄弟元素
```
方法2：
````
#test{display:block;zoom:1;overflow:hidden;}
#test为浮动元素的父元素。zoom:1也可以替换为固定的width或height
````
方法3：
````
#test{zoom:1;}
#test:after{display:block;clear:both;visibility:hidden;height:0;content:'';}
#test为浮动元素的父元素
````
## 10.定义鼠标指针的光标形状为手型并兼容所有浏览器
````
#test{cursor:pointer;}
````
若将cursor设置为hand，将只有IE和Opera支持，且hand为非标准属性值
##  11.让已知高度的容器在页面中水平垂直居中
````
#test{position:absolute;top:50%;left:50%;width:200px;height:200px;margin:-100px 0 0 -100px;}
````
## 12.为什么2个相邻div的margin只有1个生效？
````
.box1{margin:10px 0;}
.box2{margin:20px 0;}
<div class="box1">box1</div>
<div class="box2">box2</div>
````
本例中box1的底部margin为10px，box2的顶部margin为20px，但表现在页面上2者之间的间隔为20px，而不是预想中的10+20px=30px，结果是选择2者之间最大的那个margin，我们把这种机制称之为“外边距合并”；外边距合并不仅仅出现在相邻的元素间，父子间同样会出现。

简单列举几点注意事项:
```
1. 外边距合并只出现在块级元素上；
2. 浮动元素不会和相邻的元素产生外边距合并；
3. 绝对定位元素不会和相邻的元素产生外边距合并；
4. 内联块级元素间不会产生外边距合并；
5. 根元素间不会不会产生外边距合并（如html与body间）；
6. 设置了属性overflow且值不为visible的块级元素不会与它的子元素发生外边距合并。
```
