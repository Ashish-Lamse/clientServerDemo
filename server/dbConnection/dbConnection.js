/**
 * Created by Ashish Lamse on 13/9/16.
 */
var config=require('../_config');
var mongoose= require('mongoose');

var mong=function(app){

  return  mongoose.connect(config.mongoURI[app.settings.env], function(err, res) {
        if(err) {
            console.log('Error connecting to the database. ' + err);
        } else {
            console.log('Connected to Database: ' + config.mongoURI[app.settings.env]);
        }
    });
};

module.exports=mong;