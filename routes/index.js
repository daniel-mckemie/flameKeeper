const express = require('express');
const router = express.Router();

const audio_controller = require('../controllers/audioController');

// GET Home page route.
router.get('/', audio_controller.index);

// GET List page route
router.get('/list', audio_controller.list_function);

// Upload/POST page route
router.get('/upload', audio_controller.upload_function);

// Test audio
router.get('/download', audio_controller.download_function);


module.exports = router;