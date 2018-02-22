'use strict';

module.exports.sendReminderDaily = (event, context, callback) => {

    var AWS = require('aws-sdk');
    AWS.config.update({ region: 'us-east-1' });
    var ses = new AWS.SES();
    var fs = require('fs');
    console.info('Start')
    var emailHtml = fs.readFileSync('./dailyReminder.html', 'utf-8');
    const promiseInvoke = ( functionName ) => {
        console.info(functionName,'Starting promiseInvoke with native promise');
        const lambda = new AWS.Lambda();
        return lambda.invoke({
            InvocationType: 'Event',
            FunctionName: functionName.targetFunction,
            LogType: 'None',
    
        }).promise();
    };
    const targetFunction = "task/list.list" ;
    var toAndFromAdress = 'gabeaboy@gmail.com'
    promiseInvoke({ targetFunction }).then(() => {
        console.log('Have info')
        callback(null, null)
    })
        .catch(error => {
            console.info('Error: ',error)
            callback(error)
        })
    console.info('exit')

    var params = {
        Destination: {
            ToAddresses: [toAndFromAdress]
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
        ReplyToAddresses: [toAndFromAdress],
        Source: toAndFromAdress,
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

    var toAndFromAdress = 'gabeaboy@gmail.com'
    var params = {
        Destination: {
            ToAddresses: [toAndFromAdress]
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
        ReplyToAddresses: [toAndFromAdress],
        Source: toAndFromAdress,
    };

    ses.sendEmail(params, function (err, data) {
        // an error occurred
        if (err) console.log(err, err.stack);
        // successful response
        else callback(null, data);
    });
};