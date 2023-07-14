const express = require('express');
const router = express.Router();
const registerController = require('../controllers/registerController');


router.post('/signup',registerController.signup);
router.post('/signin',registerController.signin);
router.get('/',registerController.users);
module.exports = router;