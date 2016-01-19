'use strict';

var express = require('express');
var controller = require('./payment.controller');

var router = express.Router();

router.get('/', controller.index);
router.post('/query', controller.query)
router.post('/tester', controller.tester)
router.get('/yourdata', controller.getCurrent)
module.exports = router;