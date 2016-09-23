/**
 * Created by Ashish Lamse on 9/9/16.
 */
var sendMail=function(app,express){
    var nodemailer = require('nodemailer');

    var router = express.Router();
    app.post('/mailSend', mailSend); // handle the route at yourdomain.com/sayHello

    function mailSend(req, res) {

        console.log(req.body._to)
        console.log(req.body._from)
        // Not the movie transporter!
        var transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: req.body._from, // Your email id
                pass: 'ashgl@9893948172' // Your password
            }
        });

        var text = 'Hello  \n\n' + req.body.name+'I have added you in may TODOApp client server application.';

        var mailOptions = {
            from: req.body._from, // sender address
            to: req.body._to, // list of receivers
            subject: 'Email Example', // Subject line
            text: text
        };

        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                console.log(error);
                res.json({yo: 'error'});
            }else{
                console.log('Message sent: ' + info.response);
                res.json({yo: info.response});
            };
        });
    }
};

module.exports=sendMail;
