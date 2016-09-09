/**
 * Created by Ashish Lamse on 8/9/16.
 */

var getSingleUserRoute=function(app,User){

    /*get recored from database*/
    app.post('/getUser',function(req,res){
        console.log(req.body.id);

        User.find({_id:req.body.id},function(err,data){

            console.log(req.body.id+"single recored");
            console.log(data+"single recored");
            if(err){
                console.log(err);
            }
            else {
                console.log(data);
                res.send(data);
            }
        });
    });

};

module.exports=getSingleUserRoute;