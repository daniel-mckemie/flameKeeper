const Substitute = require('../models/subFile');
const List = require('../models/list');
const SnapshotAppend = require('../models/snapshotAppend');
const Cycle = require('../controllers/audioController')

const fs = require('fs');
const stringify = require('csv-stringify');
const neatCsv = require('neat-csv');

let replaceFile = function (fileToReplace) {
  // console.log(fileToReplace);
  global.dashboardLock = true;
  global.uploadLock = true;

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

  global.stopTime = true;
  Cycle.cycle_function();


}

exports.replace_file = replaceFile;