/**
 * Created by Ashish Lamse on 9/9/16.
 */
var mongoose=require('mongoose');

       var userScema = mongoose.Schema({
        firstname   : String,
        lastname    : String,
           email    :{type:String, index: { unique: true, dropDups: true }},
        password    :String,
           role     :String,
           passwordToken:String
    });

    var user= mongoose.model('User', userScema);


module.exports=user;