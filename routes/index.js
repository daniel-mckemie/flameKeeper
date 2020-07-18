const express = require('express');
const router = express.Router();
const audio_controller = require('../controllers/audioController');

global.uploadLock = false;
global.dashboardLock = true;

setInterval(() => {
  var today = new Date()
  console.log('INDICATION: ' + today.getHours() + ":" + today.getMinutes())
}, 1700000);

// DELETE File and Render Home Page
router.put('/replace/:id', audio_controller.replace_function);

// GET Upload Form
router.get('/upload-form', (req, res) => res.render('./upload-form'));
router.get('/intern-form', audio_controller.intern_form);
// router.post('/intern-update/:id', (req, res) => audio_controller.intern_update(req, res))
router.post('/intern-update', (req, res) => audio_controller.intern_update(req, res))


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
router.get('/pastComposers', (req, res) => audio_controller.past_composers_function(req, res));
router.post('/history/:id', (req, res) => audio_controller.history_function(req, res));


router.get('/', (req, res) => audio_controller.list_function(req, res));

router.get('/test', (req, res) => audio_controller.test_function(req, res));



module.exports = router;