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
let fileLabel = `${Date.now()}-${snapshot}-${newId.substring(21)}`;

var str = "Hello world!"
var oldstr = str.substring(1);
var newfirstletter = "Z";
var newstr = newfirstletter + oldstr;

let oldStr = (id.id).substring(1);
let newFirstLetter = '0';
let subbedId = newFirstLetter + oldStr;



// DO SOME STRING SPLICING TO GET THE PROPER KEY!!!
let bucketName = 'fk-audio';
let oldKey = subbedId;
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


// FK 7 HOUR GRAB FUNCTION
// clearInterval(Substitute.sub_file);
// setInterval(Substitute.sub_file, 5000);

exports.replace_file = replaceFile;