'use strict';

var express = require('express');
var controller = require('./yourdata.controller');

var router = express.Router();

router.get('/download', controller.download);
router.post('/save', controller.save); 

module.exports = router;