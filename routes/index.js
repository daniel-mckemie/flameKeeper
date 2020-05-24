const express = require('express');
const router = express.Router();
const formidable = require('formidable');

const audio_controller = require('../controllers/audioController');
const view_controller = require('../controllers/viewController');

// GET Home page route.
router.get('/', audio_controller.list_function);

// GET Dashboard page route
router.get('/dashboard', audio_controller.dashboard_function);

// Upload/POST page route
router.get('/upload', (req, res) => {
  res.render('upload')
})
router.post('/upload', audio_controller.upload_function);

// Test audio
router.get('/download', audio_controller.download_function);


module.exports = router;