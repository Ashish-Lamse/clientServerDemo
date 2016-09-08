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

/*Get all user records*/
app.get('/getUserRecored',function(req,res){
 User.find(function (err, users) {
  if (err) {
   next(err);
  } else {
   // Prevent browser from caching results of API data requests
   //res.setHeader('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
   //res.setHeader("Content-Type:", "application/json");
   res.send(JSON.stringify(users));
   res.end();
  }
 })
});

/*delete record from database*/
app.post('/deleteUser',function(req,res){
 console.log(req.body.firstName+"===Server");

 var delusr=new User({firstname:req.body.firstName,lastname:req.body.lastName});

 User.remove({firstname:req.body.firstName}/*,function(err,data){
  console.log("deleted successfully")
 }*/)
});

/*Insert User Recoreds into Database*/
app.post('/insert',function(req,res){


 var usr=new User({firstname:req.body.firstName,lastname:req.body.lastName});

 usr.save(function(err,data){
  if (err) return console.error(err);

  id=data._id;
  res.send(true);
  console.log(id);
 })

});

module.exports = app;

