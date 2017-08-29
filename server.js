var http = require('http');
var url = require('url')
var querystring = require('querystring')

function start(route) {
    http.createServer(function (request, response) {
        var parser = url.parse(request.url)
        route(parser.pathname)

        response.writeHead(200, {'Content-Type': 'text/plain'})
        response.write(parser.pathname + '\n')
        response.write(JSON.stringify(parser) + '\n')
        if (parser['query']) {
            response.write(JSON.stringify(querystring.parse(parser['query'])) + '\n')
        }
        //response.write(querystring.parse(parser.query))
        response.end()
    }).listen(8080);
    console.log('Listening at localhost:8080');
}

exports.start = start
