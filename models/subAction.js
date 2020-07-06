let subAction = function (id) {


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

  let snapshot = global.counter;
  // snapshot++;
  console.log('COUNT: ' + global.counter);
  let fileLabel = `${Date.now()}-${snapshot}-${id}`;
  console.log(fileLabel.substring(16))

  let bucketName = 'fk-audio';
  let oldKey = id;
  let newKey = `${fileLabel.substring(16)}`
  
    
  console.log('SUB SUCCESS?!');

  // Copy the object to a new location
  s3.copyObject({
      Bucket: bucketName,
      CopySource: `${bucketName}/${oldKey}`,
      Key: `${newKey}`
    })
    .promise()
    // .then(() =>
    //   // Delete the old object
    //   s3.deleteObject({
    //     Bucket: bucketName,
    //     Key: oldKey
    //   }).promise()
    // )

    // Error handling is left up to reader
    .catch((e) => console.error(e));
}

exports.sub_action = subAction;