let downloadFiles = function (name, fileName) {
  
  
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

  let bucketName = name.name;
  let downloadName = name.fileName;
  

  // Create the parameters for calling listObjects
  let bucketParams = {
    Bucket: bucketName,
    Key: downloadName
  };


  // // POSSIBLE!

  // let downloadStream = client.downloadStream(params);

  // downloadStream.on('error', function () {
  //   res.status(404).send('Not Found');
  // });
  // downloadStream.on('httpHeaders', function (statusCode, headers, resp) {
  //   // Set Headers
  //   res.set({
  //     'Content-Type': headers['content-type']
  //   });
  // });

  // downloadStream.pipe(res);
  
  // let file = require('fs').createWriteStream('../stuff');
  // s3.getObject(bucketParams).createReadStream().pipe(file);

  

  // Call S3 to obtain a list of the objects in the bucket
  let audioStream = s3.getObject(bucketParams, function (err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      downloadedFile = (this.data);      
    }
  }).createReadStream();


};
exports.download_files = downloadFiles;