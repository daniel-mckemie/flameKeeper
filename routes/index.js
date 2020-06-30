const express = require('express');
const router = express.Router();
const formidable = require('formidable');
const audio_controller = require('../controllers/audioController');


// DELETE File and Render Home Page
router.put('/replace/:id', audio_controller.replace_function);

// GET Upload Form
router.get('/uploadForm', (req, res) => res.render('./uploadForm'));

// GET Dashboard page route
router.get('/dashboard', audio_controller.dashboard_function);

// Upload/POST page route
// router.get('/upload', (req, res) => {
//   res.render('dashboard')
// })
router.post('/upload', audio_controller.upload_function);


// DELETE File and Render Home Page
router.post('/delete/:id', audio_controller.delete_function);


// MAYBE USE?!
// router.get('/download', audio_controller.download_function);

// GET Home page route.
router.get('/', audio_controller.list_function);


module.exports = router;