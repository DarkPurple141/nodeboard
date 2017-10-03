const express = require('express')
const router = express.Router()
const auth = require('../controllers/authentication')

/* GET got listing. */
router.get('/', auth.logout)

module.exports = router
