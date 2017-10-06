const express = require('express')
const router = express.Router()
const api = require('../controllers/api')

/*
   GET home page. so vue can be served.
*/

router.get('/', api.serveHome);


module.exports = router;
