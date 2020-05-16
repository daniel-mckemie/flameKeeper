const List = require('../models/list')

const async = require('async');

exports.index = function (req, res) {
  res.send('NOT IMPLEMENTED YET LIST');
};


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

exports.upload_function = function (req, res) {
  res.send('NOT IMPLEMENTED YET UPLOAD');
}
