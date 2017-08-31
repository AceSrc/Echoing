var redis = require('redis')
var util = require('../util/util')

var redis_info = util.readJsonSync('./redis_info.json')
function link() {
    return redis.createClient(redis_info['PORT'], redis_info['IP'], {auth_pass: redis_info['passwd']})
}

function set(key, value, callback) {
    var client = link()
    client.set(key, value, callback)
}

function get(key, callback) {
    var client = link()
    client.get(key, callback)
}

function hmset(key, value, callback) {
    var client = link()
    client.hmset(key, value, callback)
}

function hmget(key, field, callback) {
    var client = link()
    client.hmget(key, field, callback)
}

function hgetall(key, callback) {
    var client = link()
    client.hgetall(key, callback)
}

function hkeys(key, callback) {
    var client = link()
    client.hkeys(key, callback)
}

function del(key, callback) {
    var client = link()
    client.del(key, callback)
}

function sadd(key, value, callback) {
    var client = link()
    client.sadd(key, value, callback)
}

function smembers(key, callback) {
    var client = link()
    client.smembers(key, callback)
}


exports.set = set
exports.get = get
exports.hmset = hmset
exports.hmget = hmget
exports.hgetall = hgetall
exports.hkeys = hkeys
exports.sadd = sadd
exports.smembers = smembers
exports.del = del
exports.print = redis.print
//hmset('address', {'js': 'javascript', 'cpp': 'C++'}, function (err, data) {
    //if (err) console.log(err.stack)
    //if (data) console.log(data)
//})

//hmget('address', ['js', 'cpp'], function (err, data) {
    //if (err) console.log(err.stack)
    //if (data) console.log(data)
//})
