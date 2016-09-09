/**
 * Created by Ashish Lamse on 8/9/16.
 */
 var insertRouter=function(app,User){
   app.post('/insert',function(req,res){
        var usr=new User({firstname:req.body.firstName,lastname:req.body.lastName});

        console.log(req.body.firstName);
        console.log(req.body.lastName);

        usr.save(function(err,data){
            if (err) return console.error(err);
            id=data._id;
            res.send(true);
            console.log(id);
        })

    });
};

module.exports=insertRouter;