// VISIT THIS SO FOR LISTS OF OVER 1000: https://menno.io/posts/listing-s3-objects-with-nodejs/
const fs = require('fs');
const stringify = require('csv-stringify');
const neatCsv = require('neat-csv');

let deleteCSV = function () {
  console.log('from dELETE doc ');




  let csvData = [];
  let newData = [];

  fs.readFile('./fileTracker.csv', async (err, data) => {
    if (err) {
      console.error(err)
      return
    }
    csvData = await neatCsv(data)
    // global.fileToDelete = parseInt(csvData[csvData.length - 1]);
    let keys = Object.keys(csvData);
    let last = keys[keys.length-1];
    delete csvData[last];           
  });

  

  setTimeout(() => {
    csvData.pop()
    console.log(csvData)

    // GET LAST SNAPSHOT NUMBER HERE! 
    let data = [];
    let columns = {
      id: 'id',
      name: 'Name'
    };    

    for (let i=0; i<csvData.length; i++) {
      data.push([csvData[i].id, csvData[i].Name]);
    }
    console.log(data)

    stringify(data, {header: true, columns: columns}, (err, output) => {
      if (err) throw err;
      fs.writeFile('fileTracker.csv', output, (err) => {
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


exports.delete_csv = deleteCSV;