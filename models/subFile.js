const List = require('../models/list');
const SnapshotAppend = require('../models/snapshotAppend');

const fs = require('fs');
const stringify = require('csv-stringify');
const neatCsv = require('neat-csv');


let subFile = function () {
  if (global.subLock = true) {
    console.log('NO!');
    global.subLock = false;
    global.uploadLock = false;
  }  
  let newestFile = [];
  fs.readFile('./fileTracker.csv', async (err, data) => {
    if (err) {
      console.error(err)
      return
    }
    newestFile = await neatCsv(data);
  });

  let csvData = [];
  fs.readFile('./homePage.csv', async (err, data) => {
    if (err) {
      console.error(err)
      return
    }
    csvData = await neatCsv(data)

    // return fileToReplace
  });








  setTimeout(() => {

    // GET LAST SNAPSHOT NUMBER HERE! 
    let data = [];
    let columns = {
      id: 'id',
      name: 'Name'
    };



    newFile = newestFile[Math.floor(Math.random() * newestFile.length)];
    fileToReplace = csvData[Math.floor(Math.random() * csvData.length)];
    for (var x in csvData) {
      if (csvData.hasOwnProperty(x) && newFile.Name == csvData[x].Name) {
        console.log('no sub today...');                        
        break;
      }
      else if (csvData.hasOwnProperty(x) && csvData[x] == fileToReplace) {
        csvData[x].Name = newFile.Name;
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

}

exports.sub_file = subFile;