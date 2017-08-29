process.on('beforeExit', function() {
    console.log('Before Exit')
})

console.log(__filename)
console.log(__dirname)

var t = setTimeout(function () {
    console.log('HelloWorld')
}, 1000)

clearTimeout(t)

//var interval = setInterval(function () {
    //console.log('HelloWorld, interval')
//}, 500)

var time = console.time()

console.error('Bang!')
console.warn('FBI warning!')
console.dir({'a' : 1, 'b' : 2})

console.timeEnd(time)

//console.trace()

console.log(process.argv)
console.log(process.execPath)
console.log(process.versions)
console.log(process.pid)
console.log(process.arch)
console.log(process.platform)
console.log(process.memoryUsage())
console.log(process.uptime())
console.log(process.env)
