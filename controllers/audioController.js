const Download = require('../models/download');
const List = require('../models/list');
const Upload = require('../models/upload');


const async = require('async');

exports.index = function (req,res) {res.send('doody')};

// exports.index = function (req, res) {
//   async.parallel({
//       index: function (callback) {
//         res.render('index', {
//           title: 'SAMPLE',
//           data: Download.download_files({
//             name: 'fk-audio',            
//             fileName: 'noise.mp3',
//             callback
//           })
//         });
//       }
//     },
//     function (err, results) {
//       res.send('ERRONEOUS!');
//     });
// };


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

exports.upload_function = function (req, res) {
  async.parallel({
      upload_files: function (callback) {
        res.render('upload', {
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

exports.download_function = function (req, res) {
  async.parallel({
      download_files: function (callback) {
        res.render('download', {
          title: 'SAMPLE',
          data: Download.download_files({
            name: 'fk-audio',
            fileName: 'noise.mp3',
            callback
          })
        });
      }
    },
    function (err, results) {
      res.send('ERRONEOUS!');
    });
};


