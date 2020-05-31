let replaceFile = function (id) {
  

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

console.log('FILEGUYS' + id.id)
let bucketName = 'fk-audio';
let oldKey = id.id;
let newKey = 'NEWdy.mp3'

console.log(`${oldKey}`)


// Copy the object to a new location
s3.copyObject({
    Bucket: bucketName,
    CopySource: `${bucketName}/${oldKey}`,
    Key: `${newKey}`

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

exports.replace_file = replaceFile;