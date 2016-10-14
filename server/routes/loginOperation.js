/**
 * Created by Ashish Lamse on 16/9/16.
 */

var User=require('../model/userModel');
var loginOperation={

    checkAuthentication:function(req,res){
       User.find({email:req.body.username,password:req.body.password},function(error,data){
           if(error){
               console.log('Error:'+error);
           }
            else {
               if(data.length>0)
               {
                   res.json({data:data, isAuthenticated:true});
               }
               else {
                    res.json({data:data, isAuthenticated:false});
               }
           }
        });
    },

    forgotPassword:function(req,res){
        User.find({email:req.body.username},function(err,data){
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

    },
    getUserName:function(req,res){
        console.log('hello'+'=======================================================')

        var username = req.query.username;
        var token = req.query.passwordtoken;


        console.log(username+'ssssssssssssssssssssssssssssssssssss');
        console.log(token+'ssssssssssssssssssssssssssssssssssss');

        res.json({username:username,token:token});
    },

    changePassword:function(req,res){
        console.log('hello'+'=======================================================')

        var username = req.query.username;
        var token = req.query.passwordtoken;

        console.log('hello'+username);
        console.log('hello'+token);
        User.update(
            { email: req.query.username},
            { passwordToken:req.query.passwordtoken },
            { upsert: true },function(err,data){
                if(err){
                    console.log('Error :'+err)
                }
                else {
                    if(data){
                        res.send({status:true})
                    }
                }
            }
        )
    }


};

module.exports=loginOperation;
