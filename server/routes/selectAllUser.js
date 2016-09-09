/**
 * Created by sb0103 on 8/9/16.
 */

var allUserData=function(app,User){
    /*Get all All user records*/
    app.get('/getUserRecored',function(req,res){
        User.find(function (err, users) {
            if (err) {
                next(err);
            } else {

                res.send(JSON.stringify(users));
                res.end();
            }
        })
    });
};

module.exports=allUserData;
