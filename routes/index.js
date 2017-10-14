const express = require('express')
const router = express.Router()
const api = require('../controllers/api')
<<<<<<< HEAD
=======
const auth = require('../controllers/authentication')
>>>>>>> origin/experimental-changes

/*
   GET home page. so vue can be served.
*/

<<<<<<< HEAD
=======
router.use(auth.corsHeaders);

>>>>>>> origin/experimental-changes
router.get('/', api.serveHome);


module.exports = router;
