const List = require('../models/list');
const Upload = require('../models/upload');
const Delete = require('../models/delete');
const Replace = require('../models/replace');
const Substitute = require('../models/substitute');

const formidable = require('formidable');
const async = require('async');

const secured = require('./userLibs/secured');
const passport = require('passport');

global.counter = 0;


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
    }).then('/substitute');
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
          title: 'Composer Palette',
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
  global.counter++;
  console.log(global.counter);   
  new formidable.IncomingForm().parse(req)
    .on('field', (name, field) => {
      // res.status(415).send(field);      
    })
    .on('file', (name, file) => {
      res.status(200).send({                    
          data: Upload.upload_files({
            name: 'fk-audio',
            count: global.counter,            
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
          res.redirect('/');
        })
    })
    .on('success', (name, field) => {
      console.log('Field')
    })
}

exports.delete_function = function (req, res, next) {    
  global.counter--;
  async.parallel({    
      delete_file: function (callback) {
        res.send('dashboard', {
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


// Authentication
exports.authenticate_function = function (req, res) {
  passport.authenticate('auth0', {
      scope: 'openid email profile'
    }),
    function (req, res) {
      res.redirect('/login');
    }
}

exports.callback_auth_function = function (req, res, next) {
  passport.authenticate('auth0', function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect('/login');
    }
    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      const returnTo = req.session.returnTo;
      delete req.session.returnTo;
      res.redirect(returnTo || '/user');
    });
  })(req, res, next);
}

exports.logout_function = function (req, res) {
  req.logout();

  const returnTo = req.protocol + '://' + req.hostname;
  const port = req.connection.localPort;
  if (port !== undefined && port !== 80 && port !== 443) {
    returnTo += ':' + port;
  }
  const logoutURL = new url.URL(
    util.format('https://%s/v2/logout', process.env.AUTH0_DOMAIN)
  );
  const searchString = querystring.stringify({
    client_id: process.env.AUTH0_CLIENT_ID,
    returnTo: returnTo
  });
  logoutURL.search = searchString;

  res.redirect(logoutURL);
}

exports.user_function = function (req, res, next) {
  const {
    _raw,
    _json,
    ...userProfile
  } = req.user;
  res.render('user', {
    userProfile: JSON.stringify(userProfile, null, 2),
    title: 'Profile page'
  });
}



