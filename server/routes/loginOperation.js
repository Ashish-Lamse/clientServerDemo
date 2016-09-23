/**
 * Created by Ashish Lamse on 16/9/16.
 */

var User=require('../model/userModel');
var loginOperation= function (app) {

    app.post('/checkAuthentication',function(req,res){
       User.find({email:req.body.username,password:req.body.password},function(error,data){
           if(error){
               next(error);
           }
            else {
               if(data.length>0)
               {
                   res.json({data:data, isAuthenticated:true});
               }
               else {
                   //res.status(401).send();        // HTTP status 404: NotFound
                   res.json({data:data, isAuthenticated:false});
               }
           }
        });
    });


    app.post('/forgotPassword',function(req,res){
        User.find({email:req.body.username},function(err,data){
            console.log(req.body.username+"got it now");
            if(err){
                console.log('Error :'+err)
            }

            else {
                if(data.length>0){
                    res.json({data:data,status:true});
                }
                else {
                    res.json({data:data,status:false});
                }

            }
        })
    });

    app.post('/changePassword',function(req,res){
        console.log('changepassword data:'+req.body.username+" "+req.body.password);
        User.update(
            { email: req.body.username },
            {
                password:req.body.password
            },
            { upsert: true },function(err,data){
                if(err){
                    console.log('Error :'+error)
                }
                else {
                    if(data){
                        console.log('changepassword if');
                        res.json({status:true})
                    }

                }
            }
        )
    });
};

module.exports=loginOperation;
