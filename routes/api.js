const express = require('express');
const api = require('../controllers/api');
const router = express.Router();

/* GET user listing. */
router.get('/user', api.getUser);

module.exports = router;
