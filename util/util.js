var fs = require('fs')

function readJson(pathname, callback) {
    fs.readFile(pathname, function(err, data) {
        if (err) {
            throw err
        }
        else {
            callback(JSON.parse(data))
        }
    })
}

function readJsonSync(pathname) {
    try {
        var data = fs.readFileSync(pathname)
    }
    catch (err) {
        throw err
    }
    return JSON.parse(data)
}

exports.readJson = readJson
exports.readJsonSync = readJsonSync
