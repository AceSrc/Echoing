var path = require('path')
var express = require('express')
var app = express()
var lessCompiler = require('express-less-middleware')('public')
var url = require('url')
var cookieParser = require('cookie-parser')
var redis = require('./cache/redis')
var bodyParser = require('body-parser')

var expressJade = require('express-jade')
var viewsDir = path.join(__dirname, 'views')
var namespace = 'jade'
var jadeOptions = { pretty: true }
app.get('/js/templates/*', expressJade(viewsDir, namespace))

app.use(lessCompiler)
app.use(bodyParser.json())
app.use('/css', express.static(path.join(__dirname, 'css')))
app.use('/css', express.static(path.join(__dirname, 'node_modules/spectre.css/dist')))
app.use('/js', express.static(path.join(__dirname, 'js')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/socket.io-client/dist')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/jade')))

app.use(cookieParser('acesrc'))

app.set('view engine', 'jade')
app.set('views', './views')

function legalUrl(pathname) {
    var pattern = /^[/\.\w]+(\?\S*)?$/
    return pathname.search(pattern) != -1
}

app.all('/*', function(req, res, next) {
    if (!legalUrl(req.url)) {
        res.send('illegal url')
        res.end()
    }
    else next()
})

var header = null
var data = []
function getData(callback) {
    var contestants;
    var local_header = null
    var local_data = []
    header = null
    data = []

    data_sync = true
    redis.smembers('contestants', function(err, data) {
        contestants = data
        readHeader()
    })

    function readHeader() {
        redis.hkeys('header', function(err, data) {
            if (err) {
                console.log(err.stack)
                res.send('Waiting...')
                res.end()
            }
            local_header = data
            readData()
        })
    }

    function readData() {
        local_data = []
        var cnt = 0
        var size = contestants.length
        if (contestants.length == 0) callback()
        for (var i in contestants)
            redis.hgetall(contestants[i], function(err, value) {
                local_data.push(value) 
                cnt++;
                if (cnt == size) {
                    for (var j in local_data)
                        if (!local_data[j]) local_data.splice(j, 1)
                    local_data.sort((x, y) => parseInt(x['score']) < parseInt(y['score']))
                    data = local_data
                    header = local_header
                    callback()
                }
            })
    }
}

app.get('/', function(req, res, next) {
    getData(show)
    function show() {
        res.render('index', {data_header: header, data: data})
    }
})

app.post('/data_update', function(req, res, next) {
    res.end()
    if (!req.body['name']) return ;
    if (req.body['name'] == '_std') {
        redis.del('header', function() {
            console.log(req.body)
            redis.hmset('header', req.body, function() {
                getData(function() {
                    data.sort((x, y) => parseInt(x['score']) < parseInt(y['score']))
                    websocket.emit('c_hi', {data_header: header, data: data})
                })
            })
        })
        return ;
    }

    if (req.body['name'] == '_members') {
        redis.del('contestants', function() {
            var cnt = 0;
            var size = req.body['value'].length
            if (size == 0) {
                getData(function() {
                    websocket.emit('c_hi', {data_header: header, data: data})
                })
            }

            for (i in req.body['value']) {
                redis.sadd('contestants', req.body['value'][i], function() {
                    cnt++;
                    if (cnt == size) {
                        getData(function() {
                            websocket.emit('c_hi', {data_header: header, data: data})
                        })
                    }
                })
            }
        })
        return ;
    }

    redis.hmset(req.body['name'], req.body, function(err) {
        if (err) console.log(err.stack)
        redis.sadd('contestants', req.body['name'], function(err) {
            if (err) console.log(err.stack)
            getData(function() {
                websocket.emit('c_hi', {data_header: header, data: data})
            })
        })
    })
})

app.get('/gist', function(req, res, next) {
    res.render('gist')
})

app.get('/picture', function (req, res, next) {
    res.render('picture')
})

//var server = app.listen(3000, function() {
    //var host = server.address().address;
    //var port = server.address().port;
    //console.log('Listening at %s:%s', host, port)
//})

var server = require('http').createServer(app)
var io = require('socket.io')(server)
var websocket = null;
server.listen(80, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Listening at %s:%s', host, port)
})
io.on('connection', function(socket) {
    websocket = socket
    socket.on('hi', function(data) {
        console.log(data)
        socket.emit('c_hi', 'hello too!')
    })

    socket.on('disconnect', function(data) {
        console.log('disconnect', data)
        socket.emit('c_leave', data)
    })

    getData(function() {
        socket.emit('c_hi', {data_header: header, data:data})
    })
})
