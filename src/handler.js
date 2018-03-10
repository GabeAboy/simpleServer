'use strict';

module.exports.sendReminderDaily = (event, context, callback) => {
    var AWS = require('aws-sdk');
    var fs = require('fs');
    AWS.config.update({ region: 'us-east-1' });
    const lambda = new AWS.Lambda();
    var ses = new AWS.SES();
    var emailHtml = fs.readFileSync('./template/dailyReminder.html', 'utf-8');
    var toAndFromAddress = 'gabeaboy@gmail.com';
    
    var params = {
        Destination: {
            ToAddresses: [toAndFromAddress]
        },
        Message: {
            Body: {
                Html: {
                    Charset: "UTF-8",
                    Data: <p>HELLO world</p>
                },
                Text: {
                    Charset: "UTF-8",
                    Data: "Remember to continue your work"
                }
            },
            Subject: {
                Charset: "UTF-8",
                Data: "Tasks in progress"
            }
        },
        ReplyToAddresses: [toAndFromAddress],
        Source: toAndFromAddress,
    };

    new Promise((resolve, reject) => {
        lambda.invoke({
            FunctionName: 'my-reminder-dev-list',
            Payload: JSON.stringify(event, null, 2)
        }, function (error, data) {
            if (error) {
                reject(error);
            }
            if (data.Payload) {
                resolve(data.Payload)
            }
            //have all email service be done .then
        })
    }).then(function (value){
        return  JSON.parse(JSON.parse(value).body)
    }).then(function (parsedValue) {
        ses.sendEmail(params, function (err, data) {
            // an error occurred
            if (err) console.log("error from ses ", err, err.stack);
            // successful response
            else callback(null, data);
        });
    })
};