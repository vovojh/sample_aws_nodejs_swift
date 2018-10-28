var constants = require('../constants');
var AWS = require('aws-sdk');

AWS.config.update({
  region: constants.region(),
  accessKeyId: constants.accessKeyId(),
  secretAccessKey: constants.secretAccessKey()
});

var docClient = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});
var tablename = constants.tablename()
// put
var putParams = {
  TableName: tablename,
  Item: {
    'id': 1,
    'name': 'jerry',
    'age': 32,
    'friends': ['soogang', 'oja', 'minwoo', 'idwa']
  }
};

docClient.put(putParams, function(err, data) {
  if (err) {
    console.log("Put Error", err);
  } else {
    console.log("Put Success", data);
  }
});

// get
var getParams = {
 TableName: tablename,
 Key: {'id': 1}
};

docClient.get(getParams, function(err, data) {
  if (err) {
    console.log("Get Error", err);
  } else {
    console.log("Get Success", data.Item);
  }
});

// update
var updateParams = {
  TableName: tablename,
  Key: {
    'id' : 1
  },
  UpdateExpression: 'set height = :s',
  ExpressionAttributeValues: {
    ':s' : 178
  }
};

docClient.update(updateParams, function(err, data) {
  if (err) {
    console.log("Update Error", err);
  } else {
    console.log("Update Success", data);
  }
});

// query
var queryParams = {
  ExpressionAttributeValues: {
    ':t': 2
    //':s': 20,
    //':topic': 'idwa'
  },
  KeyConditionExpression: 'id = :t',
  //FilterExpression: 'age > :s AND contains (friends, :topic)',
  TableName: tablename
};

docClient.query(queryParams, function(err, data) {
  if (err) {
    console.log("Query Error", err);
  } else {
    console.log("Query Success", data.Items);
  }
});

// delete 
var deleteParams = {
  Key: {
    'id': 0
  },
  TableName: tablename
};

docClient.delete(deleteParams, function(err, data) {
  if (err) {
    console.log("Delete Error", err);
  } else {
    console.log("Delete Success", data);
  }
});
