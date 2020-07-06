const Substitute = require('../models/substitute');

let replaceFile = function(id) {
  

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
let newId = id.id
let fileLabel = `${Date.now()}-${snapshot}-${newId.substring(21)}`;


// DO SOME STRING SPLICING TO GET THE PROPER KEY!!!
let bucketName = 'fk-audio';
let oldKey = id;
let newKey = `${fileLabel}`

console.log(`THIS IS THE OLD KEY ${oldKey.id}`);
console.log('THIS IS THE NEW KEY ' + fileLabel);



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

// setInterval(Substitute.sub_file, 2000);

exports.replace_file = replaceFile;