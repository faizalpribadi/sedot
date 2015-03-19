#!/usr/bin/env node
var argv        = require('minimist')(process.argv.slice(2)),
    request     = require('request'),
    packages    = require('./package.json'),
    extract     = require('./');

function help() {
    console.log([
        packages.description,
        '',
        'usage',
        '',
        ' $ sedot <url> <type>',
        '',
        'example',
        '',
        ' $ sedot http://youtube.com div'
    ].join('\n'));
}

if (argv.v || argv.version) {
    console.log(packages.version);
    return;
}

if (argv.h || argv.help || argv._.length === 0) {
    help();
    return;
}

var url = argv._[0];
var type = argv._[1];

request(url, function(err, response, body) {
    if (err) {
        console.error('error to fetch url', err.message);
        process.exit(1);
    }

    if (!err && response.statusCode === 200) {
        console.log(extract(body, type).join('\n'));
    }
});

