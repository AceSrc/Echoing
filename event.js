String.prototype.format = function() {
    var args = arguments;
    return this.replace(/\{(\d+)\}/,
        function(m, i){
            return args[i];
        });
}

var events = require('events');
var eventEmitter = new events.EventEmitter();
eventEmitter.on('some', function(data) {
    console.log(data);
});

eventEmitter.on('error', function(error) {
    console.log('emit an error {0}'.format([error]));
});

func1 = function(arg) {
    console.log('HELL1 {0}'.format([arg]));
}

func2 = function(arg) {
    console.log('HELL2 {0}'.format([arg]));
}

eventEmitter.addListener('some', func1);
eventEmitter.once('some', func2);
eventEmitter.emit('some', 'HelloWorld');

console.log(eventEmitter.listenerCount('some'));
console.log(eventEmitter.listeners('some'));

eventEmitter.removeListener('some', func1)
console.log(eventEmitter.listeners('some'));
