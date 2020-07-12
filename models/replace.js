const Substitute = require('../models/subFile');
const List = require('../models/list');

let replaceFile = function (id) {
  global.dashboardLock = true;  


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

  let snapshot = global.counter;
  let newId = id.id
  let fileLabel = `${Date.now()}${newId.substring(13)}`;

  let newKey = fileLabel.replace(fileLabel.charAt(0), '0');



  // DO SOME STRING SPLICING TO GET THE PROPER KEY!!!
  let bucketName = 'fk-audio';
  let oldKey = id;


  global.subCount = 0;
  global.uploadLock = 1;

  console.log('Subcount: ' + global.subCount);




  global.stopTime;
  

  if (global.stopTime == true) {
    console.log('Interval cleared!');
    clearInterval(global.myInterval);
    global.myInterval = setInterval(() => {
      List.list_files(); 
      setTimeout(() => {
        Substitute.sub_file(global.newId);
      }, 5000);
    }, 25200000);
    global.stopTime = false;
  } else {
    console.log('Interval started!');
    global.myInterval = setInterval(() => {
      List.list_files();
      setTimeout(() => {
        Substitute.sub_file(global.newId);
      }, 5000);
    }, 25200000);
    global.stopTime = true;    
  }


  // Copy the object to a new location
  s3.copyObject({
      Bucket: bucketName,
      CopySource: `${bucketName}/${oldKey.id}`,
      Key: `${newKey}`,
      ACL: 'public-read'
    })
    .promise()
    .then(() =>
      // Delete the old object
      s3.deleteObject({
        Bucket: bucketName,
        Key: oldKey.id
      }).promise()
    )

    // Error handling is left up to reader
    .catch((e) => console.error(e));

}

exports.replace_file = replaceFile;