const express = require('express');
const router = express.Router();

// Home page route.
router.get('/', function (req, res, next) {
  res.render('index', {title: 'Hey', message: 'Shitass'});
})

// About page route.
router.get('/about', function (req, res) {
  res.send('About this wiki');
})

module.exports = router;