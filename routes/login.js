const express = require('express');
const auth = require('../controllers/authentication');
const router = express.Router();

/* GET home listing. */
router.get('/', auth.login);

module.exports = router;
