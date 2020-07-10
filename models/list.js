// VISIT THIS SO FOR LISTS OF OVER 1000: https://menno.io/posts/listing-s3-objects-with-nodejs/

let listFiles = function (name) {

  // Load the SDK for JavaScript
  const AWS = require('aws-sdk');

  // Set the Region 
  AWS.config.update({
    region: 'us-east-1'
  });

  // Create S3 service object
  s3 = new AWS.S3({
    apiVersion: '2006-03-01',
    maxRetries: 10
  });
  let bucketName;
  if (name == undefined) {
    bucketName = 'fk-audio';
  } else {
    bucketName = name.name;
  }


  // DEFINE YOUR RETURN THE PARAMS!!!!!!!!
  let bucketParams = {
    Bucket: bucketName,
    // MaxKeys: 7
    // StartAfter: startingFile  
  };


  // Call S3 to obtain a list of the objects in the bucket
  s3.listObjects(bucketParams, function (err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      fileInfo = this.data;      
      global.counter = parseInt(data.Contents[0].Key.substring(14, 20));
      let randomId = Math.floor(Math.random() * (data.Contents.length - 7))
      global.subId = data.Contents[randomId];
      console.log('From Sub List: ' + global.subId.Key);
      console.log('counter: ' + global.counter)

    }
  });


};
exports.list_files = listFiles;