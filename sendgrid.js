/**
 * Created by 423919 on 5/23/2016.
 * This module is used to send sms
 */
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

var Sendgrid = function () {

};

// this api will configure the twilio obj and send the sms
Sendgrid.prototype.sendMail = function (app) {

    app.post('/sendmail', jsonParser, function (req, res) {
        var message = {
            "toRecipient": req.body.toRecipient,
            "fromMail": req.body.fromMail,
            "subject": req.body.subject,
            "text": req.body['text']
        };
        var SendGridService = require('./sendgridservice.js');
        var sendgridObj = new SendGridService();

        sendgridObj.sendMail(message, function (err, result) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            if (err) {
                res.send(JSON.stringify(err), 400);
            }
            else {
                res.send(JSON.stringify(result), 200);
            }
        });
    });


};

module.exports = Sendgrid;