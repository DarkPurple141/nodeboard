const express = require('express')
const router = express.Router()
const api = require('../controllers/api')
const auth = require('../controllers/authentication')

/*
   GET home page. so vue can be served.
*/

router.use(auth.corsHeaders);

router.get('/', api.serveHome);


module.exports = router;
