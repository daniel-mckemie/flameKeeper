let listFiles = function (name) {

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


  // DEFINE YOUR RETURN THE PARAMS!!!!!!!!
  let bucketParams = {
    Bucket: bucketName,
    // MaxKeys: 7
    // StartAfter: startingFile  
  };

  
  // Call S3 to obtain a list of the objects in the bucket
  s3.listObjects(bucketParams, function (err, data) {
    if (err) {
      console.log("Error", err);
    } else {                  
      fileInfo = this.data;                        
      // console.log(bucketParams);
      
      
      
      // for (let i = 0; i < fileInfo.Contents.length; i++) {
      //   let audioUrl = 'https://' + bucketName + '.s3.amazonaws.com/' + fileInfo.Contents[i].Key;
        // audioList.push(audioUrl);
      // } // return audioList;
    }
  });


};
exports.list_files = listFiles;