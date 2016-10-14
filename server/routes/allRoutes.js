/**
 * Created by Ashish Lamse on 3/10/16.
 */
var userOperation=require('./userOperation');
var loginOperation=require('./loginOperation');
var mailSend=require('./mailSend');
var partialRouter = require('./partialRoutes');
var path = require('path');

var allUserOperation=function(app,acl){

    app.post('/insert', userOperation.insert);
    app.post('/getUser', userOperation.getUser);
    app.get('/getUserRecored',userOperation.getUserRecored);
    app.post('/editUser', userOperation.editUser);
    app.post('/deleteUser', userOperation.deleteUser);
    app.post('/checkAuthentication',loginOperation.checkAuthentication);
    app.post('/changePassword',loginOperation.changePassword);
    app.get('/forgotPassword',loginOperation.forgotPassword);

    app.post('/mailSend', mailSend.mailSend); // handle the route at yourdomain.com/sayHello
    app.post('/forgotPasswordMail', mailSend.forgotPasswordMail); // handle the route at yourdomain.com/sayHello



    //angular routes
    app.get('/partials/:name', partialRouter);
    app.get('/*', function(req, res) {
        res.render(path.join(__dirname, '../../client/index'));
    });


};
module.exports=allUserOperation;
