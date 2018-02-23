'use strict';

module.exports.sendReminderDaily = (event, context, callback) => {
    var thing;
    var AWS = require('aws-sdk');
    AWS.config.update({ region: 'us-east-1' });
    var ses = new AWS.SES();
    var fs = require('fs');
    console.info('Start');
    var emailHtml = fs.readFileSync('./dailyReminder.html', 'utf-8');
   
        const lambda = new AWS.Lambda();
        var opts = {
            FunctionName: 'my-reminder-dev-list'
          }
          //Do I need lambda invoke's call back
        var x = lambda.invoke(opts, function (err, data) {
            console.log("Entered invoke")
            thing = "POPOPO"
            if (err) {
              console.log('error : ' + err)
              callback(err, null)
            } else if (data) {
                console.info("body",data)
              const response = {
                statusCode: 200,
                body: JSON.parse(data.Payload)
              }
              return response
              callback(null, response)
            }
          })
        console.log(x)

    const targetFunction = "task/list.list" ;
    var toAndFromAddress = 'gabeaboy@gmail.com';
   
    console.info('exit')

    var params = {
        Destination: {
            ToAddresses: [toAndFromAddress]
        },
        Message: {
            Body: {
                Html: {
                    Charset: "UTF-8",
                    Data: emailHtml
                },
                Text: {
                    Charset: "UTF-8",
                    Data: "Remember to continue helping the Woof Garden in your Pluralsight course!"
                }
            },
            Subject: {
                Charset: "UTF-8",
                Data: "Woof Garden Reminder"
            }
        },
        ReplyToAddresses: [toAndFromAddress],
        Source: toAndFromAddress,
    };
    console.info('End')
    ses.sendEmail(params, function (err, data) {
        // an error occurred
        if (err) console.log("error from ses ", err, err.stack);
        // successful response
        else callback(null, data);
    });
};

module.exports.sendReminderWeekend = (event, context, callback) => {

    var AWS = require('aws-sdk');
    AWS.config.update({ region: 'us-east-1' });
    var ses = new AWS.SES();
    var fs = require('fs');

    var emailHtml = fs.readFileSync('./weekendReminder.html', 'utf-8');

    var toAndFromAddress = 'gabeaboy@gmail.com'
    var params = {
        Destination: {
            ToAddresses: [toAndFromAddress]
        },
        Message: {
            Body: {
                Html: {
                    Charset: "UTF-8",
                    Data: emailHtml
                },
                Text: {
                    Charset: "UTF-8",
                    Data: "Here's a weekend Remember that puppies are adorable!!"
                }
            },
            Subject: {
                Charset: "UTF-8",
                Data: "Woof Garden Reminder"
            }
        },
        ReplyToAddresses: [toAndFromAddress],
        Source: toAndFromAddress,
    };

    ses.sendEmail(params, function (err, data) {
        // an error occurred
        if (err) console.log(err, err.stack);
        // successful response
        else callback(null, data);
    });
};