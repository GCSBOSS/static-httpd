
var yaml = require('node-yaml');
var http = require('http');
var fs = require('fs');
var pathL = require('path');
const { URL } = require('url');
var mime = require('mime-types');

var cwd = '';

function notFound(res){
    res.writeHead(404);
    res.end('Not Found');
}

function respond(req, res){
    var u = new URL(req.url, 'http://127.0.0.1');
    var n = u.pathname;
    if(n.charAt(0) == '/')
        n = n.substr(1);
    if(n.charAt(n.length - 1) == '/')
        n = n.slice(0, -1);

    var p = pathL.resolve(cwd, settings.sourceDir, n);
    type = mime.lookup(p) || 'application/octet-stream';

    // Return if does not exists.
    var s = false;
    try { s = fs.lstatSync(p) } catch(e) {
        notFound(res);
        return;
    }

    // Is directory: parse everybody inside.
    if(s.isDirectory()){
        notFound(res);
        return;
    }

    res.writeHead(200, {
        'Content-Type': type,
        'Access-Control-Allow-Origin': '*'
    });
    res.end(fs.readFileSync(p, null));
}

var settings = {};
var server = http.createServer(respond);

module.exports = {
    start(path){
        if(typeof path !== 'string'){
            console.log('Settings path must be a string.');
            return;
        }

        // Load settings file.
        try { var s = fs.lstatSync(path) } catch(e) {
            console.log('Settings file not found in: ' + path);
            return;
        }
        settings = yaml.readSync(path);

        cwd = pathL.dirname(path);
        server.on('error', (err) => {
            console.log("Error: ", err);
        });
        server.listen(settings.port, 'localhost');
        console.log('Static HTTP Server listening at http://localhost:' + settings.port);
    }
};
