/**
 * Created by Ashish Lamse on 14/9/16.
 */

var User = require('../model/userModel');

var UserOperation=function(app){
    app.post('/insert',function(req,res){
        var usr=new User({firstname:req.body.firstName,lastname:req.body.lastName,email:req.body.email,password:req.body.password});

        usr.save(function(err,data){
            if (err)
                res.json({status:false,data:err});
            else {
                res.json({status:true,data:data});
            }


        })

    });

    /*get recored from database*/
    app.post('/getUser',function(req,res){
       User.find({_id:req.body.id},function(err,data){
            if(err){
                console.log(err);
            }
            else {
                console.log(data);
                res.send(data);
            }
        });
    });

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




module.exports=UserOperation;
