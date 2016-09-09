/**
 * Created by Ashish Lamse on 9/9/16.
 */

var editUser=function(app,User){
    /*edit user into database*/
    app.post('/editUser',function(req,res){
        console.log(req.body.firstname);
        console.log(req.body.lastname);

        User.update(
            { _id: req.body.id },
            {
                firstname: req.body.firstname,
                lastname: req.body.lastname,

            },
            { upsert: true },function(err,data){
                if(err){
                    console.log(err);
                }
                else {
                    res.send(data);
                }
            }
        )
    });

};
module.exports=editUser;