var fs = require('fs')
var zlib = require('zlib')

fs.createReadStream('input')
    .pipe(zlib.createGzip())
    .pipe(fs.createWriteStream('input.gz'));

console.log('compress finished')
