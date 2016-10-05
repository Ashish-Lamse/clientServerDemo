/**
 * Created by Ashish Lamse on 9/9/16.
 */
var sendMail=function(app,express){


    var router = express.Router();
    app.post('/mailSend', mailSend); // handle the route at yourdomain.com/sayHello
    app.post('/forgotPasswordMail',forgotPasswordMail);

    function mailSend(req, res) {
        var  text='Mail sent successfully';
        require('../mail_send/mailDelivery')
        (req.body._from,'ashgl@9893948172',req.body._from,req.body._to,'Email Example',text);
    }

    function forgotPasswordMail(req,res){
        var  text='http://192.168.2.33:3006/changepassword?username='+req.body.username+'&passwordtoken='+req.body.passwordToken;

        require('../mail_send/mailDelivery')
        (req.body._from,'ashgl@9893948172',req.body._from,req.body.username,'DotoApp Client Server password Change',text);

        res.json({status:true})

    }
};

module.exports=sendMail;
