// VISIT THIS SO FOR LISTS OF OVER 1000: https://menno.io/posts/listing-s3-objects-with-nodejs/
const fs = require('fs');
const stringify = require('csv-stringify');
const neatCsv = require('neat-csv');

let deleteIntern = function (fileToDelete) {
  console.log('from dELETEIntern doc ');

  let csvData = [];

  fs.readFile('./pastComposers.csv', async (err, data) => {
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
      composer: 'Composer',
      startSlice: 'StartSlice',
      endSlice: 'EndSlice',
      bio: 'Bio'
    };

    csvData.splice(fileToDelete.id, 1);    

    for (let i = 0; i < csvData.length; i++) {
      data.push([csvData[i].id, csvData[i].Name, csvData[i].Composer, csvData[i].StartSlice, csvData[i].EndSlice, csvData[i].Bio]);
    }
    console.log(data)

    stringify(data, {
      header: true,
      columns: columns
    }, (err, output) => {
      if (err) throw err;
      fs.writeFile('pastComposers.csv', output, (err) => {
        if (err) throw err;
        console.log('pastComposers.csv saved.');
      })
    });
  }, 2000);




  // if (data.IsTruncated) {
  //   bucketParams.ContinuationToken = data.NextContinuationToken;
  //   console.log("get further list...");
  //   listAllKeys();
  // }        
}


exports.delete_intern = deleteIntern;