/**
 * Created by Ashish Lamse on 6/9/16.
 */
var express=require('express');
var mongoose=require('mongoose');
var path=require('path');
var app=express();
var bodyParser=require('body-parser');
/*var mongoose=require('mongoose');*/
var config=require('./_config');

var db=require('./dbConnection/dbConnection')(app);

/*var User=require('./model/userModel')(mongoose);*/

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());


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
require('./routes/UserOperation');
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
require('./routes/UserOperation')(app,acl);
require('./routes/mailSend')(app,express);
require('./routes/loginOperation')(app);




module.exports = app;

