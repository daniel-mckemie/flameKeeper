let deleteFile = function (id) {
  console.log(id.id)

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

  let params = {
    Bucket: 'fk-audio',
    Key: id.id
    /* 
       where value for 'Key' equals 'pathName1/pathName2/.../pathNameN/fileName.ext'
       - full path name to your file without '/' at the beginning
    */
  };

  s3.deleteObject(params, function (err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else console.log(data); // successful response
  });
}

exports.delete_file = deleteFile;