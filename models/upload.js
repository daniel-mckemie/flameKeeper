let uploadFiles = function (name, upload) {

  // Load the AWS SDK for Node.js
  const AWS = require('aws-sdk');
  // Set the region 
  AWS.config.update({
    region: 'us-east-1'
  });

  // Create S3 service object
  s3 = new AWS.S3({
    apiVersion: '2006-03-01'
  });

  // call S3 to retrieve upload file to specified bucket
  let uploadParams = {
    Bucket: process.argv[2],
    Key: name,
    Body: upload
  };
  let file = process.argv[3];

  // Configure the file stream and obtain the upload parameters
  const fs = require('fs');
  let fileStream = fs.createReadStream(file);
  fileStream.on('error', function (err) {
    console.log('File Error', err);
  });
  uploadParams.Body = fileStream;
  const path = require('path');
  uploadParams.Key = path.basename(__dirname, '/file');

  // call S3 to retrieve upload file to specified bucket
  s3.upload(uploadParams, function (err, data) {
    if (err) {
      console.log("Error", err);
    }
    if (data) {
      console.log("Upload Success", data.Location);
    }
  });
}

exports.upload_files = uploadFiles;