const List = require('../models/list');

let subFile = function(id) {        
  if (global.subCount < 1) {
    global.stopTime = true;
    console.log('No');
    global.uploadLock = 0;
    global.dashboardLock = false;
    global.subCount++;
  } else {     
    console.log('ID FROM SUBFILE :' + id);
    console.log('IDKEY FROM SUBFILE: ' + id.Key);
    
    global.subCount++;    
    // LIST FUNCTION MUST RUN AGAIN TO GRAB A KEY!!!
    global.counter++;

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

    let snapshot = global.counter;
    let newId = id
    let fileLabel = `${Date.now()}${newId.substring(13)}`;
    


    let bucketName = 'fk-audio';
    let oldKey = id
    let newKey = fileLabel;


    global.subCount = 0;
    global.uploadLock = 1;

    console.log('Subcount: ' + global.subCount);


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
        s3.deleteObject({
          Bucket: bucketName,
          Key: oldKey
        }).promise()
      )

      // Error handling is left up to reader
      .catch((e) => console.error(e));
  }
}

exports.sub_file = subFile;