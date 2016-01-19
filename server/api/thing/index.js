'use strict';

var express = require('express');
var controller = require('./thing.controller');

var router = express.Router();

router.post('/', controller.query);
router.post('/docStats', controller.getSig)
router.get('/yourdata', controller.getCurrent)
module.exports = router;

