Moment.js
====================

### 优点：
1.  日期格式化   
2.  相对时间      

          moment("20111031","YYYYMMDD").fromNow(); //5年前   
          moment("20120620","YYYYMMDD").fromNow(); //5年前     
          moment().startOf('day').fromNow //1天前
          moment().endOf('day').fromNow   //2小时内
          moment().endOf('hour').fromNow   //40分钟前   

3.    日历时间   
4.  多语言支持   

### 使用方法：
#### 浏览器

        <script src="moment.js"></script>
        <script>
            moment().format();
        </script>

#### 时间戳
      moment.unix(Number)

#### 克隆
      var a = moment([2012]);
      var b = moment(a);
      a.year(2000);
      b.year(); // 2012

      var a = moment([2012]);
      var b = a.clone();
      a.year(2000);
      b.year(); // 2012

#### 最大值，最小值
      moment.max(Moment[,Moment...]);
      moment.min(Moment[,Moment...]);
#### 加减法
##### 加法
      moment().add(Number, String);
      moment().add(Duration);
      moment().add(Object);

      moment().add(7, 'days').add(1, 'months'); // with chaining
      moment().add({days:7,months:1});
      moment().add(1000000, 'milliseconds'); // a million milliseconds
      moment().add(360, 'days'); // 360 days
      moment([2010, 0, 31]);                  // January 31
      moment([2010, 0, 31]).add(1, 'months'); // February 28
##### 减法
      moment().subtract(Number, String);
      moment().subtract(Duration);
      moment().subtract(Object);

#### 时差 (之前，现在为基准)
      moment().fromNow();
      moment().fromNow(Boolean);
#### 时差 (之前)
      moment().from(Moment|String|Number|Date|Array);
      moment().from(Moment|String|Number|Date|Array, Boolean);
#### 时差 (之后，现在为基准)
      moment().toNow();
      moment().toNow(Boolean);
#### 时差 (之后)
      moment().to(Moment|String|Number|Date|Array);
      moment().to(Moment|String|Number|Date|Array, Boolean);
#### 时差 (毫秒)
      moment().diff(Moment|String|Number|Date|Array);
      moment().diff(Moment|String|Number|Date|Array, String);
      moment().diff(Moment|String|Number|Date|Array, String, Boolean);
#### 是否之前
      moment().isBefore(Moment|String|Number|Date|Array);
      moment().isBefore(Moment|String|Number|Date|Array, String);
#### 是否相同
      moment().isSame(Moment|String|Number|Date|Array);
      moment().isSame(Moment|String|Number|Date|Array, String);
#### 是否之后
      moment().isAfter(Moment|String|Number|Date|Array);
      moment().isAfter(Moment|String|Number|Date|Array, String);
#### 是否之间
      moment().isBetween(moment-like, moment-like);
      moment().isBetween(moment-like, moment-like, String);

[例子](http://localhost:4000/%E5%88%98%E6%B2%88/%E5%88%98%E6%B2%88-2017.03.10/moment1.html)
