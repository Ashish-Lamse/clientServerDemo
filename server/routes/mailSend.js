/**
 * Created by Ashish Lamse on 9/9/16.
 */
var sendMail={
    mailSend:function(req, res) {
        var  text='Mail sent successfully';
        require('../mail_send/mailDelivery')
        (req.body._from,'ashgl@9893948172',req.body._from,req.body._to,'Email Example',text);
    },

    forgotPasswordMail:function(req,res){

        var  text='http://192.168.2.33:3006/changepassword?username='+req.body.username+'&passwordtoken='+req.body.passwordToken;

        require('../mail_send/mailDelivery')
        (req.body._from,'ashgl@9893948172',req.body._from,req.body.username,'DotoApp Client Server password Change',text);

        res.json({status:true})

    }
};

module.exports=sendMail;
