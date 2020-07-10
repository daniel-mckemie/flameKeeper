const Substitute = require('../models/subFile')

let replaceFile = function(id) {
  

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

console.log(`THIS IS THE OLD KEY ${oldKey.id}`);
console.log('THIS IS THE NEW KEY ' + newKey);

// FK 7 HOUR GRAB FUNCTION
global.subCount = 1;


global.uploadLock = 0;

console.log('Out of the function: ' + global.uploadLock);

setTimeout(() => {
  global.uploadLock = 1;
  setInterval(Substitute.sub_file, 5000);
  console.log('In the function: ' + global.uploadLock);
}, 5000);



// Copy the object to a new location
s3.copyObject({
    Bucket: bucketName,
    CopySource: `${bucketName}/${oldKey.id}`,
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





exports.replace_file = replaceFile;