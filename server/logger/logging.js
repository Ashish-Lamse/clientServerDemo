/**
 * Created by Ashish Lamse on 10/10/16.
 */
var bunyan = require('bunyan');
module.exports = bunyan.createLogger({
    name: 'clientserverdemo-logger',
    stream: process.stderr,
    level: 'error'
});