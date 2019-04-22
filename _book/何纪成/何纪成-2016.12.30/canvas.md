# canvas
主要介绍canvas的基础操作，并分享监视平台建设中使用canvas的相关经验。
## 基础
HTML5 的 canvas 元素使用 JavaScript 在网页上绘制图像。   
画布是一个矩形区域，您可以控制其每一像素。   
canvas 拥有多种绘制路径、矩形、圆形、字符以及添加图像的方法。   
### canvas元素
canvas 元素规定元素的 id、宽度和高度：
```html
<canvas id="myCanvas">
      <br/>
      Your browser does not support the canvas element.
      您的浏览器不支持canvas对象，请升级至最新版本。如您使用IE9及以上版本仍不能显示本对象，请检查浏览器的兼容性视图设置中是否包含本站，如包含，请去除。
</canvas>
```
### 使用javascript绘制
canvas 元素本身是没有绘图能力的。所有的绘制工作必须在 JavaScript 内部完成。   
2d绘图接口：
```javascript
//获取canvas对象
var canvas=document.getElementById("myCanvas");
//2d绘图接口
var ctx=canvas.getContext("2d");
```
所有的绘制都是基于坐标的，左上角为坐标0,0点   

描画文字：
```javascript
ctx.fillStyle = '#fff';
//画设备名称
ctx.fillText(this.nodeName, Number(this.x-16), Number(this.y)+32);
```
描画线条：
```javascript
ctx.beginPath();
ctx.moveTo(this.x,this.y);
ctx.strokeStyle = "#F00";
ctx.lineTo((Number(this.x)+Number(oppositeNodeX))/2,(Number(this.y)+Number(oppositeNodeY))/2);
ctx.stroke();
ctx.closePath();
```
描画图片：
```javascript
ctx.drawImage(img_device_fw, this.x - 16, this.y - 16);
```
描画圆：
```javascript
//画托盘
//生成一个渐变画笔
var grd=ctx.createRadialGradient(this.x,this.y,5,this.x,this.y,functionRadius);
grd.addColorStop(0,"rgba(0,0,128,0.5)");
grd.addColorStop(1,"rgba(0,0,64,0.5)");
//画一个圆，用渐变画笔来填充这个圆
ctx.fillStyle=grd;
ctx.beginPath();
ctx.arc(this.x,this.y,functionRadius,0,Math.PI*2,true);
ctx.closePath();
ctx.fill();
```
描画圆环：
```javascript
//描绘二级功能圆环
ctx.beginPath();
ctx.arc(this.x,this.y,functionRadius*ringInsideTimes,startRad,startRad+(paintIndex+1)*totalRad/10);
ctx.arc(this.x,this.y,functionRadius*ringOutsideTimes,startRad+(paintIndex+1)*totalRad/10,startRad,true);
ctx.closePath();
var secondGradient = ctx.createLinearGradient( this.x, Number(this.y) - functionRadius*ringOutsideTimes, this.x, Number(this.y) +
  functionRadius*ringOutsideTimes);
//渐变分为段，第1段为纯透明，第2段为透明到半透明渐变，第3段为半透明，第4段为半透明到透明渐变，第5段为纯透明
secondGradient.addColorStop(0, "rgba(0,0,128,0)");
secondGradient.addColorStop(ringGradientFirstSide/10, "rgba(0,0,128,0)");
secondGradient.addColorStop(0.4, "rgba(0,0,128,0.5)");
secondGradient.addColorStop(0.6, "rgba(0,0,128,0.5)");
secondGradient.addColorStop((10-ringGradientFirstSide)/10, "rgba(0,0,128,0)");
secondGradient.addColorStop(1, "rgba(0,0,128,0)");
ctx.fillStyle = secondGradient;
ctx.fill();
```
清空画布：
```javascript
ctx.clearRect(0, 0, canvas.width, canvas.height);
```
缩放描画：
缩放当前绘图至更大或更小
```javascript
ctx.scale(scaleRate,scaleRate);
```
## 管控描画实现
节点对象
```javascript
/**
* 节点对象
*/
function Node(x,y){
 //左上角位置
 this.x=x;
 this.y=y;
 //	this.monitorobjectType = 6;//这里先设置成纵向

 this.oppositeNodeStateArray= [];
 /**
  * 绘制
  */
 this.draw=function()
 {
  //画设备名称
  //画设备间连线
  //画右键托盘
  //如果前资产为交换机，从netIpObj取出对端资产的ip集合，遍历全部资产，求得最左最右的X轴坐标，然后画线
  //描画资产
  //描画离线状态
  //描画告警资产
  //描画选中状态
  }
}
```
重画
```javascript
  //重画
  function reDraw(){
  }
```

```javascript

canvas.addEventListener("mousedown",OnMouseDown,false);
canvas.addEventListener("mousemove",OnMouseMove,false);
canvas.addEventListener("mouseup",OnMouseUp,false);
canvas.addEventListener("mousewheel", OnMouseWheel, false);
document.oncontextmenu = function (evt){
}
```
