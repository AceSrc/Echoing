var fs = require('fs')
var zlib = require('zlib')

fs.createReadStream('input.gz')
    .pipe(zlib.createGunzip())
    .pipe(fs.createWriteStream('output'));

console.log('compress finished')
