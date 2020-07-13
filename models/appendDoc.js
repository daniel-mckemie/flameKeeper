// VISIT THIS SO FOR LISTS OF OVER 1000: https://menno.io/posts/listing-s3-objects-with-nodejs/
const fs = require('fs');
const stringify = require('csv-stringify');

let appendCSV = function (name) {
  console.log('appned odc')

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
  let bucketName = 'fk-audio';
  


  // DEFINE YOUR RETURN THE PARAMS!!!!!!!!
  let bucketParams = {
    Bucket: bucketName,
    MaxKeys: 1000
    // StartAfter: startingFile  
  };



  let dataList = [];
  listAllKeys();

  function listAllKeys() {
    s3.listObjectsV2(bucketParams, function (err, data) {
      if (err) {
        console.log(err, err.stack); // an error occurred
      } else {
        fileInfo = this.data;
        dataList.push(fileInfo);        

        

        let data =[];
        let columns = {
          id: 'id',
          name: 'Name'
        };
        
        // GET LAST SNAPSHOT NUMBER HERE!        
        for (let i = 0; i < fileInfo.Contents.length; i++) {
          data.push([i, fileInfo.Contents[i].Key +i]);                              
        } 

        stringify(data, {header: true, columns: columns}, (err, output) => {
          if (err) throw err;
          fs.writeFile('fileTracker.csv', output, (err) => {
            if (err) throw err;
            console.log('fileTracker.csv saved.');
          })
        });
        
        
        
        

        // if (data.IsTruncated) {
        //   bucketParams.ContinuationToken = data.NextContinuationToken;
        //   console.log("get further list...");
        //   listAllKeys();
        // }        
      }
    });
  }  
}

exports.append_csv = appendCSV; 