# Echoing
A naive visualizing tool.

# Intro

这是一个出于无聊而写成的小小的前端项目。 可用来把一些数据用table展现出来。

使用post请求使数据发送端和服务器端分离, 数据发送只需要模拟post请求。

本项目用 nodejs 作为服务器后端， less渲染css, css框架使用spectre.css, jade作为页面模板, redis作分布式缓存, websocket实现即时推送.

# How to use

使用之前请先用 npm install 来安装依赖....

使用 node app.js 启动服务器， 如果想设置自己的redis服务， 请修改 redis_info.json, 

否则会默认使用作者的渣渣服务器.....

本项目使用 name 关键字作为数据主键， score关键字作为数据排序的依据。 

首先需要向http://localhost/data_update, post一条json数据, 格式为 

```
{
    "name": "_std",
    "score": 0,
    "A": 0,
    "B": 0,
    ...
}
```

其中 name, score, A, B 等会成为table的表头。 

随后即可post数据, 比如

```
{
    "name": "acesrc",
    "score": 720,
    "A": 100,
    "address": "StarFire",
}
```

当然你可以post无关键， 比如上面的address， 不过由于第一条_std的限制， address是不会出现在table中的。 

如果想限制显示的内容, 则需要post一条name值为_members的数据， 格式为：

```
{
    "name": "_members",
    "value": ["acesrc", "zsc", "roo"]
}
```

就只会显示name值为"acesrc", "zsc", "roo"的三条数据.

# Samples

可以使用test目录下的脚本, post.sh可以用来模拟post请求。

当使用 sh clean.sh, 会清空table.

当使用 sh set.sh, 会向table插入三条数据.
