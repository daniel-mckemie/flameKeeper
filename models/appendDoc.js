// VISIT THIS SO FOR LISTS OF OVER 1000: https://menno.io/posts/listing-s3-objects-with-nodejs/
const fs = require('fs');
const stringify = require('csv-stringify');
const neatCsv = require('neat-csv');

let appendCSV = function (fileToAppend) {  
  console.log('from append doc ' + fileToAppend);




  let csvData = [];

  fs.readFile('./fileTracker.csv', async (err, data) => {
    if (err) {
      console.error(err)
      return
    }
    csvData = await neatCsv(data)
    global.snapShotId = parseInt(csvData[csvData.length - 1].id);
    
  });
  
  setTimeout(() => {
    global.snapShotId++    

    // GET LAST SNAPSHOT NUMBER HERE! 
    let data = [];
    let columns = {
      // id: global.snapShotId,
      // name: fileToAppend
    };

    data.push([global.snapShotId, fileToAppend]);

    stringify(data, (err, output) => {
      if (err) throw err;
      fs.appendFile('fileTracker.csv', output, (err) => {
        if (err) throw err;
        console.log('fileTracker.csv saved.');
      })
    });    
  }, 2000);
  



  // if (data.IsTruncated) {
  //   bucketParams.ContinuationToken = data.NextContinuationToken;
  //   console.log("get further list...");
  //   listAllKeys();
  // }        
}


exports.append_csv = appendCSV;