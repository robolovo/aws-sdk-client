var express = require('express');
var router = express.Router();

const awsClientController = require('../controller').aws;

router.get('/vpcs', awsClientController.getVpcs);
router.get('/subnets', awsClientController.getSubnets);

module.exports = router;