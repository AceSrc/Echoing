var socket = io.connect('localhost:80')
socket.on('c_hi', function(msg) {
    var addHtml = jade['ranklist'](msg)
    document.getElementById('ranklist').innerHTML = addHtml
})
