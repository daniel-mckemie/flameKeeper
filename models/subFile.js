const List = require('../models/list');

const fs = require('fs');
const stringify = require('csv-stringify');
const neatCsv = require('neat-csv');

let subFile = function() { 
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

    function subFunc() {
      newFile = newestFile[Math.floor(Math.random() * newestFile.length)];
      fileToReplace = csvData[Math.floor(Math.random() * csvData.length)];
      console.log(newFile);
      console.log(fileToReplace);
      for (var x in csvData) {
        if (csvData.hasOwnProperty(x) && newFile.Name == csvData[x].Name) {
          console.log('no sub today...');
          return subFunc()
        } else if (csvData[x] == fileToReplace) {
          return csvData[x].Name = newFile.Name;
        }
      }
    }
    subFunc();
    

    for (let i = 0; i < csvData.length; i++) {
      data.push([csvData[i].id, csvData[i].Name]);
    }

    console.log(data);

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
  }, 2000);
  
}

exports.sub_file = subFile;