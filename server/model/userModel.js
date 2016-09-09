/**
 * Created by Ashish Lamse on 9/9/16.
 */
var userModel=function(mongoose){
    var userScema = mongoose.Schema({
        firstname: String,
        lastname: String
    });

    var User = mongoose.model('User', userScema);
};

module.exports=userModel;