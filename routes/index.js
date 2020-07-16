const express = require('express');
const router = express.Router();
const audio_controller = require('../controllers/audioController');

global.uploadLock = false;
global.dashboardLock = true;


// DELETE File and Render Home Page
router.put('/replace/:id', audio_controller.replace_function);

// GET Upload Form
router.get('/upload-form', (req, res) => res.render('./upload-form'));
router.get('/intern-form', (req, res) => res.render('./intern-form'));


// GET Dashboard page route
router.get('/dashboard', audio_controller.dashboard_function);

// Upload/POST page route
// router.get('/upload', (req, res) => {
//   res.render('dashboard')
// })
router.post('/upload', audio_controller.upload_function);

router.post('/intern-upload', audio_controller.intern_upload_function);


// DELETE File and Render Home Page
router.post('/delete/:id', audio_controller.delete_function);


// MAYBE USE?!
// router.get('/download', audio_controller.download_function);

// GET Home page route.
router.get('/', (req, res) => audio_controller.list_function(req, res));

router.get('/test', (req, res) => audio_controller.test_function(req, res));



module.exports = router;