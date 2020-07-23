// VISIT THIS SO FOR LISTS OF OVER 1000: https://menno.io/posts/listing-s3-objects-with-nodejs/
const fs = require('fs');
const stringify = require('csv-stringify');
const neatCsv = require('neat-csv');


let appendSnapshotCSV = function (filesToAppend) {  
  let csvData = [];

  fs.readFile('./snapshot.csv', async (err, data) => {
    if (err) {
      console.error(err)
      return
    }
    csvData = await neatCsv(data)
    global.snapId = parseInt(csvData[csvData.length - 1].id);

  });

  setTimeout(() => {    
    global.snapId++
    console.log('SNAPID ' + global.snapId);

    // GET LAST SNAPSHOT NUMBER HERE! 
    let data = []
    let columns = {
      // id: global.snapId,
      // name: filesToAppend
    };

    for (let x=0; x<filesToAppend.length; x++) {
      data.push([global.snapId, filesToAppend[x][1]]);
      console.log([global.snapId, filesToAppend[x][1]]);
    }
    
    

    stringify(data, (err, output) => {
      if (err) throw err;
      fs.appendFile('snapshot.csv', output, (err) => {
        if (err) throw err;
        console.log('snapshot.csv saved.');
      })
    });

  }, 2000);




  // if (data.IsTruncated) {
  //   bucketParams.ContinuationToken = data.NextContinuationToken;
  //   console.log("get further list...");
  //   listAllKeys();
  // }        
}


exports.append_snapshot_csv = appendSnapshotCSV;