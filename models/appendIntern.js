// VISIT THIS SO FOR LISTS OF OVER 1000: https://menno.io/posts/listing-s3-objects-with-nodejs/
const fs = require('fs');
const stringify = require('csv-stringify');
const neatCsv = require('neat-csv');

let appendIntern = function (fileToAppend) {
  console.log('from intern doc ' + fileToAppend);




  let csvData = [];

  fs.readFile('./composerInfo.csv', async (err, data) => {
    if (err) {
      console.error(err)
      return
    }
    csvData = await neatCsv(data)
    global.composerId = parseInt(csvData[csvData.length - 1].id);

  });

  setTimeout(() => {
    global.composerId++

    // GET LAST SNAPSHOT NUMBER HERE! 
    let data = [];
    let columns = {
      // id: global.composerId,
      // name: fileToAppend
    };

    data.push([global.composerId, fileToAppend]);

    stringify(data, (err, output) => {
      if (err) throw err;
      fs.appendFile('composerInfo.csv', output, (err) => {
        if (err) throw err;
        console.log('composerInfo.csv saved.');
      })
    });
  }, 2000);




  // if (data.IsTruncated) {
  //   bucketParams.ContinuationToken = data.NextContinuationToken;
  //   console.log("get further list...");
  //   listAllKeys();
  // }        
}


exports.append_intern = appendIntern;