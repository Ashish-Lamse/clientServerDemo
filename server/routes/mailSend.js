/**
 * Created by Ashish Lamse on 9/9/16.
 */
var sendMail=function(app,express){


    var router = express.Router();
    app.post('/mailSend', mailSend); // handle the route at yourdomain.com/sayHello

    function mailSend(req, res) {
        var  text='Mail sent successfully';
        require('../mail_send/mailDelivery')
        (req.body._from,'ashgl@9893948172',req.body._from,req.body._to,'Email Example',text);
    }
};

module.exports=sendMail;
