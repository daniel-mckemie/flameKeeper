const List = require('../models/list');

let subFile = function () {        
  if (global.subCount < 1) {
    global.stopTime = true;
    console.log('No');
    global.uploadLock = 0;
    global.subCount++;
  } else {
    List.list_files();        
    console.log('Counter from Sub ' + global.counter);
    global.subCount++;
    console.log('Subcount from Sbfile ' + global.subCount)
    
    // LIST FUNCTION MUST RUN AGAIN TO GRAB A KEY!!!
    global.counter++;

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
    
    // Renames old file to bring forward
    let snapshot = global.counter;
    let cutId = id.substring(21);
    let fileLabel = `${Date.now()}-${snapshot}-${cutId}`;

    // Renames new file to kick back  
    let newReplacement = global.newId.Key
    let newIdKey = newReplacement.replace(newReplacement.charAt(0), '0');
    

    let bucketName = 'fk-audio';
    let oldKey = id;
    let newKey = fileLabel;
    


    console.log('SUB SUCCESS!');

    // Copy the object to a new location
    s3.copyObject({
        Bucket: bucketName,
        CopySource: `${bucketName}/${oldKey}`,
        Key: `${newKey}`,
        ACL: 'public-read'        
      })
      .promise()
      .then(() =>
        // Delete the old object
        s3.copyObject({
          Bucket: bucketName,
          CopySource: `${bucketName}/${global.newId.Key}`,
          Key: `${newIdKey}`,
          ACL: 'public-read'          
        }).promise()
      ).then(() =>
        // Delete the old object
        s3.deleteObject({
          Bucket: bucketName,
          Key: global.newId.Key,
        }).promise()
      // ).then(() =>
      //   // Delete the old object
      //   s3.deleteObject({
      //     Bucket: bucketName,
      //     Key: oldKey
      //   }).promise()
      )

      // Error handling is left up to reader
      .catch((e) => console.error(e));
  }
}

exports.sub_file = subFile;