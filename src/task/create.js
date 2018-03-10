'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

// The document client affords developers the use of native JavaScript
// types instead of AttributeValues to simplify the JavaScript development
// experience with Amazon DynamoDB.
// - AWS Documentation
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.create = (event, context, callback) => {
  const timestamp = new Date().getTime();
  console.info(event.body)
  console.info(JSON.parse(event.body))
  const data = JSON.parse(event.body);
  if (typeof data.taskName !== 'string' || typeof data.description !== 'string') {
    console.error('Validation Failed');
    callback(new Error('Couldn\'t create the task item.'));
    return;
  }

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Item: {
      id: uuid.v1(),
      taskName: data.taskName,
      description: data.description,
      progress: data.progress,
      createdAt: timestamp,
      updatedAt: timestamp,
    },
  };

  // write the pet to the database
  dynamoDb.put(params, (error) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(new Error('Couldn\'t create the task item.'));
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify(params.Item),
    };
    callback(null, response);
  });
};