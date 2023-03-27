const express = require('express');
const deviceControllers = require('../controllers/device.controllers');

const router = express.Router();

router.get('/scan/:scannerId/:key', deviceControllers.getRedirect);

module.exports = router;
