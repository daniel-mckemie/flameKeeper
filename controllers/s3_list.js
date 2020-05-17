// Load the SDK for JavaScript
const AWS = require('aws-sdk');
// Set the Region 
AWS.config.update({
  region: 'us-east-1'
});

// Create S3 service object
s3 = new AWS.S3({
  apiVersion: '2006-03-01'
});

let bucketName;
bucketName = 'fk-audio'
// Create the parameters for calling listObjects
let bucketParams = {
  Bucket: bucketName,
};

// Call S3 to obtain a list of the objects in the bucket
s3.listObjects(bucketParams, function (err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data);
  }
});