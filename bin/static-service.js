#!/usr/bin/env node


if(typeof process.argv[2] != 'string'){
    console.log('\nType 1 of the following commands as parameter: install, run, uninstall.\n');
    return;
}

var service = require('os-service');
console.log(process.argv);

if(process.argv[2] == "install"){
    if((typeof process.argv[3] != 'string') || (typeof process.argv[4] != 'string')){
        console.log('To install static as a service, type a name to the server and a config file path respectively.');
        return;
    }
    service.add(
        'static-' + process.argv[3],
        { programArgs: ["run", process.argv[4]] },
        error => { if(error) console.log(error.message); }
    );
    return;
}

if(process.argv[2] == "uninstall"){
    if(typeof process.argv[3] != 'string'){
        console.log('To uninstall a static service, type its name.');
        return;
    }
    service.remove(
        'static-' + process.argv[3],
        error => { if(error) console.log(error.message); }
    );
    return;
}

if(process.argv[2] == "run"){
    if(typeof process.argv[3] != 'string'){
        console.log('To run static service, type the path to a config file.');
        return;
    }

    var fs = require('fs');
    var logStream = fs.createWriteStream (process.argv[1] + ".log");

    service.run (logStream, function () {
        service.stop (0);
    });

    var staticServer = require('../lib/index.js');
    staticServer.start(process.argv[3]);

    return;
}
