/**
 * Created by Ashish Lamse on 6/9/16.
 */
var express=require('express');
var path=require('path');
var app=express();
var bodyParser=require('body-parser');

var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/userdb');

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());


app.set('views', __dirname + '/files');

var id=null;


var user=mongoose.model('UserRecored',{user:Object});

app.use(express.static(path.join(__dirname, '../client')));
// This covers serving up the index page
app.use(express.static(path.join(__dirname, '../client/.tmp')));
app.use(express.static(path.join(__dirname, '../client/app')));


app.use(function(err, req, res, next) {
 res.status(err.status || 500);
});


var userScema = mongoose.Schema({
 firstname: String,
  lastname: String
});

var User = mongoose.model('User', userScema);


/*list of operaion's performs on database */
require('./routes/insert')(app,User);
require('./routes/getSingleUser')(app,User);
require('./routes/selectAllUser')(app,User);
require('./routes/editUser')(app,User);
require('./routes/deleteUser')(app,User);

module.exports = app;

