const { Router } = require('express')
const router = Router()
const idealistaCtrl = require('../controllers/idealista')

router.post('/webhook', idealistaCtrl.handleIdealistaWebhook)

module.exports = router