const List = require('../models/list');

let subFile = function () {        
  if (global.subCount < 1) {
    global.stopTime = true;
    console.log('No');
    global.uploadLock = 0;
    global.subCount++;
  } else {
    global.counter++;
    global.subCount++;
    console.log('Subcount from Sbfile ' + global.subCount)

    List.list_files();

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
    
    let id = global.subId.Key
    

    let snapshot = global.counter;
    let cutId = id.substring(21);
    let fileLabel = `${Date.now()}-${snapshot}-${cutId}`;

    // let newKey = fileLabel.replace(fileLabel.charAt(0), '0');

    console.log('OLDKEY: ' + id);
    console.log('NEWKEY: ' + fileLabel)


    let bucketName = 'fk-audio';
    let oldKey = id;
    let newKey = fileLabel
    


    console.log('SUB SUCCESS!');

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
}

exports.sub_file = subFile;