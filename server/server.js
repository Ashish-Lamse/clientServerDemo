/**
 * Created by Ashish Lamse on 6/9/16.
 */
var express=require('express');
var path=require('path');
var app=express();
var bodyParser=require('body-parser');
/*var mongoose=require('mongoose');*/
var config=require('./_config');

require('./dbConnection/dbConnection')(app);

/*var User=require('./model/userModel')(mongoose);*/

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());


app.set('views', __dirname + '/files');

var id=null;





app.use(express.static(path.join(__dirname, '../client')));
// This covers serving up the index page
app.use(express.static(path.join(__dirname, '../client/.tmp')));
app.use(express.static(path.join(__dirname, '../client/app')));


app.use(function(err, req, res, next) {
 res.status(err.status || 500);
});


/*list of operaion's performs on database */
require('./routes/UserOperation')(app);
require('./routes/mailSend')(app,express);
require('./routes/loginOperation')(app);




module.exports = app;

