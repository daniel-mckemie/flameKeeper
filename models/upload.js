const audio_controller = require('../controllers/audioController');

let uploadFiles = function (name, fileToUpload, count) {       

  let x = name.fileName
  let lastFour = x.substr(x.length - 4); // => ".mp3"
  console.log(global.uploadLock)
  if (lastFour == '.mp3' && global.uploadLock == false) {
    global.uploadLock = true;
    
    // Load the AWS SDK for Node.js
    const AWS = require('aws-sdk');
    // Set the region 
    AWS.config.update({
      region: 'us-east-1'
    });

    // Create S3 service object
    s3 = new AWS.S3({
      apiVersion: '2006-03-01',
      maxRetries: 10
    });

    let bucketName = name.name;
    let uploadName = name.fileToUpload;


    global.uploadFileLabel = `${Date.now()}-${name.fileName}`;





    // call S3 to retrieve upload file to specified bucket
    let uploadParams = {
      Bucket: bucketName,
      Key: global.uploadFileLabel,
      Body: uploadName,
      ACL: 'public-read',
    };

    let file = uploadParams.Body;

    


    // Configure the file stream and obtain the upload parameters

    const fs = require('fs');
    let fileStream = fs.createReadStream(file);
    fileStream.on('error', function (err) {
      console.log('File Error', err);
    });
    uploadParams.Body = fileStream;
    const path = require('path');
    // uploadParams.Key = path.basename(file);
    uploadParams.Key = global.uploadFileLabel;

    console.log(fileStream);

    s3.upload(uploadParams, function (err, data) {
      if (err) {
        console.log("Error", err);
      }
      if (data) {
        console.log("Upload Success", data.key);              
      }
    })
  } else {
    return name.title = 'YOU MUST WAIT 7 HOURS TO UPLOAD AGAIN!'
  }
}


// call S3 to retrieve upload file to specified bucket

// if (lastFour == '.mp3') {
//   s3.upload(uploadParams, function (err, data) {
//     if (err) {
//       console.log("Error", err);
//     }
//     if (data) {
//       console.log("Upload Success", data.key);

//     }
//   })
// } else {
//   throw new Error('Not an .mp3!');
// };
// }


exports.upload_files = uploadFiles;