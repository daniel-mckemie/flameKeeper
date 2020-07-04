const Sub = require('../models/subAction');

let subFile = function () {
  global.counter++
  console.log('SUBSTITUTION IN PROGRESS...');



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

  
  let bucketParams = {
    Bucket: 'fk-audio'
  };


    // Call S3 to obtain a list of the objects in the bucket
    s3.listObjects(bucketParams, function (err, data) {
      if (err) {
        console.log("Error", err);
      } else {
        fileInfo = this.data;        
        let q = Math.floor(Math.random() * (fileInfo.Contents.length));        
        Sub.sub_action(fileInfo.Contents[q].Key);

      }
    });


  // // Copy the object to a new location
  // s3.copyObject({
  //     Bucket: bucketName,
  //     CopySource: `${bucketName}/${oldKey}`,
  //     Key: `${newKey}`

  //   })
  //   .promise()
  //   // .then(() =>
  //   //   // Delete the old object
  //   //   s3.deleteObject({
  //   //     Bucket: bucketName,
  //   //     Key: oldKey
  //   //   }).promise()
  //   // )

  //   // Error handling is left up to reader
  //   .catch((e) => console.error(e));
}

exports.sub_file = subFile;