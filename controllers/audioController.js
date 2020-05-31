const List = require('../models/list');
const Upload = require('../models/upload');
const Delete = require('../models/delete');
const Replace = require('../models/replace');

const formidable = require('formidable');


const async = require('async');


// REPLACE function when submitting from composer page
exports.replace_function = function (req, res) {  
  async.parallel({
      replace_file: function (callback) {
        res.render('index', {
          title: 'REPLACED',
          data: Replace.replace_file({
            name: 'fk-audio',
            id: req.params.id,                   
            callback
          })
        });
      }
    },
    function (err, results) {
      res.send('ERRONEOUS!');
    });
}


// Home page list AUDIO files
exports.list_function = function (req, res) {
  async.parallel({
      list_files: function (callback) {
        res.render('index', {
          title: 'SAMPLE',
          data: List.list_files({
            name: 'fk-audio',
            callback
          })
        });
      }
    },
    function (err, results) {
      res.send('ERRONEOUS!');
    });
}

// DISPLAY selected files to the home page upon submit
exports.dashboard_function = function (req, res) {
  async.parallel({
      list_files: function (callback) {
        res.render('dashboard', {
          title: 'dash',
          data: List.list_files({
            name: 'fk-audio',
            callback
          })
        });
      }
    },
    function (err, results) {
      res.send('ERRONEOUS!');
    });
}

// exports.render_upload = function (req, res) {
//   async.parallel({
//       upload_files: function (callback) {
//         res.render('upload');
//       }
//     },
//     function (err, results) {
//       res.send('ERRONEOUS!');
//     });
// }

// UPLOAD page
exports.upload_function = function (req, res, next) {
  new formidable.IncomingForm().parse(req)
    .on('field', (name, field) => {
      // res.status(307).send(field);      
    })
    .on('file', (name, file) => {
      res.status(200).send({
          title: 'SUCCESS!',
          data: Upload.upload_files({
            name: 'fk-audio',
            fileName: file.name,
            fileToUpload: file.path
          })
        })
        .on('aborted', () => {
          console.error('Request aborted by the user');
        })
        .on('error', (err) => {
          console.error('Error', err)
          throw err
        })
        .on('end', () => {
          res.end();
        })
    })
    .on('success', (name, field) => {
      console.log('Field')
    })
}

exports.delete_function = function (req, res, next) {    
  async.parallel({    
      delete_file: function (callback) {
        res.render('dashboard', {
          title: 'DELETED',
          data: Delete.delete_file({
            name: 'fk-audio',
            id: req.params.id,
            callback
          })
        });
      }
    },
    function (err, results) {
      res.send('ERRONEOUS!');
    });
}




