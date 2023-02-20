// @ts-nocheck
const express = require('express');
const router = express.Router();
const UserController = require("../controller/users");

// miscellaneous
router.post('/login', UserController.login);
router.post('/signup', UserController.signup);
router.get('/getSystemInfo', UserController.getSystemInfo);


module.exports = router;
