const constants = require('../constants');
const fs = require('fs');
const AWS = require('aws-sdk');
// AWS.config.update({region:'us-east-1'});

const s3 = new AWS.S3({
    accessKeyId: constants.accessKeyId(),
    secretAccessKey: constants.secretAccessKey()
});

// upload file to S3 bucket
const fileName = 'contacts.csv';
const uploadFile = () => {
  fs.readFile(fileName, (err, data) => {
     if (err) throw err;
     const params = {
         Bucket: 'sample-181020', // pass your bucket name
         Key: 'contacts.csv', // file will be saved as testBucket/contacts.csv
         Body: JSON.stringify(data, null, 2)
     };
     s3.upload(params, function(s3Err, data) {
         if (s3Err) throw s3Err
         console.log(`File uploaded successfully at ${data.Location}`)
     });
  });
};

uploadFile();

// download file from S3 bucket
var s3Params = {
    Bucket: 'sample-181020',
    Key: 'cognito.diagram.pdf'
};

s3.getObject(s3Params, function(err, data) {
    if (err === null) {
       fs.writeFileSync('./abc.pdf', data.Body.toString());
       console.log("file successfully downloaded from S3 bucket");
    } else {
       throw err
    }
});

