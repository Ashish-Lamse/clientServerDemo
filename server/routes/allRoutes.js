/**
 * Created by Ashish Lamse on 3/10/16.
 */
var userOperation=require('../routes/UserOperation');

var allUserOperation=function(app,acl){

    app.post('/insert', userOperation.insert);
    app.post('/getUser', userOperation.getUser);
    app.get('/getUserRecored',userOperation.getUserRecored);
    app.post('/editUser', userOperation.editUser);
    app.post('/deleteUser', userOperation.deleteUser);

};
module.exports=allUserOperation;
