const router = require('express').Router()
const invoiceController = require('./controller')

router.get('/invoice/:order_id', invoiceController)

module.exports = router