// VISIT THIS SO FOR LISTS OF OVER 1000: https://menno.io/posts/listing-s3-objects-with-nodejs/

const fs = require('fs');
const neatCsv = require('neat-csv');

let listFiles = function () {    
  
  
}
  
  
  
  
  
  
  
  
  
  // // Load the SDK for JavaScript
  // const AWS = require('aws-sdk');

  // // Set the Region 
  // AWS.config.update({
  //   region: 'us-east-1'
  // });

  // // Create S3 service object
  // s3 = new AWS.S3({
  //   apiVersion: '2006-03-01',
  //   maxRetries: 10
  // });
  // let bucketName;
  // if (name == undefined) {
  //   bucketName = 'fk-audio';
  // } else {
  //   bucketName = name.name;
  // }


  // // DEFINE YOUR RETURN THE PARAMS!!!!!!!!
  // let bucketParams = {
  //   Bucket: bucketName,
  //   MaxKeys: 1000
  //   // StartAfter: startingFile  
  // };



  // const dataList = [];
  // listAllKeys();

  // function listAllKeys() {
  //   s3.listObjectsV2(bucketParams, function (err, data) {
  //     if (err) {
  //       console.log(err, err.stack); // an error occurred
  //     } else {        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        // fileInfo = this.data;        
        // dataList.push(fileInfo);
        // let dataLength = dataList[0].Contents.length; 
        
        // let group = dataList[0].Contents;
        // let oldSubGroup = group.slice(0, -7); 
        // let newSubGroup = group.slice(oldSubGroup.length, group.length);       
        
        // global.counter = parseInt(dataList[0].Contents[dataLength - 1].Key.substring(14, 20));
        // let randomId = Math.floor(Math.random() * (oldSubGroup.length));
        // let randomReplacement = Math.floor(Math.random() * (newSubGroup.length)); 
        // // console.log(newSubGroup);
        
        // global.subId = oldSubGroup[randomId];
        // global.newId = newSubGroup[randomReplacement].Key;

        // console.log('oldId' + global.subId.Key);
        // console.log('newId' + global.newId);
        
        
        
        // if (data.IsTruncated) {
        //   bucketParams.ContinuationToken = data.NextContinuationToken;
        //   console.log("get further list...");
        //   listAllKeys();
        // }
  //     }
  //   });
  // }



  // // Call S3 to obtain a list of the objects in the bucket
  // s3.listObjects(bucketParams, function (err, data) {
  //   if (err) {
  //     console.log("Error", err);
  //   } else {
  //     fileInfo = this.data;
  // console.log(fileInfo);
  // global.counter = parseInt(data.Contents[0].Key.substring(14, 20));
  // let randomId = Math.floor(Math.random() * (data.Contents.length - 7))
  // global.subId = data.Contents[randomId];
  // console.log('From Sub List: ' + global.subId.Key);
  // console.log('counter: ' + global.counter)

  //   }
  // });

// };
exports.list_files = listFiles;