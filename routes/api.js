const express = require('express')
const api = require('../controllers/api')
const auth = require('../controllers/authentication')
const play = require('./play')
const router = express.Router()

/* GET user listing. */
router.use(auth.corsHeaders)

router.get('/error/', auth.error)

router.post('/logout/', auth.logout)

router.get('/user/', api.getUser)

router.all(/.*/, api.loggedIn)

router.use('/play/', play)

module.exports = router
