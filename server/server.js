/**
 * Created by Ashish Lamse on 6/9/16.
 */
var express=require('express');
var path=require('path');
var app=express();
var bodyParser=require('body-parser');
var mongoose=require('mongoose');


app.use(bodyParser.urlencoded());
app.use(bodyParser.json());


app.set('views', __dirname + '/files');

var id=null;
mongoose.connect('mongodb://localhost/userdb');

var user=mongoose.model('SaveUser',{user:Object});

app.use(express.static(path.join(__dirname, '../client')));
// This covers serving up the index page
app.use(express.static(path.join(__dirname, '../client/.tmp')));
app.use(express.static(path.join(__dirname, '../client/app')));


app.use(function(err, req, res, next) {
 res.status(err.status || 500);
 /* res.render('', {
  message: err.message,
  error: {}
  });*/
});

app.post('/insert',function(req,res){

 console.log(req.body.firstName);
 console.log(req.body.lastName);

 var usr=new user({user:{first_name:req.body.firstName,last_name:req.body.lastName}});

 usr.save(function(err,data){
  id=data._id;
  console.log(id);
 })

});




module.exports = app;

