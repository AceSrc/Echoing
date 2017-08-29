var fs = require('fs')
var data = ''

var readerStream = fs.createReadStream('input')
readerStream.setEncoding('UTF8')

readerStream.on('data', function(chunk) {
    console.log(chunk)
    data += chunk
})

readerStream.on('end', function() {
    console.log(data)
})

readerStream.on('error', function() {
    console.log(err.stack)
})

console.log('finished')
