const express = require('express');
const router = express.Router();
const formidable = require('formidable');
const audio_controller = require('../controllers/audioController');

const Substitute = require('../models/substitute');
const Replace = require('../models/replace')

const passport = require('passport');
const dotenv = require('dotenv');
const util = require('util');
const url = require('url');
const querystring = require('querystring');

const secured = require('../controllers/userLibs/secured');


// router.get('/substitute', function(){setTimeout(Substitute.sub_file, 2000)});

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
router.get('/', (req, res) => audio_controller.list_function(req, res));


// Authentication routes
// Perform the final stage of authentication and redirect to previously requested URL or '/user'
router.get('/login', audio_controller.authenticate_function)


router.get('/callback', audio_controller.callback_auth_function)

// Perform session logout and redirect to homepage
router.get('/logout', audio_controller.logout_function);

router.get('/user', secured(), audio_controller.user_function);


module.exports = router;