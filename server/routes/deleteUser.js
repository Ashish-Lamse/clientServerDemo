/**
 * Created by Ashish Lamse on 8/9/16.
 */

var deleteUser=function(app,User){
    /*delete record from database*/
    app.post('/deleteUser',function(req,res){
        console.log(req.body.id+"===Server");

        var delusr=new User({_id:req.body._id});

        User.remove({_id : req.body.id},function(err,data){
            if(err){
                console.log(err+"Successfully not deleted")
            }
            else {
                res.send(data);

            }

        });

    });
};

module.exports=deleteUser;