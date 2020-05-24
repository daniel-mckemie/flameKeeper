const Download = require('../models/download');
const List = require('../models/list');
const Upload = require('../models/upload');

const formidable = require('formidable');


const async = require('async');

// Home page list AUDIO files
exports.list_function = function (req, res) {
  async.parallel({
      list_files: function (callback) {
        res.render('list', {
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

exports.render_upload = function (req, res) {
  async.parallel({
      upload_files: function (callback) {
        res.render('upload');
      }
    },
    function (err, results) {
      res.send('ERRONEOUS!');
    });
}

// UPLOAD page
exports.upload_function = function (req, res) {
  new formidable.IncomingForm().parse(req)
    .on('field', (name, field) => {
      // console.log('Field', name, field)
    })
    .on('file', (name, file) => {
      // console.log(file.name)
      res.status(200).send({
        title: 'SAMPLE',
        data: Upload.upload_files({
              name: 'fk-audio',
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
      res.end()
    })
  })}
  
  
exports.download_function = function(req, res) {
  console.log(req.headers);
  async.parallel({
      download_files: function (callback) {
        res.render('download', {
          title: 'SAMPLE',
          data: Download.download_files({
            name: 'fk-audio',
            fileName: 'noise2.mp3',
            callback
          })
        });
      }
    },
    function (err, results) {
      res.send('ERRONEOUS!');
    });
};
