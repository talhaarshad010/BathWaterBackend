/** @format */
const express = require('express');
const router = express.Router();
const userController = require('../Routes/User.Controller');

router.post('/userRegister', userController.userRegister);
router.get('/getUser', userController.getUser);
router.get('/CheckUser/:uniqueId', userController.CheckUser);
router.post('/updatePoints', userController.updatePoints);

module.exports = router;
