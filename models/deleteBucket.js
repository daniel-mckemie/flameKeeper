// VISIT THIS SO FOR LISTS OF OVER 1000: https://menno.io/posts/listing-s3-objects-with-nodejs/
const fs = require('fs');
const stringify = require('csv-stringify');
const neatCsv = require('neat-csv');

let deleteBucket = function (fileToDelete) {
  console.log('from deleteBucket doc ');
  console.log(fileToDelete)

  let csvData = [];

  fs.readFile('./bucketStuff.csv', async (err, data) => {
    if (err) {
      console.error(err)
      return
    }
    csvData = await neatCsv(data)
    // global.fileToDelete = parseInt(csvData[csvData.length - 1]);
    let keys = Object.keys(csvData);
    let toDelete = csvData[fileToDelete.id]
    delete toDelete;
  });



  setTimeout(() => {

    // GET LAST SNAPSHOT NUMBER HERE! 
    let data = [];
    let columns = {
      id: 'id',
      name: 'Name',
    };

    csvData.splice(fileToDelete.id, 1);

    for (let i = 0; i < csvData.length; i++) {
      data.push([csvData[i].id, csvData[i].Name]);
    }
    console.log(data)

    stringify(data, {
      header: true,
      columns: columns
    }, (err, output) => {
      if (err) throw err;
      fs.writeFile('bucketStuff.csv', output, (err) => {
        if (err) throw err;
        console.log('bucketStuff.csv saved.');
      })
    });
  }, 2000);




  // if (data.IsTruncated) {
  //   bucketParams.ContinuationToken = data.NextContinuationToken;
  //   console.log("get further list...");
  //   listAllKeys();
  // }        
}


exports.delete_bucket = deleteBucket;