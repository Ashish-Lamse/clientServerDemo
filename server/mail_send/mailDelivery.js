/**
 * Created by Ashish Lamse on 28/9/16.
 */
var nodemailer = require('nodemailer');
var mailDelivery=function(user,pass,from,to,subject,text){
    // Not the movie transporter!
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: user, // Your email id
            pass: pass // Your password
        }
    });

    var mailOptions = {
        from: from, // sender address
        to: to, // list of receivers
        subject: subject, // Subject line
        text: text
    };

    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);

        }else{
            console.log('Message sent: ' + info.response);
            return true;
        };
    });
};
module.exports=mailDelivery;