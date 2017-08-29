var fs = require('fs')
var readerStream = fs.createReadStream('input')
var writerStream = fs.createWriteStream('output')

readerStream.pipe(writerStream)

console.log('finished')
