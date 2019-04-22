# 一、Kafka
Kafka是一种高吞吐量的分布式发布订阅消息系统，它可以处理消费者规模的网站中的所有动作流数据。 这种动作（网页浏览，搜索和其他用户的行动）是在现代网络上的许多社会功能的一个关键因素。 这些数据通常是由于吞吐量的要求而通过处理日志和日志聚合来解决。 对于像Hadoop的一样的日志数据和离线分析系统，但又要求实时处理的限制，这是一个可行的解决方案。Kafka的目的是通过Hadoop的并行加载机制来统一线上和离线的消息处理，也是为了通过集群机来提供实时的消费。
## 1.1 Kafka相关术语介绍
- Broker    
Kafka集群包含一个或多个服务器，这种服务器被称为broker
- Topic    
每条发布到Kafka集群的消息都有一个类别，这个类别被称为Topic。（物理上不同Topic的消息分开存储，逻辑上一个Topic的消息虽然保存于一个或多个broker上但用户只需指定消息的Topic即可生产或消费数据而不必关心数据存于何处）
- Partition    
Parition是物理上的概念，每个Topic包含一个或多个Partition.
- Producer    
负责发布消息到Kafka broker 
- Consumer    
消息消费者，向Kafka broker读取消息的客户端。
- Consumer Group    
每个Consumer属于一个特定的Consumer Group（可为每个Consumer指定group name，若不指定group name则属于默认的group）。    

## 1.2 kafka的环境搭建
### 1.2.1 kafka 单节点部署
>需要基础开发环境为java1.6以上

#### 1.2.1.1 zookeeper
解压缩
```shell
inode@inode1:/iflat$ tar zxvf zookeeper-3.4.9.tar.gz
```
复制一份配置文件,
```shell
inode@inode1:/iflat/zookeeper-3.4.9/conf$ cp zoo_sample.cfg zoo.cfg
```
编辑`zoo.cfg`, 内容如下:
在上面的配置文件中"server.id=host:port:port"中的第一个port是从机器（follower）连接到主机器（leader）的端口号，第二个port是进行leadership选举的端口号。
```shell
# The number of milliseconds of each tick
tickTime=2000
# The number of ticks that the initial
# synchronization phase can take
initLimit=10
# The number of ticks that can pass between
# sending a request and getting an acknowledgement
syncLimit=5
# the directory where the snapshot is stored.
# do not use /tmp for storage, /tmp here is just
# example sakes.
dataDir=/iflat/datapool/zookeeper
# the port at which the clients will connect
clientPort=2181
# the maximum number of client connections.
# increase this if you need to handle more clients
#maxClientCnxns=60
#
# Be sure to read the maintenance section of the
# administrator guide before turning on autopurge.
#
# http://zookeeper.apache.org/doc/current/zookeeperAdmin.html#sc_maintenance
#
# The number of snapshots to retain in dataDir
#autopurge.snapRetainCount=3
# Purge task interval in hours
# Set to "0" to disable auto purge feature
#autopurge.purgeInterval=1
dataLogDir=/iflat/logpool/zookeeper
# "server.id=host:port:port"中的host为主机名
# 第一个port是从机器（follower）连接到主机器（leader）的端口号
# 第二个port是进行leadership选举的端口号
server.1=192.168.25.111:2888:3888
#server.2=192.168.25.112:2888:3888
#server.3=192.168.25.113:2888:3888
#server.4=192.168.25.114:2888:3888
```
接下来在dataDir所指定的目录下创建一个文件名为myid的文件，文件中的内容只有一行，为本主机对应的id值，也就是上图中server.id中的id。
例如：在服务器1中的myid的内容应该写入1。
```shell
inode@inode1:/iflat$ echo "1" > /iflat/datapool/zookeeper/myid
inode@inode1:/iflat$ more /iflat/datapool/zookeeper/myid
1
```
启动zookeeper
```shell
inode@inode1:/iflat$ ./zookeeper-3.4.9/bin/zkServer.sh start
```
#### 1.2.1.2 安装kafka
解压安装包并做如下操作：
```shell
tar zxvf kafka_2.11-0.10.1.1.tgz
//修改配置文件/home/root/lijingfeng/kafka_2.11-0.10.1.1/config/server.properties
//如下
//# Licensed to the Apache Software Foundation (ASF) under one or more
//# contributor license agreements.  See the NOTICE file distributed with
//# this work for additional information regarding copyright ownership.
//# The ASF licenses this file to You under the Apache License, Version 2.0
//# (the "License"); you may not use this file except in compliance with
//# the License.  You may obtain a copy of the License at
//#
//#    http://www.apache.org/licenses/LICENSE-2.0
//#
//# Unless required by applicable law or agreed to in writing, software
//# distributed under the License is distributed on an "AS IS" BASIS,
//# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//# See the License for the specific language governing permissions and
//# limitations under the License.

//# see kafka.server.KafkaConfig for additional details and defaults

//#//////////////////////////////////////////////////////// Server Basics //////////////////////////////////////////////////////////

//# The id of the broker. This must be set to a unique integer for each broker.
broker.id=0

//## Switch to enable topic deletion or not, default value is false
//#delete.topic.enable=true

//#///////////////////////////////// Socket Server Settings //#////////////////////////////////////////////////////////

//# The address the socket server listens on. It will get the value returned from
//# java.net.InetAddress.getCanonicalHostName() if not configured.
//#   FORMAT:
//#     listeners = security_protocol://host_name:port
//#   EXAMPLE:
//#     listeners = PLAINTEXT://your.host.name:9092
//#listeners=PLAINTEXT://:9092

//# Hostname and port the broker will advertise to producers and consumers. If not set,
//# it uses the value for "listeners" if configured.  Otherwise, it will use the value
//# returned from java.net.InetAddress.getCanonicalHostName().
//#advertised.listeners=PLAINTEXT://your.host.name:9092

//# The number of threads handling network requests
num.network.threads=3

//# The number of threads doing disk I/O
num.io.threads=8

//# The send buffer (SO_SNDBUF) used by the socket server
socket.send.buffer.bytes=102400

//# The receive buffer (SO_RCVBUF) used by the socket server
socket.receive.buffer.bytes=102400

//# The maximum size of a request that the socket server will accept (protection against OOM)
socket.request.max.bytes=104857600


//#//////////////////////////////////////////////////////// Log Basics //////////////////////////////////////////////////////////

//# A comma seperated list of directories under which to store log files
log.dirs=/tmp/kafka-logs

//# The default number of log partitions per topic. More partitions allow greater
//# parallelism for consumption, but this will also result in more files across
//# the brokers.
num.partitions=1

//# The number of threads per data directory to be used for log recovery at startup and flushing at shutdown.
//# This value is recommended to be increased for installations with data dirs located in RAID array.
num.recovery.threads.per.data.dir=1

//#//////////////////////////////////////////////////////// Log Flush Policy ////#//////////////////////////////////////////////////////

//# Messages are immediately written to the filesystem but by default we only fsync() to sync
//# the OS cache lazily. The following configurations control the flush of data to disk.
//# There are a few important trade-offs here:
//#    1. Durability: Unflushed data may be lost if you are not using replication.
//#    2. Latency: Very large flush intervals may lead to latency spikes when the flush does occur as there will be a lot of data to flush.
//#    3. Throughput: The flush is generally the most expensive operation, and a small flush interval may lead to exceessive seeks.
//# The settings below allow one to configure the flush policy to flush data after a period of time or
//# every N messages (or both). This can be done globally and overridden on a per-topic basis.

//# The number of messages to accept before forcing a flush of data to disk
//#log.flush.interval.messages=10000

//# The maximum amount of time a message can sit in a log before we force a flush
//#log.flush.interval.ms=1000

//#//////////////////////////////////////////////////////// Log Retention Policy ////#//////////////////////////////////////////////////////

//# The following configurations control the disposal of log segments. The policy can
//# be set to delete segments after a period of time, or after a given size has accumulated.
//# A segment will be deleted whenever *either* of these criteria are met. Deletion always happens
//# from the end of the log.

//# The minimum age of a log file to be eligible for deletion
log.retention.hours=1

//# A size-based retention policy for logs. Segments are pruned from the log as long as the remaining
//# segments don't drop below log.retention.bytes.
//#log.retention.bytes=1073741824

//# The maximum size of a log segment file. When this size is reached a new log segment will be created.
log.segment.bytes=1073741824

//# The interval at which log segments are checked to see if they can be deleted according
//# to the retention policies
log.retention.check.interval.ms=300000

////#////////////////////////////////////////////////////// Zookeeper //////////////////////////////////////////////////////////

//# Zookeeper connection string (see zookeeper docs for details).
//# This is a comma separated host:port pairs, each corresponding to a zk
//# server. e.g. "127.0.0.1:3000,127.0.0.1:3001,127.0.0.1:3002".
//# You can also append an optional chroot string to the urls to specify the
//# root directory for all kafka znodes.
zookeeper.connect=192.100.10.234:2181

//# Timeout in ms for connecting to zookeeper
zookeeper.connection.timeout.ms=6000

listeners = PLAINTEXT://192.100.10.234:9092
```

启动kafka

```/home/root/iflat/kafka_2.11-0.10.1.0$ bin/kafka-server-start.sh config/server.properties &```

#### 1.2.1.3 使用测试
- 创建topic

```/kafka_2.11-0.10.1.1/bin/kafka-topics.sh --create --zookeeper 192.100.10.234:2181 --replication-factor 1 --partitions 1 --topic test20170112```
- 创建producer

```/kafka_2.11-0.10.1.1/bin/kafka-console-producer.sh --broker-list 192.100.10.234:9092 --topic test20170112```
- 创建consumer

```/kafka_2.11-0.10.1.1/bin/kafka-console-consumer.sh --zookeeper 192.100.10.234 --from-beginning --topic test20170112```

## 1.3 nodejs对kafka的producer操作
```js
var kafka = require('kafka-node');
var Producer = kafka.Producer;
var KeyedMessage = kafka.KeyedMessage;
var Client = kafka.Client;
var client = new Client('192.168.1.130:2181');
var argv = {
    topic: "songjian2"
};
var topic = argv.topic;
var p = argv.p || 0;
var a = argv.a || 0;
var producer = new Producer(client, {
    requireAcks: 1
});
producer.on('ready', function() {
    var args = {
        appid: 'wx238c28839a1',
        createTime: 'ddd',
        toUserName: 'wx238c28839a1',
        fromUserName: 'wx238c28839a1',
        money: '$100'
    };
    // var keyedMessage = new KeyedMessage('keyed', 'a keyed message');
    producer.send([{
        topic: topic,
        partition: p,
        messages: [JSON.stringify(args)],
        attributes: a
    }], function(err, result) {
        console.log(err || result);
        process.exit();
    });

    //create topics
    // producer.createTopics(['t1'], function (err, data) {
    //     console.log(data);
    // });
});
```
## 1.4 nodejs对kafka的consumer操作
```js
'use strict';

var kafka = require('kafka-node');
var events = require('events');
var emitter = new events.EventEmitter();
//var HighLevelConsumer = kafka.HighLevelConsumer;
var Consumer = kafka.Consumer;
var Offset = kafka.Offset;
var Client = kafka.Client;
var argv = {
    topic: "songjian2"
};
var topic = argv.topic;

var client = new Client('192.168.1.130:2181');
var topics = [{
        topic: topic,
        partition: 0,
        offset: 8000
    }],
    options = {
        autoCommit: false,
        fetchMaxWaitMs: 1000,
        fetchMaxBytes: 1024 * 1024,
        fromOffset: true
    };

var consumer = new Consumer(client, topics, options);
var offset = new Offset(client);

//consumer.setOffset(topic, 0, 36);
consumer.on('message', function(message) {
    var obj = message;
    var message = JSON.parse(message.value);
    var args = [];
    args.push(message.openId);
    args.push(message.fromUserName);
    args.push(message.toUserName);
    args.push(message.money);
    args.push(message.attach);
    args.push(message.appId);
    args.push(message.cTime);
    emitter.emit('load', args);

});

consumer.on('error', function(err) {
    console.log('error', err);
});

emitter.on('load', function(args) {
        console.log('listener2', args);

        // function insert(args) {
        //     middleconsumer.saveRecord(args)
        //         .then(function(data) {
        //             insert(args);
        //         }, function(er) {

        //         });
        // }
        // insert(args);
});
    /*
     * If consumer get `offsetOutOfRange` event, fetch data from the smallest(oldest) offset
     */
consumer.on('offsetOutOfRange', function(topic) {
    topic.maxNum = 2;
    offset.fetch([topic], function(err, offsets) {
        var min = Math.min.apply(null, offsets[topic.topic][topic.partition]);
        consumer.setOffset(topic.topic, topic.partition, min);
    });
});

```
## 1.5 node-kafka-test 例子
```js
var kafka = require('kafka-node') ;
var Producer = kafka.Producer;
var Client = kafka.Client;
var client = new Client('192.168.1.130:2181');
var topic = 'logService';
var p = 0;
var a = 0;
var producer = new Producer(client, { requireAcks: 1 });

producer.on('ready', function () {
    //var message = 'niefengjun2015';

    var ret={} ;
        ret.id="ceshi2016" ;
        ret.nie="2222" ;
        ret.qq="357403651" ;

    var r1= { topic: topic, partition: p, messages:JSON.stringify(ret)} ;
    console.log('11111',JSON.stringify(r1)) ;
    producer.send([
       r1
    ], function (err, result) {
        console.log(err || result);
        process.exit();
    });
});

producer.on('error', function (err) {
    console.log('error', err)
});

```
