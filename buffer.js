var a = new Buffer('abc');
var b = new Buffer('abcd');

var t = a.compare(b);
console.log(t);

a.write('bcd');
t = a.compare(b);
console.log(t);
