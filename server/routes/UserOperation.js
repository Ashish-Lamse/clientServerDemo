/**
 * Created by Ashish Lamse on 14/9/16.
 */

var User = require('../model/userModel');
var randomstring = require("randomstring");

var UserOperation={
    insert:function(req,res){
        var passwordToken = randomstring.generate(8)+ Date.now();
        var usr=new User(
            {
                firstname:req.body.firstName,
                lastname:req.body.lastName,
                email:req.body.email,
                password:req.body.password,
                role:req.body.role,
                passwordToken: passwordToken
            });

        usr.save(function(err, data){
            if (err)
                res.json({status:false,data:err});
            else {
                res.json({status:true,data:data});
            }
        })

    },

    /*get recored from database*/

     getUser:function(req,res){

       User.find({_id:req.body.id},function(err, data){
            if(err){
                console.log(err);
            }
            else {
                console.log(data);
                res.send(data);
            }
        });
    },
    /*Get all All user records*/


  getUserRecored:function(req,res){
        User.find(function (err, users) {
            if (err) {
                console.log('Error:'+err);
            } else {
                res.send(users);
            }
        })
    },

    /*edit user into database*/

     editUser:function(req,res){
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
    },

    /*delete record from database*/

deleteUser:function(req,res){

        User.remove({id : req.body.id},function(err,data){
            if(err){
                console.log(err+"Successfully not deleted")
            }
            else {
                res.send(data);
            }

        });

    }
};




module.exports=UserOperation;
