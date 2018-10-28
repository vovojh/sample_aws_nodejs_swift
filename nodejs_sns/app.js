var constants = require('../constants');
var AWS = require('aws-sdk');

AWS.config.region = constants.region();
AWS.config.update({
      accessKeyId: constants.accessKeyId(),
      secretAccessKey: constants.secretAccessKey()
});

var sns = new AWS.SNS();
var params = {
    Message: "내용물",
    MessageStructure: 'string',
    PhoneNumber: '821012345678',
    Subject: '제목'
};

sns.publish(params, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else     console.log(data);           // successful response
});
