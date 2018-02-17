'use strict';
const AWS = require('aws-sdk'),
    dynamoDbClient = new AWS.DynamoDB.DocumentClient(),
    uuid = require('uuid');
// var proxy = require('proxy-agent');
// AWS.config.update({
//     httpOptions: {
//         agent: proxy('https://687969368484.signin.aws.amazon.com/console')
//     }
// });
//AWS.configure.update({ region: 'us-west-2' })
console.log('my-service.handler')
module.exports.createMovies = (event, context, callback) => {
    let TableName;
    const params = {
        TableName: 'Task'
    }
    console.log(dynamoDbClient.scan(params))
    return dynamoDbClient.scan(params).promise();
}