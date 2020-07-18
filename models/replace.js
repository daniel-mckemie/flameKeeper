const Substitute = require('../models/subFile');
const List = require('../models/list');
const SnapshotAppend = require('../models/snapshotAppend');

const fs = require('fs');
const stringify = require('csv-stringify');
const neatCsv = require('neat-csv');

let replaceFile = function (fileToReplace) {
  // console.log(fileToReplace);
  global.dashboardLock = true;  

  let newestFile = [];
  fs.readFile('./fileTracker.csv', async (err, data) => {
    if (err) {
      console.error(err)
      return
    }
    newestFile = await neatCsv(data)
    newestFile = newestFile[newestFile.length - 1];

  });  


  let csvData = [];

  fs.readFile('./homePage.csv', async (err, data) => {
    if (err) {
      console.error(err)
      return
    }
    csvData = await neatCsv(data)
    // global.fileToDelete = parseInt(csvData[csvData.length - 1]);    
    
    // delete csvData[replaceId];
    
  });



  setTimeout(() => {    

    // GET LAST SNAPSHOT NUMBER HERE! 
    let data = [];
    let columns = {
      id: 'id',
      name: 'Name'
    };
    
    
    for (var x in csvData) {
      // data.push({id: csvData[x].id, Name: csvData[x].Name})      
      if (csvData.hasOwnProperty(x) && csvData[x].Name == fileToReplace.value) {                                             
        csvData[x].Name = newestFile.Name;
        // data.push({id: x, Name: newestFile.Name});
        // delete csvData[x];
      }

    }
    

    for (let i = 0; i < csvData.length; i++) {
      data.push([csvData[i].id, csvData[i].Name]);            
    }    
  

    stringify(data, {
      header: true,
      columns: columns
    }, (err, output) => {
      if (err) throw err;
      fs.writeFile('homePage.csv', output, (err) => {
        if (err) throw err;
        console.log('homePage.csv saved.');
      })
    });
    
    
    SnapshotAppend.append_snapshot_csv(data);
    
  }, 2000);




  global.stopTime;
  
  // FIX If/ELSE IN SUB FILE TO NOT FIRE ON FIRST 7 HOUR, BUT WILL UNLOCK UPLOAD FORM
  if (global.stopTime == true) {
    console.log('Interval cleared!');
    clearInterval(global.myInterval);
    global.myInterval = setInterval(() => {      
      Substitute.sub_file();      
    }, 25200000);
    global.stopTime = false;
  } else {
    console.log('Interval started!');
    global.myInterval = setInterval(() => {
      Substitute.sub_file();      
    }, 25200000);
    global.stopTime = true;    
  }







//   // Copy the object to a new location
//   s3.copyObject({
//       Bucket: bucketName,
//       CopySource: `${bucketName}/${oldKey.id}`,
//       Key: `${newKey}`,
//       ACL: 'public-read'
//     })
//     .promise()
//     .then(() =>
//       // Delete the old object
//       s3.deleteObject({
//         Bucket: bucketName,
//         Key: oldKey.id
//       }).promise()
//     )

//     // Error handling is left up to reader
//     .catch((e) => console.error(e));

}

exports.replace_file = replaceFile;