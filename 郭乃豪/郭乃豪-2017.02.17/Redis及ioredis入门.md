# Redis 及 ioredis 入门  
## 1. redis 简介   
Redis是一个开源，高级的键值存储和一个适用的解决方案，用于构建高性能，可扩展的Web应用程序。   

### 1.1 redis 的优点   
以下是Redis的一些优点。   

* **异常快** - Redis非常快，每秒可执行大约110000次的设置(SET)操作，每秒大约可执行81000次的读取/获取(GET)操作。
* **支持丰富的数据类型** - Redis支持开发人员常用的大多数数据类型，例如列表，集合，排序集和散列等等。这使得Redis很容易被用来解决各种问题，因为我们知道哪些问题可以更好使用地哪些数据类型来处理解决。
* **操作具有原子性** - 所有Redis操作都是原子操作（原子操作是不可分割的，在执行完毕之前不会被任何其它任务或事件中断。在多进程（线程）访问共享资源时，能够确保所有其他的进程（线程）都不在同一时间内访问相同的资源。），这确保如果两个客户端并发访问，Redis服务器能接收更新的值。
* **多实用工具** - Redis是一个多实用工具，可用于多种用例，如：缓存，消息队列(Redis本地支持发布/订阅)，应用程序中的任何短期数据，例如，web应用程序中的会话，网页命中计数等。
### 1.2 redis 的数据类型   
Redis支持5种数据类型。   
#### 1.2.1 字符串   
Redis中的字符串是一个字节序列。Redis中的字符串是二进制安全的，这意味着它们的长度不由任何特殊的终止字符决定。因此，可以在一个字符串中存储高达512兆字节的任何内容。   
##### 1.2.1.1 取值与赋值
**示例：**   

      redis 127.0.0.1:6379> set name "yiibai.com"
      OK
      redis 127.0.0.1:6379> get name
      "yiibai.com"       
在上面的示例中，set和get是Redis命令，name是Redis中使用的键，yiibai.com是存储在Redis中的字符串的值。   
注 - Redis命令不区分大小写，如SET,Set和set都是同一个命令。字符串值的最大长度为 512MB。   
###### 1.2.1.2 递增数字   
**示例：**   
```
127.0.0.1:6379> set redisClassString 3
OK
127.0.0.1:6379> get redisClassString
"3"
127.0.0.1:6379> incr redisClassString
(integer) 4
127.0.0.1:6379> incr redisClassString
(integer) 5
127.0.0.1:6379> get redisClassString
"5"
```
在上面的示例中，incr命令将键的整数值增加1，当要操作的键不存在是会默认键值为0，当键值不为整数时Redis会提示错误。
#### 1.2.2 散列/哈希   
Redis散列/哈希(Hashes)是键值对的集合。Redis散列/哈希是字符串字段和字符串值之间的映射。因此，它们用于表示对象。   
##### 1.2.2.1 赋值与取值   
**示例:**   
```
127.0.0.1:6379> hset redisClass test 'hstest'
(integer) 1
127.0.0.1:6379> hget redisClass test
"hstest"
```     
在上述示例中，散列/哈希数据类型用于存储包含用户的基本信息的用户对象。这里HSET，hget是Redis的命令，而redisClass是键的名称,test是字段，'hstest'为字段值。每个散列/哈希可以存储多达2^32 - 1个健-值对(超过40亿个)。    
当需要同时设置多个字段的值时，可以使用HMSET命令。如果想获取键中所有的字段和字段值，可以使用HGETALL命令。   
**示例：**   
```
127.0.0.1:6379> hmget redisClass test test2
1) "hstest"
2) "hstest"
127.0.0.1:6379> hgetall redisClass
1) "test"
2) "hstest"
3) "test2"
4) "hstest"
```   
##### 1.2.2.2 删除字段   
HDEL命令可以删除一个或多个字段，返回值是被删除的字段个数。   
**示例：**   
```
127.0.0.1:6379> hdel redisClass test test2
(integer) 2
127.0.0.1:6379> hgetall redisClass
(empty list or set)
```
#### 1.2.3 列表   
Redis列表只是字符串列表，按插入顺序排序。您可以向Redis列表的头部或尾部添加元素。列表的最大长度为2^32 - 1个元素(即4294967295，每个列表可存储超过40亿个元素)。   
##### 1.2.3.1 向列表两端添加元素与获得列表片段   
**示例：**   
```
127.0.0.1:6379> lpush mylist "redis"
(integer) 1
127.0.0.1:6379> lpush mylist "redis2"
(integer) 2
127.0.0.1:6379> lpush mylist "redis3"
(integer) 3
127.0.0.1:6379> lrange mylist 0 10
1) "redis3"
2) "redis2"
3) "redis"
```
在上面的示例中，通过命令LPUSH将三个值插入到名称为“mylist”的Redis列表中。RPUSH命令用来向列表右边添加元素。lrange命令为获得从0到10之间的所有元素。redis列表起始索引为0。   
##### 1.2.3.2 从列表两端弹出元素   
**示例：**   
```
127.0.0.1:6379> lrange mylist 0 10
1) "redis3"
2) "redis2"
3) "redis"
127.0.0.1:6379> lpop mylist
"redis3"
127.0.0.1:6379> rpop mylist
"redis"
127.0.0.1:6379> lrange mylist 0 10
1) "redis2
```   
LPOP命令可以从列表左边弹出一个元素，返回值为被移除的元素。RPOP则为从右边弹出元素的命令。
#### 1.2.4 集合   
Redis集合是唯一字符串的无序集合。 唯一值表示集合中不允许键中有重复的数据。在Redis中设置添加，删除和测试成员的存在(恒定时间O(1)，而不考虑集合中包含的元素数量)。列表的最大长度为2^32 - 1个元素(即4294967295，每组集合超过40亿个元素)。集合间还可以进行运算操作。   
##### 1.2.4.1 增加/删除元素   
**示例：**   
```
redis 127.0.0.1:6379> SADD myset "redis"
(integer) 1
redis 127.0.0.1:6379> SADD myset "mongodb"
(integer) 1
redis 127.0.0.1:6379> SADD myset "mysql"
(integer) 1
redis 127.0.0.1:6379> SADD myset "mysql"
(integer) 0
redis 127.0.0.1:6379> SMEMBERS "myset"  
1) "mysql"
2) "mongodb"
3) "redis"
```
在上面的示例中，通过命令SADD将三个值插入到名称为“myset”的Redis集合中。删除元素使用SREM命令来删除集合中的一个或多个元素，并返回删除成功的个数。   
##### 1.2.4.2 获得集合中的所有元素   
SMEMBERS命令可以返回集合中的所有元素。   
#### 1.2.5 有序集合   
Redis 有序集合和集合一样也是string类型元素的集合,且不允许重复的成员。   
不同的是每个元素都会关联一个double类型的分数。redis正是通过分数来为集合中的成员进行从小到大的排序。   
有序集合的成员是唯一的,但分数(score)却可以重复。    
集合是通过哈希表实现的，所以添加，删除，查找的复杂度都是O(1)。 集合中最大的成员数为 232 - 1 (4294967295, 每个集合可存储40多亿个成员)。
**示例：**   
```
redis 127.0.0.1:6379> ZADD runoobkey 1 redis
(integer) 1
redis 127.0.0.1:6379> ZADD runoobkey 2 mongodb
(integer) 1
redis 127.0.0.1:6379> ZADD runoobkey 3 mysql
(integer) 1
redis 127.0.0.1:6379> ZADD runoobkey 3 mysql
(integer) 0
redis 127.0.0.1:6379> ZADD runoobkey 4 mysql
(integer) 0
redis 127.0.0.1:6379> ZRANGE runoobkey 0 10 WITHSCORES
1) "redis"
2) "1"
3) "mongodb"
4) "2"
5) "mysql"
6) "4"
```
在以上实例中我们通过命令 ZADD 向 redis 的有序集合中添加了三个值并关联上分数。   
## 2. ioredis
Node.js 的Redis客户端我们选择的是ioredis。
ioredis在js中的引用：
```js
var Redis = require('ioredis');//引用ioredis模块
var redis = new Redis({
    port: 6379,          // Redis port
    host: '192.100.20.13',   // Redis host
    family: 4,           // 4 (IPv4) or 6 (IPv6)
    password: 'rocky',
    db: 0
});
```
ioredis存取的js代码：   
```js
redis.set('foo', 'bar');
redis.get('foo', function (err, result) {
    if (err) {
        console.error(err);
    } else {
        console.log(result);
    }
});
// Or using a promise if the last argument isn't a function
redis.get('foo').then(function (result) {
    console.log(result);
});
redis.sadd('set', 1, 3, 5, 7);
redis.sadd('set', ['{"STIME":1,"SUM(LEVEL0NUMBER)":0,"SUM(LEVEL1NUMBER)":0}','{"STIME":2,"SUM(LEVEL0NUMBER)":0,"SUM(LEVEL1NUMBER)":6}']);
redis.smembers('set').then(function (result) {
    console.log(result);
});
redis.lpush("redisList", 'list1');
redis.lrange('redisList', 0, 2).then(function (result) {
    console.log(result);
});
redis.hset('redisTest','name','111');
redis.hgetall('redisTest').then(function (result) {
    console.log(result);
});
redis.hmset('redisTest1','name3','111','name2',"222");
redis.hgetall('redisTest1').then(function (result) {
    console.log(result);
});
```   
在以上实例中，'foo'为我们字符串类型存储的键，'bar'为键值。'set'为我们使用集合类型存储的键。redisList为我们使用列表类型存储的键。redisTest和redisTest1为我们使用哈希类型存储的键。
返回的结果为：   
```
'bar'
[ '1',
  '{"STIME":1,"SUM(LEVEL0NUMBER)":0,"SUM(LEVEL1NUMBER)":0}',
  '5',
  '3',
  '[object Object]',
  '{"STIME":2,"SUM(LEVEL0NUMBER)":0,"SUM(LEVEL1NUMBER)":6}',
  '7' ]
['list1']
{ name: '111'}
{ name3: '111', name2: '222' }
```   
**注意：**   
使用ioredis执行命令时需要传入回调函数来获得返回值，当命令执行完成后ioredis会调用该函数，并将命令的错误信息作为第一个参数、返回值作为第二个参数参数传递给该函数。同时ioredis还支持Promise形式的异步处理方式，如果省略最后一个回调函数，命令语句会返回一个Promise值。
由于NodeJS的异步模型使得ioredis调用Redis命令的表现与Redis的底层管道协议十分相似：调用命令函数时，并不会等待redis返回命令执行结果，而是直接执行下一条语句。例如上述SET和GET两个命令，我们并不需要SET命令的返回值，只要保证SET命令在GET命令前发出即可，所以完全不用等待SET命令返回结果后再执行GET命令。但由于SET和GET并没有真正使用Redis的管道协议发送，所以当有多个客户端同时向redis发送命令时，上例中的两个命令间可能会插入其他命令，也就是GET到的值可能并不是SET的值。
