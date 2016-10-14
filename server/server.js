/**
 * Created by Ashish Lamse on 6/9/16.
 */
var express=require('express');
var mongoose=require('mongoose');
var path=require('path');
var app=express();
var bodyParser=require('body-parser');


var config=require('./_config');
var conf=new config();

require('./routes/userOperation');
var logger=require('./logger/logging')
require('./dbConnection/dbConnection')(app,conf).then(init);
function init() {
 console.log(config.mongoURI);
 app.use(bodyParser.json()); // support json encoded bodies
 app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
 app.set('views', __dirname + '/files');

 var id=null;



// view engine setup
 app.engine('html', require('ejs').renderFile);
 app.set('views', __dirname + '../client/app/partials');
 app.set('view engine', 'html');


 app.use(express.static(path.join(__dirname, '../client')));
// This covers serving up the index page
 app.use(express.static(path.join(__dirname, '../client/.tmp')));
 app.use(express.static(path.join(__dirname, '../client/app')));


 app.use(function(err, req, res, next) {
  res.status(err.status || 500);
 });

 var acl = require('acl');

 /*ACL config*/
 /*acl = new acl(new acl.memoryBackend());*/
 acl = new acl(new acl.mongodbBackend(mongoose.connection.db, 'acl_'));

 acl.allow('user',['/getUser','/getUserRecored','/editUser','/deleteUser'],['get','post']);
 /*ACL config ends*/
 acl.isAllowed('user','/insert',['get','post'], function(err, res){
  if(res){
   console.log("User joed is allowed to view blogs")
  }
 });

 acl.allow('admin',['/insert','/getUser','/getUserRecored','/editUser','/deleteUser'],['get','post']);
 /*ACL config ends*/
 acl.isAllowed('admin','/insert',['get','post'], function(err, res){
  if(res){
   console.log("User joed is allowed to view blogs")
  }
 });

 acl.middleware();

 /*list of operaion's performs on database */
 require('./routes/allRoutes')(app,acl);




 // catch 404 and forward to error handler
 app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
 });

 // error handlers

 // development error handler
 // will print stacktrace
 if (app.get('env') === 'dev') {
  app.use(function (err, req, res, next) {
   logger.error(err);
   res.status(err.status || 500);
   res.json({
    message: err.message,
    error: err,
    dummy: "Dummpy message from node"
   });
  });
 }

 // production error handler
 // no stacktraces leaked to user
 app.use(function (err, req, res, next) {
  logger.error(err);
  res.status(err.status || 500);
  res.json({
   message: err.message,
   error: {},
   dummy: "Dummpy message from node"
  });
 });


//add default users for app
 var defaultUsers = require("./bootstrap/default-users");
 defaultUsers.createDefaultUsers(app);

}
module.exports = app;

